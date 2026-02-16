

type TileStatus = 'CLOSE' | 'MINE' | 'EMPTY' 
type GameStatus = 'STARTED' | 'FINISHED_LOSE' | 'CONTINUES' | 'FINISHED_WIN'
type GameMode = 'AUTO' | 'MANUAL'

export interface TileState {
  index: number;
  isOpen: boolean;
  tileStatus: TileStatus;
  isExploded?: boolean;
}



export const InitialField : TileState[] = Array.from({length: 25}, (_, i) => ({
  index: i,
isOpen: false,
tileStatus: 'CLOSE'
}))






export interface GameState {
    gameId: string | null;
    field: TileState[]; 
    gameStatus: GameStatus;
    currentScore: number;
    minesCount: number;   
    betAmount: number;    
    balance: number;
    payoutTable: { step: number; multiplier: number }[],
    isModalOpen: boolean,
    currency: string,
    mode: GameMode,
    gameCount: number
}


export const initialGameState: GameState = {
    gameId: null,
    field: InitialField,
    gameStatus: 'FINISHED_LOSE', 
    currentScore: 0,
    minesCount: 3,
    betAmount: 10,
    balance: 1000,
    payoutTable: [],
    isModalOpen: false,
    currency: '$',
    mode: 'MANUAL',
    gameCount: 0
};

export type GameAction =
    | { type: 'START_GAME'; payload: { gameId: string, payoutTable: { step: number; multiplier: number }[]} }
    | { type: 'REVEAL_TILE'; payload: { index: number, result: 'MINE' | 'NO_MINE', multiplier: number, status?: string, allMines?: number[]} }
    | { type: 'SET_MINES_COUNT'; payload: number }
    | { type: 'SET_BET_AMOUNT'; payload: number }
    | { type: 'SET_BALANCE'; payload: number } 
    | { type: 'UPDATE_SCORE'; payload: { reward: number } }
    | { type: 'CASHOUT'; payload: { winAmount: number; allMines: number[] } }
    | { type: 'CLOSE_MODAL'}
    | { type: 'APPLY_LAST_SETTINGS', payload: {betAmount: number, minesCount: number}}
    | {type: 'GAME_RECOVERY', payload: {currentScore: number; gameId: string, betAmount: number, minesCount: number, opened: number[], paytable: {step: number;multiplier: number;}[]} }
    | {type : 'CHANGE_MODE', payload: 'AUTO' | 'MANUAL'}
    | {type: 'SET_GAME_COUNT', payload: number}
  