import { useContext } from "react"
import { GameDispatchContext, GameStateContext } from "./GameContext"


export const useGame = () => {
  const context = useContext(GameStateContext)
  if(!context) {
    throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}

export const useGameDispatch = () => {
  const context = useContext(GameDispatchContext)
  if(!context) {
    throw new Error('useGameDispatch must be used within a GameProvider');
  }
  return context;
}