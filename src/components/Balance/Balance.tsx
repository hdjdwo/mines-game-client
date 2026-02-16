import  { useState, useEffect, type FC } from 'react';
import classes from './Balance.module.css';

interface BalanceDisplayProps {
  balance: number;
  currency?: string;
}

export const Balance: FC<BalanceDisplayProps> = ({ balance, currency = 'USD' }) => {
  const [displayValue, setDisplayValue] = useState(balance);

 
  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    const duration = 1000; 

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const current = startValue + (balance - startValue) * progress;
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    
    if (balance > startValue) {
      window.requestAnimationFrame(step);
    } else {
      setDisplayValue(balance);
    }
  }, [balance]);

 
  const formatted = displayValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [intPart, fractionPart] = formatted.split('.');

  return (
    <div className={classes.balanceContainer}>
      <div className={classes.valueWrapper}>
        <span className={classes.integer}>{intPart}</span>
        <span className={classes.fraction}>.{fractionPart}</span>
        <span className={classes.currency}>{currency}</span>
      </div>
      <div className={classes.glowLine} />
    </div>
  );
};