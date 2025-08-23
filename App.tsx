import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Routes} from './src/routes'
import PlayerContextProvider from './src/contexts/playerContext';
export default function App() {
  return (

    <Routes></Routes>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
