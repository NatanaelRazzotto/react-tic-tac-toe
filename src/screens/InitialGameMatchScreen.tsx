import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Board from '../components/Board';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { PlayerContext } from '../contexts/playerContext';
import { CellType } from '../enums/CellType';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlayStackParamList } from '../types/playStackParamList';

type PropsRoute = NativeStackScreenProps<PlayStackParamList, "GameInitial">;

export default function InitialGameMatchScreen({navigation } : PropsRoute){

    const playerContext = useContext(PlayerContext);
  
    if (!playerContext) {
      return <Text>Contexto não disponível</Text>;
    }
  
    const { controlTurn } = playerContext;

    function navToPlayGame(){
        navigation.navigate('GamePlay')
    } 

    function handleSelectPlayer(playerSelect: CellType) {
        // Aqui você pode enviar para a próxima tela qual player foi escolhido
        navigation.navigate("SelectPlayer", { typePlayer: playerSelect });
    }

    function handleSelectStart(player: number) {
        // Aqui você pode enviar para a próxima tela qual player foi escolhido
        navigation.navigate('GamePlay');
    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Selecione o jogador:</Text>

        <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#4CAF50' }]} 
            onPress={() => handleSelectPlayer(CellType.FIRST)}
        >
            <Text style={styles.buttonText}>{controlTurn.player1 ? controlTurn.player1.name : "Selecione o Jogador"}  (X)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#2196F3' }]} 
            onPress={() => handleSelectPlayer(CellType.SECOND)}
        >
            <Text style={styles.buttonText}>{controlTurn.player2 ? controlTurn.player2.name : "Selecione o Jogador"} (O)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.button,  { backgroundColor: controlTurn.player1 && controlTurn.player2  ?  '#2196F3' : '#ccc' }]} 
            onPress={() => handleSelectStart(2)}
            disabled={controlTurn.player1 && controlTurn.player2 ? false : true} 
        >
            <Text style={styles.buttonText}>INICIAR</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
        </View>
    )

   
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});