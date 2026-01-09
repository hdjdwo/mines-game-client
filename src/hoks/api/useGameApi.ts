import {  useMutation, useQuery} from "@tanstack/react-query"
import { fetchPaytable, fetchRevealCell, fetchStartGame } from "../../api/gameAPI"


export const useGameStatus = () => {
return useMutation({
  mutationFn: fetchStartGame,
  onSuccess: (data) => {
    console.log("Игра запущена, ID:", data.gameId)
  },
  onError: (error) => {
            console.error("Проблема с запуском игры:", error.message);
        }
})
}

export const useTileStatus = () => {
  return useMutation({
    mutationFn: fetchRevealCell,
    onSuccess: (data, variables) => {
      console.log(`Клетка ${variables.tileIndex}: результат ${data.result}`);
    },
    onError: (error) => {
            console.error("Проблема с определением мины:", error.message);
        }
  })
}

export const usePaytable = (minesCount: number, isGameStarted: string) => {
  return useQuery({
    queryKey: ['paytable', minesCount],
    queryFn: () => fetchPaytable(minesCount),
    enabled: isGameStarted.includes('FINISHED') && minesCount > 0,
    staleTime: Infinity
  })
}