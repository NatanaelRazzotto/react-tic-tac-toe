import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Board from '../components/Board';
import PlayersPanel from '../components/PlayersPanel';
import { useContext, useState } from 'react';
import { MatchStatus } from '../enums/MatchStatus';
import { ControlTurn } from '../types/controlTurn';
import { PlayerContext } from '../contexts/playerContext';
import { globalStyles } from '../styles/globalStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlayStackParamList } from '../types/playStackParamList';

type PropsRoute = NativeStackScreenProps<PlayStackParamList, "GamePlay">;  
export default function PlayGameScreen({navigation} : PropsRoute){   

    return (
        <View style={globalStyles.container}>           

            <Text style={globalStyles.title}>Jogo da Velha</Text>
            <Text style={globalStyles.subtitle}>Boa sorte!</Text>

            <PlayersPanel/>
            <Board navigation={navigation}></Board>

            <StatusBar style="auto" />
        </View>
    )

   
}
