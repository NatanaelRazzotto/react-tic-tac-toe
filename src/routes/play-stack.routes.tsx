import { createStackNavigator } from '@react-navigation/stack';

import InitialGameMatchScreen from '../screens/InitialGameMatchScreen';
import PlayGameScreen from '../screens/PlayGameScreen';
import SelectPlayerScreen from '../screens/SelectPlayerScreen';


const { Screen, Navigator }  = createStackNavigator();

export function PlayStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
   
        <Screen name="GameInitial" component={InitialGameMatchScreen} />
        <Screen name="GamePlay" component={PlayGameScreen} />
        <Screen name='SelectPlayer' component={SelectPlayerScreen}></Screen>
    </Navigator>
  );
}
