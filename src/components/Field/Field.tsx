import useSound from "use-sound"
import { useGame, useGameDispatch } from "../../Context/GameHoks"
import { useTileStatus} from "../../hoks/api/useGameApi"
import { Tile } from "../Tile/Tile"
import classes from './Field.module.css'
import clickSfx from '../../assets/sounds/click.mp3'
import clickMineSfx from '../../assets/sounds/clickOnMine.mp3'

export const Field = () => {

  const [playClick] = useSound(clickSfx, {volume: 0.8})
  const [playClickMine] = useSound(clickMineSfx, {volume: 0.8})
 

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
          if (data.result === 'mine') {
    playClickMine();
  } else {
    playClick();
  }
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
