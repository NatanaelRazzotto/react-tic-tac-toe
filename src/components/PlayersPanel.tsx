import { View, Text, StyleSheet } from "react-native";
import { ControlTurn } from "../types/controlTurn";


export default function PlayersPanel({ player1, player2, xIsNext }: ControlTurn) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.playerBox,
          xIsNext && styles.activePlayer,
        ]}
      >
        <Text style={styles.playerName}>{player1.name}</Text>
        <Text style={styles.symbol}>X</Text>
        {xIsNext && (
          <Text style={styles.turnText}>Sua vez!</Text>
        )}
      </View>

      <View
        style={[
          styles.playerBox,
          !xIsNext && styles.activePlayer,
        ]}
      >
        <Text style={styles.playerName}>{player2.name}</Text>
        <Text style={styles.symbol}>0</Text>
        {!xIsNext && (
          <Text style={styles.turnText}>Sua vez!</Text>
        )}
      </View>
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
