import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { NotifyModalProps } from '../../types/notifyModalProps';

export default function NotifyModal({ title, mensage, visible, onClose }: NotifyModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose} // no Android back button
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {title && <Text style={styles.title}>{title}</Text>}
          {mensage && <Text style={styles.message}>{mensage}</Text>}

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
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
