import classes from './BetPanel.module.css'
import { useGameStatus, usePaytable, useTESTWinCombo, useUnfinishedGame, useWinGame} from '../../hoks/api/useGameApi';
import { MyInput } from '../UI/Input/MyInput';
import { MySelect } from '../UI/select/MySelect';
import {  useGame, useGameDispatch } from '../../Context/GameHoks';
import panelBackground from '../../assets/image/betPanel.png'
import { MultiplierField } from '../MultiplierField/MultiplierField';
import { MyButton } from '../UI/Button/MyButton';
import { Cheat } from '../CHEAT/Cheat';
import { useEffect } from 'react';



export const BetPanel = () => {

  const {mutate: startGameMutate, isPending: isStartPending} = useGameStatus() 
  const {mutate: winGameMutate, isPending: isWinPending} = useWinGame() 
  const {mutate: mutateUnfinishedGame} = useUnfinishedGame()
  const disptatch = useGameDispatch()
  const {gameStatus, minesCount, betAmount, payoutTable, field,  gameId} = useGame()
  const {data: paytableData, isLoading: isPaytableLoading} = usePaytable(minesCount,gameStatus)

  const {data: CHEATdata, isLoading: isCHEATLoading} = useTESTWinCombo(gameId ? gameId : '')

  const resultCHEAT = CHEATdata?.result ? CHEATdata?.result : []

  useEffect(() => {
    mutateUnfinishedGame('Test', {
      onSuccess: (data) => {
        if(data.hasActiveGame) {
          
          disptatch({type: 'GAME_RECOVERY',
            payload: {
              gameId: data.gameId,
              betAmount: data.betAmount,
              minesCount: data.minesCount,
              opened: data.opened,
              paytable: data.paytable,
              currentScore: data.currentScore,
            }
          })
        } else if(data.isSettings) {
          console.log('aaaaa')
          disptatch({type: 'APPLY_LAST_SETTINGS',
            payload: {
              betAmount: data.betAmount,
              minesCount: data.minesCount
            }
          })
        }
      }
    })
  }, [mutateUnfinishedGame, disptatch])
 
 const isGameActive = gameStatus === 'STARTED' || gameStatus === 'CONTINUES';
  const handleMainAction = () => {
  if (isGameActive) {
    if (hasWonSomething) {
      winGameMutate(gameId ? gameId : '', {
        onSuccess: (data) => {
          disptatch({ 
            type: 'CASHOUT', 
            payload: { winAmount: data.winAmount, allMines: data.allMines } 
          });
        }
      });
    }
  } else {
    startGameMutate({minesCount, userBet: betAmount}, {
      onSuccess: (serverData) => {
        disptatch({ 
          type: 'START_GAME', 
          payload: { gameId: serverData.gameId, payoutTable: serverData.paytable } 
        });
      }
    });
  }
};


  

  const paytable = paytableData ? paytableData.table : []
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


const displayScore = (betAmount * currentMultiplier).toFixed(2);

  
  return (
  <div style={sectionStyle}  className={classes.container}>
  
    <div className={classes.BetSettings}>

      
      
      <MyInput
      onChange = {(e: React.ChangeEvent<HTMLInputElement>) => disptatch({type: 'SET_BET_AMOUNT', payload: Number(e.target.value)})}
      onValueChange={(newValue) => disptatch({ type: 'SET_BET_AMOUNT', payload: newValue })}
      value = {betAmount}
      disabled={isGameActive || isWinPending || isStartPending}
      type='number'
       name='currency'
        labelText='Сумма ставки'/>
        
      <MySelect
      value = {minesCount}
      onChange = {(e: React.ChangeEvent<HTMLSelectElement>) => disptatch({type: 'SET_MINES_COUNT', payload: Number(e.target.value)})}
      disabled={isGameActive || isWinPending || isStartPending}
      />
    </div>
    <MultiplierField 
    isCurrentEpic={isCurrentEpic} 
    isCurrentFire={isCurrentFire} 
    isLoading={isPaytableLoading} visibleSteps={visibleSteps} 
    hasWonSomething={hasWonSomething} 
    currentStep={currentStep}
    />   
    <MyButton 
        handleStartGame={handleMainAction} 
        isPending={isWinPending || isStartPending} 
        isFirstStep={gameStatus === 'STARTED' && currentStep === 0}
        isFire={isCurrentFire}
        isEpic={isCurrentEpic}
      >
        {isGameActive 
          ? hasWonSomething ? `ЗАБРАТЬ ${displayScore}` : 'ЗАБРАТЬ'
          : 'НАЧАТЬ ИГРУ'
        }
      </MyButton>

      <Cheat mines={resultCHEAT} isLoading={isCHEATLoading} status={gameStatus.includes('FINISHED')}/>
   </div>
  )
}
