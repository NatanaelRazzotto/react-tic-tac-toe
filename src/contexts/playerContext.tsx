import { createContext, useState } from 'react';
import { ControlTurn } from '../types/controlTurn';
import { TypeMatchWinner } from '../enums/TypeMatchWinner';
import { User } from '../models/user';

//
interface PlayerContextProps {
    controlTurn : ControlTurn;
    setInitializeMatch : (playerOne : User) => void;
    setSecondaryPlayer : (playerTwo : User) => void;
    setControlMatch : (nextPlayer : boolean) => void;
    setControlWinnerMatch: (winnerPlayer : TypeMatchWinner) => void;
}

//contexto
export const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

//provider - segurança

export default function PlayerContextProvider({children } : any){

    const [controlTurn, setControlTurn] = useState<ControlTurn>({           
            player1: undefined,
            player2: undefined,
            xIsNext: true,
            matchWinner: TypeMatchWinner.NONE,    
        });


    function setInitializeMatch(playerOne : User){

        setControlTurn( {           
            player1: playerOne,
            player2: undefined,
            xIsNext: true,
            matchWinner: TypeMatchWinner.NONE,    
        });
    }

    function setSecondaryPlayer(playerTwo : User){

        setControlTurn(prev => {
       
            return {
                ...prev,
                player2: playerTwo,
            
            };
        });
    }

    function setControlMatch(nextPlayer : boolean){
       setControlTurn(prev => {       
            return {
                ...prev,
                  xIsNext: nextPlayer, 
            
            };
        });
    }

    function setControlWinnerMatch(winnerPlayer : TypeMatchWinner){
       setControlTurn(prev => {       
            return {
                ...prev,
                  matchWinner: winnerPlayer, 
            
            };
        });
    }


    const contextValue : PlayerContextProps = {
        controlTurn : controlTurn,
        setInitializeMatch: setInitializeMatch,
        setSecondaryPlayer: setSecondaryPlayer,
        setControlMatch : setControlMatch,
        setControlWinnerMatch : setControlWinnerMatch

    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {children }
        </PlayerContext.Provider>
    )
}