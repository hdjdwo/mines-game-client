
const BASE_URL = 'http://localhost:4000/api';

interface StartGameResponse {
  gameId: string;
  error?: string
}

interface RevealCellRepsonce {
  result: string;
  message?: string;
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

export const fetchRevealCell = async ({ tileIndex, gameId }: { tileIndex: number, gameId: string }): Promise<RevealCellRepsonce> => {
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