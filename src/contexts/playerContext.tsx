import { createContext, useState } from 'react';
import { ControlTurn } from '../types/controlTurn';
import { MatchStatus } from '../enums/MatchStatus';
import { User } from '../models/user';

//
interface PlayerContextProps {
    controlTurn : ControlTurn;
    setInitializeMatch : (playerOne : User) => void;
    setSecondaryPlayer : (playerTwo : User) => void;
    setIdGameMatch : (GameMatchId : string) => void;
    setControlMatch : (nextPlayer : boolean) => void;
    setControlWinnerMatch: (winnerPlayer : MatchStatus) => void;
}

//contexto
export const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

//provider - segurança

export default function PlayerContextProvider({children } : any){

    const [controlTurn, setControlTurn] = useState<ControlTurn>({           
            gameMatch : undefined,           
            xIsNext: true,           
        });


    function setInitializeMatch(playerOne : User){

        setControlTurn( {           
            xIsNext: true,
            gameMatch : {
                id : undefined,
                firstPlayer: playerOne,
                secondPlayer: undefined,
                status: MatchStatus.InProgress,                 
        },
           
        });
         console.log(controlTurn)
    }

    function setIdGameMatch(GameMatchId : string){

        setControlTurn(prev => {
       
            return {
                ...prev,
                gameMatch: prev.gameMatch
                    ? { ...prev.gameMatch, id: GameMatchId }
                    : { id: GameMatchId , firstPlayer: undefined, secondPlayer: undefined,  status: MatchStatus.InProgress }        
            
            };
        });

        console.log(controlTurn)
    }

    function setSecondaryPlayer(playerTwo : User){

        setControlTurn(prev => {
       
            return {
                ...prev,
                gameMatch: prev.gameMatch
                    ? { ...prev.gameMatch, secondPlayer: playerTwo }
                    : { id: undefined, firstPlayer: undefined, secondPlayer: playerTwo, status: MatchStatus.InProgress }        
            
            };
        });
         console.log(controlTurn)
    }

    function setControlMatch(nextPlayer : boolean){
       setControlTurn(prev => {       
            return {
                ...prev,
                  xIsNext: nextPlayer, 
            
            };
        });
    }

    function setControlWinnerMatch(winnerPlayer : MatchStatus){
       setControlTurn(prev => {       
            return {
                ...prev,
                  status: winnerPlayer, 
            
            };
        });
    }


    const contextValue : PlayerContextProps = {
        controlTurn : controlTurn,
        setInitializeMatch: setInitializeMatch,
        setSecondaryPlayer: setSecondaryPlayer,
        setControlMatch : setControlMatch,
        setControlWinnerMatch : setControlWinnerMatch,
        setIdGameMatch : setIdGameMatch

    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {children }
        </PlayerContext.Provider>
    )
}