import classes from './BetPanel.module.css'
import { useGameStatus } from '../../hoks/api/useGameApi';
import { MyInput } from '../UI/Input/MyInput';
import { MySelect } from '../UI/select/MySelect';
import {  useGame, useGameDispatch } from '../../Context/GameHoks';
import { useState } from 'react';

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

  
  
  return (
  <div  className={classes.container}>
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
   
   <button onClick={handleStartGame} disabled={isPending}>Начать игру</button>
   </div>
  )
}
