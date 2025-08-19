import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Screen, Navigator } = createBottomTabNavigator();

import HomeScreen from '../screens/HomeScreen'
import PlayScreen from '../screens/PlayScreen';

export function BottomTabsRoutes(){
    return (
        <Navigator>
            <Screen
                name='home'
                component={HomeScreen}>                
            </Screen>
               <Screen
                name='play'
                component={PlayScreen}>                
            </Screen>
        </Navigator>
    )
}
