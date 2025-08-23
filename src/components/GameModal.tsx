// GameModal.tsx
import React, { useMemo } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { ManagerGameModalProps } from '../types/managerGameModalProps';
import { TypeMatchWinner } from '../enums/TypeMatchWinner';


export default function GameModal({ visible, onClose ,controlTurn}: ManagerGameModalProps) {
  
  
    const definedTitle = useMemo(() => {
   
      if (controlTurn.matchWinner === TypeMatchWinner.NONE) {
        return "SEM DEFINIÇÃO!";
      } else if (
        controlTurn.matchWinner === TypeMatchWinner.DRAW
      ) {
        return "EMPATE!";
      }
      else{
        return "PARTIDA ENCERRADA!";
      }
    }, [controlTurn]);

    const definedDescricao = useMemo(() => {
   
      if (
        controlTurn.matchWinner === TypeMatchWinner.DRAW
      ) {
        return "Nenhum ganhador!";
      }
      else if (
        controlTurn.matchWinner === TypeMatchWinner.FIRST
      ) {
        return "Jogador " + controlTurn.player1.name + ", GANHOU! ";
      }
      else if (
        controlTurn.matchWinner === TypeMatchWinner.SECOND
      ) { 
        return "Jogador " + controlTurn.player2.name + ", GANHOU! ";
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
