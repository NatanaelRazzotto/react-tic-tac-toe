import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Board from '../components/Board';
import PlayersPanel from '../components/PlayersPanel';
import { useState } from 'react';
import { TypeMatchWinner } from '../enums/TypeMatchWinner';
import { ControlTurn } from '../types/controlTurn';
export default function PlayGameScreen(){

   const [controlTurn, setControlTurn] = useState<ControlTurn>({
    player1: { id: "1", name: "Jogador 1" },
    player2: { id: "2", name: "Jogador 2" },
    xIsNext: true, // X começa jogando
    matchWinner: TypeMatchWinner.NONE, // supondo que você tenha None no enum
    });

    return (
        <View style={styles.container}>           

            <Text >
                Play works!!!
            </Text>

            <PlayersPanel
              controlTurn={controlTurn} setControlTurn={setControlTurn}
            />
            <Board controlTurn={controlTurn} setControlTurn={setControlTurn} ></Board>

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
    }
 })