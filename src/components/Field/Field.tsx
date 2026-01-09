import { useGame, useGameDispatch } from "../../Context/GameHoks"
import { useTileStatus } from "../../hoks/api/useGameApi"
import { Tile } from "../Tile/Tile"
import classes from './Field.module.css'

export const Field = () => {

  const dispatch = useGameDispatch()
   const {field, gameId, gameStatus} = useGame()
   const {mutate, isPending} = useTileStatus()

  
   const handleTileClick = (index: number) => {
    if(!gameId || field[index].isOpen || gameStatus.includes('FINISHED') || isPending) {
      return
    }


    mutate(
      {tileIndex: index, gameId},
      {
        onSuccess: (data) => { 
          dispatch({type: 'REVEAL_TILE', payload: {
            index: index,
            result: data.result === 'mine' ? 'MINE' : 'NO_MINE',
            multiplier: data.currentMultiplier,
            status: data.status,
            allMines: data.allMines
          }})           
          
        }
      }
    )
   }

   
  
  return (
    <div className={classes.field}>
      {field.map((tile) => (
     <Tile key={tile.index} {...tile} onTileClick={() => handleTileClick(tile.index)}/>
      ))}
    </div>
  )
}
