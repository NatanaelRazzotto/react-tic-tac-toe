import { createStackNavigator } from '@react-navigation/stack';

import InitialGameMatchScreen from '../screens/matchGame/InitialGameMatchScreen';
import PlayGameScreen from '../screens/PlayGameScreen';
import SelectPlayerScreen from '../screens/matchGame/SelectPlayerScreen';
import { PlayStackParamList } from '../types/playStackParamList';

const Stack = createStackNavigator<PlayStackParamList>();

export function PlayStackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GameInitial" component={InitialGameMatchScreen} />
      <Stack.Screen name="GamePlay" component={PlayGameScreen} />
      <Stack.Screen name="SelectPlayer" component={SelectPlayerScreen} />
    </Stack.Navigator>
  );
}
