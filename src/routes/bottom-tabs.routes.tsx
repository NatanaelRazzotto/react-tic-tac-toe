import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Screen, Navigator } = createBottomTabNavigator();

import HomeScreen from '../screens/HomeScreen'
import PlayScreen from '../screens/PlayGameScreen';
import { PlayStackRoutes } from './play-stack.routes';
import ManagePlayersScreen from '../screens/ManagePlayersScreen';

export function BottomTabsRoutes(){
    return (
        <Navigator>
            <Screen
                name='home'
                component={HomeScreen}>                
            </Screen>
            <Screen name="play" component={PlayStackRoutes} />
            <Screen name="gerenciar" component={ManagePlayersScreen} />
        </Navigator>
    )
}
