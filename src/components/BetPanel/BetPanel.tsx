import classes from './BetPanel.module.css'
import { useGameStatus } from '../../hoks/api/useGameApi';
import { MyInput } from '../UI/Input/MyInput';
import { MySelect } from '../UI/select/MySelect';
import {  useGame, useGameDispatch } from '../../Context/GameHoks';
import panelBackground from '../../assets/image/betPanel.png'



export const BetPanel = () => {


  const {mutate, isPending} = useGameStatus()
  const disptatch = useGameDispatch()
  const {gameStatus, minesCount, betAmount} = useGame()
 
 const isGameActive = gameStatus === 'STARTED' || gameStatus === 'CONTINUES';

  const handleStartGame = () => {
  mutate(minesCount, {
  onSuccess: (serverData) => {
    disptatch({type: 'START_GAME', payload: {gameId: serverData.gameId}})
  }
 })
  }

 const sectionStyle: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, rgba(0, 0, 0, 0) 80%, rgba(18, 18, 26, 1) 100%), 
    url(${panelBackground})
  `,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative" as const, // Используем as const или указываем тип переменной выше
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
   
   <button className={classes.StartGame} onClick={handleStartGame} disabled={isPending}>НАЧАТЬ ИГРУ</button>
   </div>
  )
}
