import React, { type FC } from 'react';
import classes from './MyInput.module.css';
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
  
  showCurrency?: boolean;
  showControls?: boolean;
}

export const MyInput: FC<MyInputProps> = ({
  name,
  labelText,
  betSetting = { min: 1, max: 1000, step: 1 },
  disabled,
  value,
  onChange,
  onValueChange,
  showCurrency = true, 
  showControls = true, 
}) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.length > 1 && val.startsWith('0')) {
      val = val.replace(/^0+/, '');
    }
    onChange({ ...e, target: { ...e.target, value: val } });
  };

  const adjustValue = (mod: number) => {
    if (disabled || !onValueChange) return;
    const newValue = Math.max(betSetting.min, Math.min(betSetting.max, value + mod));
    onValueChange(newValue);
  };

  const handleHalf = () => {
    if (disabled || !onValueChange) return;
    onValueChange(Math.max(betSetting.min, Math.floor(value / 2)));
  };

  const handleDouble = () => {
    if (disabled || !onValueChange) return;
    onValueChange(Math.min(betSetting.max, value * 2));
  };

  return (
    <div className={classes.MyInputContainer}>
      <label className={classes.Label} htmlFor={name}>{labelText}</label>
      
      <div className={classes.inputWrapper}>
        <div className={classes.inputFieldContainer}>
          {showCurrency && <img className={classes.SVG} src={dollarIcon} alt="currency" />}
          
          <input 
            className={classes.Input} 
            type="number" 
            name={name} 
            disabled={disabled} 
            value={value} 
            onChange={handleInputChange}
          />

          <div className={`${classes.customSpinners} ${disabled ? classes.disabledSpinners : ''}`}>
            <div className={classes.spinnerUp} onClick={() => adjustValue(betSetting.step)} />
            <div className={classes.spinnerDown} onClick={() => adjustValue(-betSetting.step)} />
          </div>
        </div>

        {showControls && (
          <div className={classes.controls}>
            <div onClick={handleHalf} className={`${classes.betScale} ${disabled ? classes.disabledBtn : ''}`}>
              1/2
            </div>
            <div onClick={handleDouble} className={`${classes.betScale} ${disabled ? classes.disabledBtn : ''}`}>
              2x
            </div>
          </div>
        )}
      </div>
    </div>
  );
};