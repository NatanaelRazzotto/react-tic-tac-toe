import { useContext, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GameTurnProps } from "../types/gameTurn";
import { CellType } from "../enums/CellType";
import { MatchStatus } from "../enums/MatchStatus";
import GameModal from "./GameModal";
import { PlayerContext } from "../contexts/playerContext";
import { createGameMatch, createMove, getUsers } from "../api/userService";
import { CreateGameMatchDto } from "../models/CreateGameMatchDto";
import { CreateMoveDTO } from "../models/createMoveDTO";
import { GameMatch } from "../models/gameMatch";
import { User } from "../models/user";


type Cell = {
//  validePlay: boolean; // Jogada Realizada
  typePlay: CellType;  //'X' | 'O' | null;   // quem marcou a casa
  playerId ?: string;           // quem marcou a casa
  timestamp?: number;          // hora da jogada (opcional)
  isWinning?: boolean;         // se faz parte da linha vencedora
};

type MoveResult = {
  newBoard: Cell[][];
  nextPlayer: boolean;
  winner: CellType | null;
  isDraw: boolean;
};


export default function Board(){

    const playerContext = useContext(PlayerContext);
  
    if (!playerContext) {
      return <Text>Contexto não disponível</Text>;
    }
  
    const { controlTurn } = playerContext;
    const { gameMatch } = controlTurn;
  
    let initialBoard = createEmptyBoard(3,3);

    const [listBoard, setListBoard] = useState<Cell[][]>(initialBoard);
    const [modalVisible, setModalVisible] = useState(false);


    function createEmptyBoard(line : number, column : number,): Cell[][] {
        return Array.from({ length: line }, () =>
            Array.from({ length: column }, () => ({ typePlay: CellType.NoneType}))
        );
    }

    function handlePress(row: number, col: number, playerId?: number) {
        if(gameMatch?.status != MatchStatus.InProgress)
        {
            console.log("Nao pode preencher")
             Alert.alert('Fim de jogo', 'Empate!');
            return;
        }
        const { newBoard, nextPlayer, winner, isDraw } = makeMove(listBoard, row, col, controlTurn.xIsNext, playerId);

        setListBoard(newBoard);
        //setXIsNext(nextPlayer);

        playerContext?.setControlMatch(nextPlayer)
        
        // setControlTurn(prev => ({
        //   ...prev,
        //   xIsNext: nextPlayer, // alterna jogador
        // }));

        if (winner) {
            console.log('Fim de jogo', `O vencedor é ${winner}`);
            setModalVisible(true);
            if(CellType.FirstType == winner){
              playerContext?.setControlWinnerMatch(MatchStatus.FirstPlayerWon)
              // setControlTurn(prev => ({
              //   ...prev,
              //   matchWinner : TypeMatchWinner.FIRST
              // }));
            }
            else{       
              playerContext?.setControlWinnerMatch(MatchStatus.SecondPlayerWon)     
              // setControlTurn(prev => ({
              //   ...prev,
              //   matchWinner : TypeMatchWinner.FIRST
              // }));
            }
            console.log("Fim de jogo")
            
        } else if (isDraw) {
          
            setModalVisible(true);
              playerContext?.setControlWinnerMatch(MatchStatus.Draw)
            // setControlTurn(prev => ({
            //   ...prev,
            //   matchWinner : TypeMatchWinner.DRAW
            // }));
      
            Alert.alert('Fim de jogo', 'Empate!');
            console.log("Fim de jogo")
        }
    }

    
function boardFull(board: Cell[][]): boolean {
  for (let row of board) {
    if (row.some(cell => !cell.typePlay)) return false;
  }
  return true;
}

function makeMove(  board: Cell[][], row: number, col: number, xIsNext: boolean, playerId?: number): MoveResult{


  
    // if (board[row][col].typePlay ) {
    //     console.log("test")
    //     //return { newBoard: board, nextPlayer: xIsNext, winner : null, isDraw: false };
    // }

    const newBoard : Cell[][]= structuredClone(board);

    const newCellPosition : Cell = {
        typePlay: xIsNext ? CellType.FirstType: CellType.SecondType, // X ou Y
        playerId : xIsNext ? gameMatch?.firstPlayer?.id : gameMatch?.secondPlayer?.id,
        timestamp: Date.now()
    } 

    newBoard[row][col] = newCellPosition

    registerMove(newCellPosition.playerId, gameMatch?.id,row,col,newCellPosition.typePlay)

    // Valida e indica se o player 1 ou 2 fez a combinacao vencedora, se nao é null (sem combinacao vencedora)
    const winnerAfterMove : CellType | null = calculateWinner(newBoard); 

    // Indicara se ocorreu enpate técnico
    const isDraw : boolean= !winnerAfterMove && boardFull(newBoard);

    return {
        newBoard,
        nextPlayer: !xIsNext,
        winner: winnerAfterMove,
        isDraw
    };

}

    async function registerMove(playerId : string | undefined, gameMatchId : string | undefined ,  positionRow : number,  positionColumn : number,typeOfPlay : CellType ) {
      // Monta o DTO
      let createGameMatchDto: CreateMoveDTO = {
        responsiblePlayerId: playerId,
        associatedMatchId: gameMatchId,
        positionColumn : positionColumn,
        positionRow : positionRow,
        typeOfPlay : typeOfPlay
      };

      try {
        // Chama a API e pega o ID retornado
        const createdGameMatchId = await createMove(createGameMatchDto);
        console.log(createdGameMatchId.id)
 
      } catch (error) {
        console.error("Erro ao criar partida:", error);
        Alert.alert("Erro", "Não foi possível criar a partida.");
      }
    }

function calculateWinner(board: Cell[][]): CellType | null { // Deve retornar quem ganhou 'X' | 'O' | ou ninguem null
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
                                    <Text style={styles.boardCellText}>{cell.typePlay == CellType.NoneType? null : cell.typePlay === CellType.FirstType ? "X" : "O" }</Text>
                                  
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                ))

                
            }
          <GameModal
            visible={modalVisible}    
            onClose={() => setModalVisible(false)}
          />
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