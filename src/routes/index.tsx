import { NavigationContainer } from "@react-navigation/native";
//contexto 
import {BottomTabsRoutes} from './bottom-tabs.routes'
import PlayerContextProvider from "../contexts/playerContext";
//caixa de contexto
export function Routes(){

    return( 
    <NavigationContainer>
          <PlayerContextProvider>
        <BottomTabsRoutes/>
        </PlayerContextProvider>
    </NavigationContainer>)
   
}