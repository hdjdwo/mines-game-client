import classes from './Tile.module.css'
import backStageTile from '../../assets/image/backStage.png'
import mineTile from '../../assets/image/mine.png'
import noMineTile from '../../assets/image/noMine.png'
import type { FC} from 'react'
import type { TileState } from '../../Context/GameActions'
import { useGame } from '../../Context/GameHoks'

interface TileProps extends TileState {
  onTileClick: () => void;
  
}


export const Tile: FC<TileProps> = ({ isOpen, tileStatus, onTileClick, isExploded}) => {
 const { payoutTable, field, gameStatus } = useGame();

  const currentStep = field.filter(tile => tile.isOpen && tile.tileStatus === 'EMPTY').length;
  const currentMultiplier = payoutTable.find(i => i.step === currentStep)?.multiplier || 0;

  const isGameActive = gameStatus === 'STARTED' || gameStatus === 'CONTINUES';
  const shouldGlow = isGameActive && !isOpen;
  
  const isFire = shouldGlow && currentMultiplier >= 10 && currentMultiplier < 50;
  const isEpic = shouldGlow && currentMultiplier >= 50;

return (
    <div
      className={`
        ${classes.tile}
        ${isExploded ? classes.tile_exploded : ''}
        ${isFire ? classes.tile_fire : ''}
        ${isEpic ? classes.tile_epic : ''}
 
      `}
      onClick={onTileClick}
    >
      <img
        className={classes.tileBackStage}
        src={isOpen ? (tileStatus === 'MINE' ? mineTile : noMineTile) : backStageTile}
        alt=""
      />
    </div>
  );
};
