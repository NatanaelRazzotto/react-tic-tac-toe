import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Screen, Navigator } = createBottomTabNavigator();

import HomeScreen from '../screens/HomeScreen'
import PlayScreen from '../screens/PlayGameScreen';
import { PlayStackRoutes } from './play-stack.routes';
import ManagePlayersScreen from '../screens/ManagePlayersScreen';
import { Ionicons } from '@expo/vector-icons'; // ou qualquer outra lib de ícones

import { bottomTabOptions } from '../styles/navigationTheme';

export function BottomTabsRoutes() {
  return (
    <Navigator screenOptions={bottomTabOptions}>
      {/* <Screen 
        name="home" 
        component={HomeScreen} 
        options={{
             title: "🏠 Início",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      /> */}
      <Screen 
        name="play" 
        component={PlayStackRoutes} 
        options={{
            title: "🎮 Jogo da Velha",
          tabBarIcon: ({ color, size }) => <Ionicons name="game-controller" color={color} size={size} />,
        }}
      />
      <Screen 
        name="gerenciar" 
        component={ManagePlayersScreen} 
        options={{
            title: "👤 Gerenciar",
          tabBarIcon: ({ color, size }) => <Ionicons name="people" color={color} size={size} />,
        }}
      />
    </Navigator>
  );
}