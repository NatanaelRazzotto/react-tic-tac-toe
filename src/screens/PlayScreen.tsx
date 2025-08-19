import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Board from '../components/Board';
export default function PlayScreen(){
    return (
        <View style={styles.container}>           
            <TouchableOpacity >
                <Text >
                    Play works!!!
                </Text>
                <Board></Board>
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
    }
 })