import { NavigationContainer } from "@react-navigation/native";
//contexto 
import {BottomTabsRoutes} from './bottom-tabs.routes'
//caixa de contexto
export function Routes(){

    return( 
    <NavigationContainer>
        <BottomTabsRoutes/>
    </NavigationContainer>)
   
}