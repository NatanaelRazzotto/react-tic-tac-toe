import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Board from '../components/Board';
import PlayersPanel from '../components/PlayersPanel';
import { useState } from 'react';
export default function PlayGameScreen(){

    const [xIsNext, setXIsNext] = useState(true);

     let player1 = {
        id: "111",
        name: "test",
      
    };   

       let player2 = {
        id: "222",
        name: "aaaa",
    
    }; 
 

    return (
        <View style={styles.container}>           

            <Text >
                Play works!!!
            </Text>

            <PlayersPanel
                player1={player1}
                player2={player2}
                xIsNext={xIsNext}
            />
            <Board setXIsNext={setXIsNext} xIsNext={xIsNext}></Board>

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