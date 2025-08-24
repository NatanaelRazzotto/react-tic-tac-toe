import { useState , useContext, use, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { PlayerContext } from "../contexts/playerContext";
import { User } from "../models/user";
import { CellType } from "../enums/CellType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PlayStackParamList } from "../types/playStackParamList";
import { getUsers } from "../api/userService";

type PropsRoute = NativeStackScreenProps<PlayStackParamList, "SelectPlayer">;

export default function SelectPlayerScreen({ route, navigation }: PropsRoute) {

  const { typePlayer } = route.params;

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [filteredUsers, setfilteredUsers] = useState<Array<User>>([]);

  const playerContext  = useContext(PlayerContext);

  useEffect(() => {
    async function loadUsers() {
      const returnUser : Array<User> = await getUsers()
      console.log(returnUser)
      let filteredUsers : User[] = returnUser
        .filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )

      if (playerContext?.controlTurn.gameMatch?.firstPlayer){
        filteredUsers = filteredUsers.filter(user =>
          user.id !== playerContext?.controlTurn.gameMatch?.firstPlayer?.id
        );
      }
      setfilteredUsers(filteredUsers)
    }
    loadUsers();
  }, []);




  function handleSelect(user: User) {
    console.log(user)  
    setSelectedUser(user);
  }

  function handleConfirm() {
    if (!selectedUser) return;
    if (typePlayer == CellType.FIRST){
      playerContext?.setInitializeMatch(selectedUser)
    }
    else if (typePlayer == CellType.SECOND){
      playerContext?.setSecondaryPlayer(selectedUser)
    }
    navigation.navigate("GameInitial");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione um Jogador</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar usuário..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.userItem,
              selectedUser?.id === item.id && styles.userSelected,
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text
              style={[
                styles.userText,
                selectedUser?.id === item.id && styles.userTextSelected,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={[styles.confirmButton, !selectedUser && { backgroundColor: "#ccc" }]}
        onPress={handleConfirm}
        disabled={!selectedUser}
      >
        <Text style={styles.confirmText}>Confirmar Jogador</Text>
      </TouchableOpacity>

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
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  userItem: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#eee",
  },
  userSelected: {
    backgroundColor: "#4CAF50",
  },
  userText: {
    fontSize: 16,
    color: "#333",
  },
  userTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
