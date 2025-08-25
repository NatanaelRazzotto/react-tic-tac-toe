import { useEffect, useState } from "react"; 
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
import { createUser, getUsers, updateUser } from "../api/userService";
import { User } from "../models/user";

export default function ManagePlayersScreen() {
  const [players, setPlayers] = useState<User[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [symbol, setSymbol] = useState<"X" | "O">("X");
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

  const [searchUsers, setSearchUsers] = useState<User[]>([]);

  useEffect(() => {
   
    loadUsers();
  }, []);

   async function loadUsers() {
      const returnUser: User[] = await getUsers();
      setSearchUsers(returnUser);
    }

  async  function handleAddOrEditPlayer() {
    if (!name.trim() || !email.trim() || !nickname.trim()) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (editingPlayerId !== null) {
      // Editando

       let newPlayer: User = {
        id: editingPlayerId,
        name,
        email,
        nickname,
      };

      await updateUser(editingPlayerId, newPlayer);

      setEditingPlayerId(null);

      // 🔹 Atualiza lista após update
      await loadUsers();
    } else {
      // Novo jogador
      let newPlayer: User = {
        id: "",
        name,
        email,
        nickname,
      };

      await createUser(newPlayer);

       // 🔹 Atualiza lista após create
      await loadUsers();
    }

    setName("");
    setEmail("");
    setNickname("");
    setSymbol("X");
  }

  function handleDeletePlayer(id: string) {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }

  function handleEditPlayer(player: User) {
    setEditingPlayerId(player.id);
    setName(player.name);
    setEmail(player.email);
    setNickname(player.nickname);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Jogadores</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do jogador"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email do jogador"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Nickname do jogador"
        value={nickname}
        onChangeText={setNickname}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddOrEditPlayer}>
        <Text style={styles.addButtonText}>
          {editingPlayerId !== null ? "Salvar Alterações" : "Cadastrar Jogador"}
        </Text>
      </TouchableOpacity>

      <FlatList
        style={{ marginTop: 20 }}
        data={searchUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.playerItem}>
            <Text style={styles.playerName}>
              {item.name} ({item.nickname})
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.deleteButton, { backgroundColor: "#4CAF50", marginRight: 5 }]}
                onPress={() => handleEditPlayer(item)}
              >
                <Text style={styles.deleteText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePlayer(item.id)}
              >
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, backgroundColor: "#fff", marginBottom: 10 },
  addButton: { backgroundColor: "#2196F3", padding: 12, borderRadius: 8, alignItems: "center" },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  playerItem: { flexDirection: "row", justifyContent: "space-between", padding: 12, borderRadius: 8, backgroundColor: "#fff", marginBottom: 8, alignItems: "center" },
  playerName: { fontSize: 16 },
  deleteButton: { backgroundColor: "#e53935", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  deleteText: { color: "#fff", fontWeight: "600" },
});
