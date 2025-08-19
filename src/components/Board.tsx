import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Cell = {
  typePlay: 'X' | 'O' | null;   // quem marcou a casa
  playerId ?: number;           // quem marcou a casa
  timestamp?: number;          // hora da jogada (opcional)
  isWinning?: boolean;         // se faz parte da linha vencedora
};

type MoveResult = {
  newBoard: Cell[][];
  nextPlayer: boolean;
  winner: 'X' | 'O' | null;
  isDraw: boolean;
};

function boardFull(board: Cell[][]): boolean {
  for (let row of board) {
    if (row.some(cell => !cell.typePlay)) return false;
  }
  return true;
}

function makeMove(  board: Cell[][], row: number, col: number, xIsNext: boolean, playerId?: number): MoveResult{


  
    if (board[row][col].typePlay ) {
        return { newBoard: board, nextPlayer: xIsNext, winner : null, isDraw: false };
    }

    const newBoard : Cell[][]= structuredClone(board);

    const newCellPosition : Cell = {
        typePlay: xIsNext ? 'X' : 'O',
        playerId,
        timestamp: Date.now()
    } 

    newBoard[row][col] = newCellPosition

    const winnerAfterMove : 'X' | 'O' | null = calculateWinner(newBoard);

    const isDraw : boolean= !winnerAfterMove && boardFull(newBoard);

    return {
        newBoard,
        nextPlayer: !xIsNext,
        winner: winnerAfterMove,
        isDraw
    };

}

function calculateWinner(board: Cell[][]): 'X' | 'O' | null {
  // Linhas
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0].typePlay &&
      board[i][0].typePlay === board[i][1].typePlay &&
      board[i][0].typePlay === board[i][2].typePlay
    ) {
      return board[i][0].typePlay;
    }
  }

  // Colunas
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j].typePlay &&
      board[0][j].typePlay === board[1][j].typePlay &&
      board[0][j].typePlay === board[2][j].typePlay
    ) {
      return board[0][j].typePlay;
    }
  }

  // Diagonais
  if (
    board[0][0].typePlay &&
    board[0][0].typePlay === board[1][1].typePlay &&
    board[0][0].typePlay === board[2][2].typePlay
  ) {
    return board[0][0].typePlay;
  }
  if (
    board[0][2].typePlay &&
    board[0][2].typePlay === board[1][1].typePlay &&
    board[0][2].typePlay === board[2][0].typePlay
  ) {
    return board[0][2].typePlay;
  }

  return null;
}

export default function Board(){

  
    let initialBoard = createEmptyBoard(3,3);

    const [listBoard, setListBoard] = useState<Cell[][]>(initialBoard);
    const [xIsNext, setXIsNext] = useState(true);

    function createEmptyBoard(line : number, column : number,): Cell[][] {
        return Array.from({ length: line }, () =>
            Array.from({ length: column }, () => ({ typePlay: null }))
        );
    }

    function handlePress(row: number, col: number, playerId?: number) {
        const { newBoard, nextPlayer, winner, isDraw } = makeMove(listBoard, row, col, xIsNext, playerId);

        setListBoard(newBoard);
        setXIsNext(nextPlayer);

        if (winner) {
            Alert.alert('Fim de jogo', `O vencedor é ${winner}`);
            console.log("Fim de jogo")
        } else if (isDraw) {
            Alert.alert('Fim de jogo', 'Empate!');
              console.log("Fim de jogo")
        }
    }


    return (
        <View style={styles.board}>
            {
                listBoard.map((row,rowIndex)=>(
                    <View key={rowIndex} style={styles.boardRow}>
                        {
                            row.map((cell, colIndex) => (
                                <TouchableOpacity 
                                    key={colIndex}
                                    style={styles.boardCell}
                                    onPress={() => handlePress(rowIndex, colIndex)}
                                    >
                                    <Text style={styles.boardCellText}>{cell.typePlay}</Text>
                                  
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                ))
            }

        </View>
    )

}

 const styles = StyleSheet.create({
    board: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    boardRow : {
        flexDirection: 'row',
    },
    boardCell :  {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boardCellText : {
        fontSize: 48,
        fontWeight: 'bold',

    },
 })