
import { InitialField,  type GameAction, type GameState } from "./GameActions";



export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameId: action.payload.gameId,
        gameStatus: 'STARTED',
        field: InitialField, 
        currentScore: 0,
        payoutTable: action.payload.payoutTable,
        isModalOpen: false,    
      };

   case 'REVEAL_TILE': {
  const { index, result, status, allMines, multiplier } = action.payload;
  const isLost = status === 'LOST' || result === 'MINE';

  if (isLost && allMines) {
    return {
      ...state,
      field: state.field.map((tile) => {
        const isMine = allMines.includes(tile.index);
        return {
          ...tile,
          isOpen: isMine ? true : tile.isOpen, 
          tileStatus: isMine ? 'MINE' : tile.tileStatus,
          isExploded: tile.index === index, 
        };
      }),
      gameStatus: 'FINISHED_LOSE',
      currentScore: 0, 
    };
  }

  return {
    ...state,
    field: state.field.map((tile) =>
      tile.index === index
        ? { ...tile, isOpen: true, tileStatus: 'EMPTY' }
        : tile
    ),
    gameStatus: 'CONTINUES',
    currentScore: Math.floor(state.betAmount * multiplier * 100) / 100,
  };
}

case 'CLOSE_MODAL' :
  return {
    ...state,
    isModalOpen: false,
  }

 
    case 'CASHOUT' :
      return {
        ...state,
        field: state.field.map((tile) => {
          const isMine = action.payload.allMines.includes(tile.index);
          return {
            ...tile,
            isOpen: isMine ? true : tile.isOpen,
            tileStatus: isMine ? 'MINE' : tile.tileStatus,
            isExploded: false
          }
        }),
        gameStatus: 'FINISHED_WIN',
        currentScore: action.payload.winAmount,
        isModalOpen: true
      }

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

    case "GAME_RECOVERY":
    return {
        ...state,
        gameStatus: 'CONTINUES',
        betAmount: action.payload.betAmount, 
        gameId: action.payload.gameId,
        minesCount: action.payload.minesCount,
        payoutTable: action.payload.paytable,
        currentScore: action.payload.currentScore,
        field: state.field.map((tile) => ({
            ...tile,
            isOpen: action.payload.opened.includes(tile.index),
            tileStatus: action.payload.opened.includes(tile.index) ? 'EMPTY' : tile.tileStatus
        }))
    };

    case 'APPLY_LAST_SETTINGS':
      return {
        ...state,
        betAmount: action.payload.betAmount,
        minesCount: action.payload.minesCount
      }

      case 'CHANGE_MODE':
        if(state.gameStatus.includes("FINISHED") || state.mode === 'AUTO') {
          return {
          ...state,
          mode: action.payload,
          field: InitialField
        }
        }
        return {
          ...state,
          mode: action.payload
        }

        case 'SET_GAME_COUNT':
          return {
            ...state,
            gameCount: action.payload
          }


    default:
      return state;
  }
};