import {createContext, useState} from "react";

export const GameContext = createContext();
export const GameProvider = ({initialState, children, ...rest}) => {
    const [auticka, setAuticka] = useState(initialState.auticka);
    return(
        <GameContext.Provider value={{auticka, setAuticka}}>
          {children}  
        </GameContext.Provider>
    );
}

export default GameProvider;