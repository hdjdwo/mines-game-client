

type TileStatus = 'CLOSE' | 'MINE' | 'EMPTY' 
type GameStatus = 'STARTED' | 'FINISHED_LOSE' | 'CONTINUES' | 'FINISHED_WIN'

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
    payoutTable: { step: number; multiplier: number }[]
}


export const initialGameState: GameState = {
    gameId: null,
    field: InitialField,
    gameStatus: 'FINISHED_LOSE', 
    currentScore: 0,
    minesCount: 3,
    betAmount: 10,
    balance: 1000,
    payoutTable: []
};

export type GameAction =
    | { type: 'START_GAME'; payload: { gameId: string, payoutTable: { step: number; multiplier: number }[]} }
    | { type: 'REVEAL_TILE'; payload: { index: number, result: 'MINE' | 'NO_MINE', multiplier: number, status?: string, allMines?: number[]} }
    | { type: 'SET_MINES_COUNT'; payload: number }
    | { type: 'SET_BET_AMOUNT'; payload: number }
    | { type: 'SET_BALANCE'; payload: number } 
    | { type: 'UPDATE_SCORE'; payload: { reward: number } }
    | { type: 'CASHOUT'; payload: { winAmount: number; allMines: number[] } }
  