import { View, Text, StyleSheet } from "react-native";
import { GameTurnProps } from "../types/gameTurn";
import { TypeMatchWinner } from "../enums/TypeMatchWinner";
import { useContext, useMemo } from "react";
import { PlayerContext } from "../contexts/playerContext";

export default function PlayersPanel() {
  const playerContext = useContext(PlayerContext);

  if (!playerContext) {
    return <Text>Contexto não disponível</Text>;
  }

  const { controlTurn } = playerContext;

  const player1Style = useMemo(() => {
    if (!controlTurn) return undefined;

    if (controlTurn.matchWinner === TypeMatchWinner.NONE) {
      return controlTurn.xIsNext ? styles.activePlayer : undefined;
    } else if (
      controlTurn.matchWinner === TypeMatchWinner.FIRST ||
      controlTurn.matchWinner === TypeMatchWinner.DRAW
    ) {
      return styles.winnerPlayer;
    }
    return undefined;
  }, [controlTurn]);

  const player2Style = useMemo(() => {
    if (!controlTurn) return undefined;

    if (controlTurn.matchWinner === TypeMatchWinner.NONE) {
      return !controlTurn.xIsNext ? styles.activePlayer : undefined;
    } else if (
      controlTurn.matchWinner === TypeMatchWinner.SECOND ||
      controlTurn.matchWinner === TypeMatchWinner.DRAW
    ) {
      return styles.winnerPlayer;
    }
    return undefined;
  }, [controlTurn]);

  return (
    <View style={styles.container}>
      {controlTurn.player1 && controlTurn.player2 ? (
        <>
          <View style={[styles.playerBox, player1Style]}>
            <Text style={styles.playerName}>{controlTurn.player1.name}</Text>
            <Text style={styles.symbol}>X</Text>
            {controlTurn.xIsNext &&
              controlTurn.matchWinner === TypeMatchWinner.NONE && (
                <Text style={styles.turnText}>Sua vez!</Text>
              )}
          </View>

          <View style={[styles.playerBox, player2Style]}>
            <Text style={styles.playerName}>{controlTurn.player2.name}</Text>
            <Text style={styles.symbol}>O</Text>
            {!controlTurn.xIsNext &&
              controlTurn.matchWinner === TypeMatchWinner.NONE && (
                <Text style={styles.turnText}>Sua vez!</Text>
              )}
          </View>
        </>
      ) : (
        <Text>Carregando jogadores...</Text>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  playerBox: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  activePlayer: {
    backgroundColor: "#4CAF50",
  },
  winnerPlayer: {
    backgroundColor: "#d69813ff",
  },
  playerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  symbol: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
  turnText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
