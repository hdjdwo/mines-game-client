import React, { createContext } from "react";
import type { GameAction, GameState} from "./GameActions";


export const GameStateContext = createContext<GameState | null>(null)
export const GameDispatchContext = createContext<React.Dispatch<GameAction> | null>(null)