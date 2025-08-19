import {View, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
export default function PlayScreen(){
    return (
        <View style={{ flex : 1}}>
            <Text >
                Play works!!!
            </Text>
             <StatusBar style="auto" />
        </View>
    )
}