import  { useState } from 'react';
import classes from './Cheat.module.css';

interface CheatPanelProps {
  mines: number[];
  isLoading: boolean;
  status: boolean
}

export const Cheat = ({ mines, isLoading, status }: CheatPanelProps) => {
  const [isVisible, setIsVisible] = useState(false);
console.log(status)
  if (mines.length === 0 || status) return null;

  return (
    <div 
      className={`${classes.cheatWrapper} ${isVisible ? classes.active : ''}`}
      onClick={() => setIsVisible(!isVisible)}
    >
      <div className={classes.label}>
        {isLoading ? 'Загрузка данных...' : isVisible ? 'MINES POSITIONS:' : 'DEBUG MODE'}
      </div>
      {isVisible && (
        <div className={classes.minesList}>
          {mines.sort((a, b) => a - b).join(', ')}
        </div>
      )}
    </div>
  );
};