import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Board from '../../components/Board';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../../contexts/playerContext';
import { CellType } from '../../enums/CellType';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlayStackParamList } from '../../types/playStackParamList';
import { createGameMatch } from '../../api/gameMatchService';
import { CreateGameMatchDto } from '../../dto/createGameMatchDto';
import { GameMatch } from '../../models/gameMatch';
import { currentColors } from '../../styles/theme';
import NotifyModal from '../../components/modais/NotifyModal';
import { NotifyModalProps } from '../../types/notifyModalProps';

type PropsRoute = NativeStackScreenProps<PlayStackParamList, "GameInitial">;

export default function InitialGameMatchScreen({navigation } : PropsRoute){

    const [modalState, setModalState] = useState<NotifyModalProps>({
      visible: false,
      title: "AVISO",
      mensage :"",
      onClose : () => closeModal(),
    });

    const playerContext = useContext(PlayerContext);
  
    if (!playerContext) {
      return <Text>Contexto não disponível</Text>;
    }
  
    const { controlTurn } = playerContext;
    const { gameMatch } = controlTurn;

    function handleSelectPlayer(playerSelect: CellType) {
        // Aqui você pode enviar para a próxima tela qual player foi escolhido
        navigation.navigate("SelectPlayer", { typePlayer: playerSelect });
    }

    async function handleSelectStart() {
      // Monta o DTO
      let createGameMatchDto: CreateGameMatchDto = {
        firstPlayerId: gameMatch?.firstPlayer?.id,
        secondPlayerId: gameMatch?.secondPlayer?.id,
        open: gameMatch?.open ?? new Date(),
      };

      try {
        // Chama a API e pega o ID retornado
        const createdGameMatchId = await createGameMatch(createGameMatchDto);
        console.log(createdGameMatchId.id)
        // Atualiza algum estado local para mostrar o ID ou usar depois
          playerContext?.setIdGameMatch(createdGameMatchId.id);

        // Se quiser passar o ID para a próxima tela:
        navigation.navigate("GamePlay");
      } catch (error) {

        setModalState(prev => ({ ...prev, visible: true, mensage: "Não foi possível criar a partida." }));
      }
    }

    
    function closeModal() {
      setModalState(prev => ({ ...prev, visible: false }));
    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Selecione o jogador:</Text>

        <TouchableOpacity 
            style={[styles.button]} 
            onPress={() => handleSelectPlayer(CellType.FirstType)}
             disabled={gameMatch?.firstPlayer ? true : false} 
        >
            <Text style={styles.buttonText}>{gameMatch?.firstPlayer ? gameMatch.firstPlayer.name : "Selecione o Jogador"}  (X)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.button]} 
            onPress={() => handleSelectPlayer(CellType.SecondType)}
             disabled={gameMatch?.secondPlayer ? true : false} 
        >
            <Text style={styles.buttonText}>{gameMatch?.secondPlayer ? gameMatch.secondPlayer.name : "Selecione o Jogador"} (O)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.button,  { backgroundColor: gameMatch?.firstPlayer && gameMatch?.secondPlayer  ?  '#2196F3' : '#ccc' }]} 
            onPress={() => handleSelectStart()}
            disabled={gameMatch?.firstPlayer && gameMatch?.secondPlayer ? false : true} 
        >
            <Text style={styles.buttonText}>INICIAR</Text>
        </TouchableOpacity>

            <NotifyModal
              title={modalState.title}
              mensage={modalState.mensage}
              visible={modalState.visible}
              onClose={modalState.onClose}
          />

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
    backgroundColor: currentColors.secondary,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});