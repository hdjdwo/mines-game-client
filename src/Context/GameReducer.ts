
import { InitialField, initialGameState, type GameAction, type GameState } from "./GameActions";

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameId: action.payload.gameId,
        gameStatus: 'STARTED',
        field: InitialField, 
        currentScore: 0,     
      };

    case 'REVEAL_TILE':
      return {
        ...state,
        field: state.field.map((tile) =>
          tile.index === action.payload.index
            ? {
                ...tile,
                isOpen: true,
                tileStatus: action.payload.result === 'MINE' ? 'MINE' : 'EMPTY',
              }
            : tile
        ),
       
        gameStatus: action.payload.result === 'MINE' ? 'FINISHED_LOSE' : 'CONTINUES',
      };

    case 'END_GAME':
      return {
        ...state,
        gameStatus: action.payload.status === 'LOSE' ? 'FINISHED_LOSE' : 'FINISHED_WIN',
      };

    case 'RESET_GAME':
      return {
        ...initialGameState,
        gameStatus: action.payload.prevStatus === 'LOSE' ? 'FINISHED_LOSE' : 'FINISHED_WIN',
      };

    case 'UPDATE_SCORE':
      return {
        ...state,
        currentScore: state.currentScore + action.payload.reward,
      };
    
    case 'SET_MINES_COUNT': 
    if (state.gameStatus === 'STARTED' || state.gameStatus === 'CONTINUES') {
        return state;
      }
    return {
      ...state,
      minesCount: action.payload
    }

    case 'SET_BET_AMOUNT':
      if (state.gameStatus === 'STARTED' || state.gameStatus === 'CONTINUES') {
        return state;
      }
      return {
        ...state,
        betAmount: action.payload
      }

      case 'SET_BALANCE':
      return {
        ...state,
        balance: action.payload,
      };

    default:
      return state;
  }
};