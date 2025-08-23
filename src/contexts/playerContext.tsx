import { createContext, useState } from 'react';
import { ControlTurn } from '../types/controlTurn';
import { TypeMatchWinner } from '../enums/TypeMatchWinner';
import { Player } from '../models/player';

//
interface PlayerContextProps {
    controlTurn : ControlTurn;
    setInitializeMatch : (playerOne : Player) => void;
    setSecondaryPlayer : (playerTwo : Player) => void;
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


    function setInitializeMatch(playerOne : Player){

        setControlTurn( {           
            player1: playerOne,
            player2: undefined,
            xIsNext: true,
            matchWinner: TypeMatchWinner.NONE,    
        });
    }

    function setSecondaryPlayer(playerTwo : Player){

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