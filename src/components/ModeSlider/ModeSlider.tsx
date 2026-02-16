import { type FC } from 'react';
import classes from './ModeSlider.module.css';
import { useGameDispatch } from '../../Context/GameHoks';

interface ModeSliderProps {
  mode: 'AUTO' | 'MANUAL',
  disabled: boolean
}

export const ModeSlider: FC<ModeSliderProps> = ({ mode, disabled }) => {
  const dispatch = useGameDispatch(); 

  const handleModeChange = (newMode: 'AUTO' | 'MANUAL') => {
    if (disabled || mode === newMode) return;
    dispatch({ type: 'CHANGE_MODE', payload: newMode });
  };

  return (
    <div className={`${classes.wrapper} ${disabled ? classes.wrapperDisabled : ''}`}>
      <div className={classes.container}>
        <div className={`${classes.glider} ${mode === 'AUTO' ? classes.gliderAuto : ''}`} />
        
        <button 
          type="button"
          disabled={disabled}
          className={`${classes.modeBtn} ${mode === 'MANUAL' ? classes.active : ''}`}
          onClick={() => handleModeChange('MANUAL')}
        >
          Manual
        </button>
        
        <button 
          type="button"
          disabled={disabled}
          className={`${classes.modeBtn} ${mode === 'AUTO' ? classes.active : ''}`}
          onClick={() => handleModeChange('AUTO')}
        >
          Auto
        </button>
      </div>
    </div>
  );
};