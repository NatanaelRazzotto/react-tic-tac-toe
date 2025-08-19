import {View, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
export default function HomeScreen(){
    return (
        <View style={{ flex : 1}}>
            <Text >
                Home works!!!
            </Text>
             <StatusBar style="auto" />
        </View>
    )
}