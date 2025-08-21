import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";

type Player = {
  id: number;
  name: string;
  symbol: "X" | "O";
};

export default function ManagePlayersScreen() {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Alice", symbol: "X" },
    { id: 2, name: "Bob", symbol: "O" },
  ]);

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState<"X" | "O">("X");

  function handleAddPlayer() {
    if (!name.trim()) {
      Alert.alert("Erro", "Digite o nome do jogador.");
      return;
    }

    const newPlayer: Player = {
      id: Date.now(),
      name,
      symbol,
    };

    setPlayers((prev) => [...prev, newPlayer]);
    setName("");
  }

  function handleDeletePlayer(id: number) {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Jogadores</Text>

      {/* Formulário de cadastro */}
      <TextInput
        style={styles.input}
        placeholder="Nome do jogador"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.symbolContainer}>
        <TouchableOpacity
          style={[
            styles.symbolButton,
            symbol === "X" && styles.symbolSelected,
          ]}
          onPress={() => setSymbol("X")}
        >
          <Text style={styles.symbolText}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.symbolButton,
            symbol === "O" && styles.symbolSelected,
          ]}
          onPress={() => setSymbol("O")}
        >
          <Text style={styles.symbolText}>O</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
        <Text style={styles.addButtonText}>Cadastrar Jogador</Text>
      </TouchableOpacity>

      {/* Lista de jogadores */}
      <FlatList
        style={{ marginTop: 20 }}
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.playerItem}>
            <Text style={styles.playerName}>
              {item.name} ({item.symbol})
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeletePlayer(item.id)}
            >
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  symbolContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  symbolButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  symbolSelected: {
    backgroundColor: "#4CAF50",
  },
  symbolText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  playerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#e53935",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
  },
});
