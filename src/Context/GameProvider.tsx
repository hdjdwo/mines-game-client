import { useReducer, type ReactNode } from "react";
import { gameReducer } from "./GameReducer";
import { initialGameState } from "./GameActions";
import { GameDispatchContext, GameStateContext } from "./GameContext";



export const GameProvider = ({children} : {children : ReactNode}) => {
const [state, dispatch] = useReducer(gameReducer, initialGameState)

return (
  <GameStateContext.Provider value={state}>
    <GameDispatchContext.Provider value={dispatch}>
      {children}
    </GameDispatchContext.Provider>
  </GameStateContext.Provider>
)
}