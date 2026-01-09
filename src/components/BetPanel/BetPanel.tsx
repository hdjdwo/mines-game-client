import classes from './BetPanel.module.css'
import { useGameStatus, usePaytable} from '../../hoks/api/useGameApi';
import { MyInput } from '../UI/Input/MyInput';
import { MySelect } from '../UI/select/MySelect';
import {  useGame, useGameDispatch } from '../../Context/GameHoks';
import panelBackground from '../../assets/image/betPanel.png'



export const BetPanel = () => {


  const {mutate, isPending} = useGameStatus()

  
 
  const disptatch = useGameDispatch()
  const {gameStatus, minesCount, betAmount, payoutTable, field} = useGame()

  const {data, isLoading} = usePaytable(minesCount,gameStatus)

 
 const isGameActive = gameStatus === 'STARTED' || gameStatus === 'CONTINUES';
  const handleStartGame = () => {
  mutate(minesCount, {
  onSuccess: (serverData) => {
    disptatch({type: 'START_GAME', payload: {gameId: serverData.gameId, payoutTable: serverData.paytable}})
  }
 })
  }

  const paytable = data ? data.table : []
   const activeTable = (gameStatus === 'STARTED' || gameStatus === 'CONTINUES') 
    ? payoutTable 
    : paytable;

  const currentStep = field.filter(tile => tile.isOpen && tile.tileStatus === 'EMPTY').length;

  const getVisibleSteps = () => {

  if (activeTable.length === 0) return [];
 
  if (activeTable.length <= 3) return activeTable;

   
  let start = currentStep - 1;
  let end = currentStep + 2;

  if (start < 0) {
    start = 0;
    end = 3;
  }

  if (end > activeTable.length) {
    end = activeTable.length;
    start = activeTable.length - 3;
  }

  return activeTable.slice(start, end);
};
const hasWonSomething = isGameActive && currentStep > 0;
const visibleSteps = getVisibleSteps();
const currentMultiplier = activeTable.find(i => i.step === currentStep)?.multiplier || 0;

const isCurrentFire = hasWonSomething && currentMultiplier >= 10 && currentMultiplier < 50;
const isCurrentEpic = hasWonSomething && currentMultiplier >= 50;

 

 const sectionStyle: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, rgba(0, 0, 0, 0) 80%, rgba(18, 18, 26, 1) 100%), 
    url(${panelBackground})
  `,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative" as const, 
  boxShadow: "inset -20px 0px 100px -10px rgba(0,0,0,0.9)",
  zIndex: 2
};


  
  return (
  <div style={sectionStyle}  className={classes.container}>
  
    <div className={classes.BetSettings}>
      
      <MyInput
      onChange = {(e: React.ChangeEvent<HTMLInputElement>) => disptatch({type: 'SET_BET_AMOUNT', payload: Number(e.target.value)})}
      onValueChange={(newValue) => disptatch({ type: 'SET_BET_AMOUNT', payload: newValue })}
      value = {betAmount}
      disabled={isGameActive || isPending}
      type='number'
       name='currency'
        labelText='Сумма ставки'/>
        
      <MySelect
      value = {minesCount}
      onChange = {(e: React.ChangeEvent<HTMLSelectElement>) => disptatch({type: 'SET_MINES_COUNT', payload: Number(e.target.value)})}
      disabled={isGameActive || isPending}
      />
    </div>

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
   
   <button className={classes.StartGame} onClick={handleStartGame} disabled={isPending}>НАЧАТЬ ИГРУ</button>
   </div>
  )
}
