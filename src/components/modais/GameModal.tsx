// GameModal.tsx
import React, { useContext, useMemo } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { ManagerGameModalProps } from '../../types/managerGameModalProps';
import { MatchStatus } from '../../enums/MatchStatus';
import { PlayerContext } from '../../contexts/playerContext';


export default function GameModal({ visible, onClose}: ManagerGameModalProps) {
  
    const playerContext = useContext(PlayerContext);
  
    if (!playerContext) {
      return <Text>Contexto não disponível</Text>;
    }
    
    const { controlTurn } = playerContext;
    const { gameMatch } = controlTurn;
  
    const definedTitle = useMemo(() => {
   
      if (gameMatch?.status === MatchStatus.InProgress) {
        return "SEM DEFINIÇÃO!";
      } else if (
        gameMatch?.status === MatchStatus.Draw
      ) {
        return "EMPATE!";
      }
      else{
        return "PARTIDA ENCERRADA!";
      }
    }, [controlTurn]);

    const definedDescricao = useMemo(() => {
   
      if (
        gameMatch?.status === MatchStatus.Draw
      ) {
        return "Nenhum ganhador!";
      }
      else if (
        gameMatch?.status === MatchStatus.FirstPlayerWon
      ) {
        return "Jogador " + gameMatch?.firstPlayer?.name + ", GANHOU! ";
      }
      else if (
        gameMatch?.status === MatchStatus.SecondPlayerWon
      ) { 
        return "Jogador " + gameMatch?.secondPlayer?.name + ", GANHOU! ";
      }
      return ""
    }, [controlTurn]);
  
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose} // Android
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{definedTitle}</Text>
          <Text style={styles.message}>{definedDescricao}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      },
      default: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
