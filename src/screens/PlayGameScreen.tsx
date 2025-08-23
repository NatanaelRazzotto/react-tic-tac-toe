import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Board from '../components/Board';
import PlayersPanel from '../components/PlayersPanel';
import { useContext, useState } from 'react';
import { TypeMatchWinner } from '../enums/TypeMatchWinner';
import { ControlTurn } from '../types/controlTurn';
import { PlayerContext } from '../contexts/playerContext';
export default function PlayGameScreen(){

    


    return (
        <View style={styles.container}>           

            <Text >
                Play works!!!
            </Text>

            <PlayersPanel/>
            <Board ></Board>

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