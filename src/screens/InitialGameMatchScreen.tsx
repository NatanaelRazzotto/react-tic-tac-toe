import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Board from '../components/Board';
import { useNavigation } from '@react-navigation/native';
export default function InitialGameMatchScreen({navigation } : any){

    function navToPlayGame(){
        navigation.navigate('GamePlay')
    } 

    function handleSelectPlayer(player: number) {
        // Aqui você pode enviar para a próxima tela qual player foi escolhido
        navigation.navigate('SelectPlayer', { player });
    }

    function handleSelectStart(player: number) {
        // Aqui você pode enviar para a próxima tela qual player foi escolhido
        navigation.navigate('GamePlay', { player });
    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Selecione o jogador:</Text>

        <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#4CAF50' }]} 
            onPress={() => handleSelectPlayer(1)}
        >
            <Text style={styles.buttonText}>Jogador 1 (X)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#2196F3' }]} 
            onPress={() => handleSelectPlayer(2)}
        >
            <Text style={styles.buttonText}>Jogador 2 (O)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#2196F3' }]} 
            onPress={() => handleSelectStart(2)}
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