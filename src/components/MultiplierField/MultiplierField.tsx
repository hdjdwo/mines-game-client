import type { FC } from "react";
import classes from './MultiplierField.module.css'


interface IMultiplier {
  isCurrentEpic: boolean;
  isCurrentFire: boolean;
  isLoading: boolean;
  visibleSteps: {step: number; multiplier: number;}[]
  hasWonSomething: boolean;
  currentStep: number
}

export const MultiplierField: FC<IMultiplier> = ({isCurrentEpic, isCurrentFire, isLoading, visibleSteps, hasWonSomething, currentStep}) => {
  return (
    <div className={`
  ${classes.paytable} 
  ${isCurrentEpic ? classes.global_epic : isCurrentFire ? classes.global_fire : ''}
`}>
  {isLoading ? (
    <p>Загрузка...</p>
  ) : (
    visibleSteps.map((item) => {
      const isCurrentActive = hasWonSomething && item.step === currentStep;
      
      const isFire = isCurrentActive && item.multiplier >= 10 && item.multiplier < 50;
      const isEpic = isCurrentActive && item.multiplier >= 50;

      return (
        <div 
          key={item.step} 
          className={`
            ${classes.paytable_element} 
            ${isCurrentActive ? classes.paytable_active : ''} 
            ${isFire ? classes.fire_tier : ''} 
            ${isEpic ? classes.epic_tier : ''}
          `}
        >
          <span className={classes.multiplier_text}>x{item.multiplier}</span>
        </div>
      );
    })
  )}
</div>   
  )
}
