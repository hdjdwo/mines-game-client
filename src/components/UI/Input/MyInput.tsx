import React, { type FC } from 'react'
import classes from './MyInput.module.css'
import dollarIcon from '../../../assets/image/dollar.svg';

interface betSettingProps {
  min: number;
  max: number;
  step: number;
}

interface MyInputProps {
  type: string;
  name: string;
  labelText: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (newValue: number) => void; 
  disabled: boolean;
  betSetting?: betSettingProps;
}


export const MyInput: FC<MyInputProps> = ({type, name, labelText, betSetting = {min: 1, max: 1000, step: 1}, disabled, value, onChange, onValueChange}) => {
  
  const handleHalf = () => {
    if(disabled || !onValueChange) return
    const newValue = Math.max(betSetting.min, Math.floor(value / 2));
    onValueChange(newValue);
  }

  const handleDouble = () => {
    if (disabled || !onValueChange) return;
    const newValue = Math.min(betSetting.max, value * 2);
    onValueChange(newValue);
  };


 return (
    <div className={classes.MyInputContainer}>
      <img className={classes.SVG} src={dollarIcon} alt="" />
      <label className={classes.Label} htmlFor={name}>{labelText}</label>
      
      <div className={classes.inputSetting}>      
        <input 
          className={classes.Input} 
          type={type} 
          name={name} 
          disabled={disabled} 
          value={value} 
          onChange={onChange}
        />
        <div onClick={handleHalf} className={`${classes.betScale} ${disabled ? classes.disabledBtn : ''}`}>
          1/2
        </div>
        <div onClick={handleDouble} className={`${classes.betScale} ${disabled ? classes.disabledBtn : ''}`}>
          2x
        </div>
      </div>
    </div>
  );
};
