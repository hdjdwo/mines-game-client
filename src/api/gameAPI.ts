
const BASE_URL = 'http://localhost:4000/api';

interface IPaytable {
  step: number;
  multiplier: number 
}

interface getPaytable {
  table: IPaytable[];
  error?: string;

}

interface StartGameResponse {
  gameId: string;
  error?: string;
  paytable: IPaytable[]
}


interface RevealCellRepsonce {
  result: string;
  currentMultiplier: number;
  safePick: number;
  message?: string;
  error?: string;
  allMines?: number[];
  status?: string;
}

interface WinGame {
  status: string;
  allMines: number[];
  winAmount: number;
  error?: string;
}

interface TEST_getWinCombo {
  result: number[];
  error?: string;
}


 export const fetchStartGame = async (minesCount: number): Promise<StartGameResponse> => {
  const res = await fetch(`${BASE_URL}/start-game`, {
    method: 'POST',
    body: JSON.stringify({minesCount}),
    headers: {'Content-type' : 'application/json; charset=UTF-8'}
  });
  if(!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.error || 'Failed to start game on server.')
  }
  return res.json()
}

export const fetchRevealCell = async ({ tileIndex, gameId }: { tileIndex: number, gameId: string}): Promise<RevealCellRepsonce> => {
  const res = await fetch(`${BASE_URL}/reveal-cell`, {
    method: 'POST',
    body: JSON.stringify({ tileIndex, gameId }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to reveal cell.');
  }
  return res.json();
}

export const fetchPaytable = async (minesCount: number): Promise<getPaytable> => {
  const res = await fetch(`${BASE_URL}/get-paytable`, {
    method: 'POST',
    body: JSON.stringify({minesCount}),
    headers: {'Content-type' : 'application/json; charset=UTF-8'}
  });
  if(!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to get paytable.');
  }
  return res.json()
}

export const fetchWinGame = async (gameId: string) : Promise<WinGame> => {
  const res = await fetch(`${BASE_URL}/win-game`, {
    method: 'POST',
    body: JSON.stringify({gameId}),
    headers: {'Content-type' : 'application/json; charset=UTF-8'}
  });
  if(!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.error || 'Failed win game')
  }

  return res.json()
}

export const TEST_winCombo = async (gameId: string) : Promise<TEST_getWinCombo> => {
  const res = await fetch(`${BASE_URL}/test-route`, {
    method: 'POST',
    body: JSON.stringify({gameId}),
    headers: {'Content-type' : 'application/json; charset=UTF-8'}
  });
  if(!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to get wincombo.');
  }
  return res.json()
}