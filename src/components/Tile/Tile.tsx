import classes from './Tile.module.css'
import backStageTile from '../../assets/image/backStage.png'
import mineTile from '../../assets/image/mine.png'
import noMineTile from '../../assets/image/noMine.png'
import type { FC} from 'react'
import type { TileState } from '../../Context/GameActions'

interface TileProps extends TileState {
  onTileClick: () => void
}


export const Tile: FC<TileProps> = ({ isOpen, tileStatus, onTileClick}) => {
 
  return (
    <div
     className={classes.tile}
     onClick={onTileClick}
     >
      
      <img
      className={classes.tileBackStage}
      src={isOpen ? (tileStatus === 'MINE' ? mineTile : noMineTile) : backStageTile }
      alt="" />
    </div>
  )
}
