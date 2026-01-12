import { useEffect, useMemo, useRef, useState, type FC } from 'react';
import classes from './WinModal.module.css'
import coinSVG from '../../assets/image/coin.svg'
import useSound from 'use-sound';
import winSfc from '../../assets/sounds/win.mp3'
import backgroundMusic from '../../assets/sounds/background.mp3'

interface IWinPanel {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  win: number;
  visible: boolean;
  currency: string;
  multiplier: number;
}

export const WinModal: FC<IWinPanel> = ({onClick, win, visible, currency, multiplier}) => {
  const [playWin, {stop: stopWin}] = useSound(winSfc, {volume: 0.8})
  const [playBackground, { stop: stopBackground }] = useSound(backgroundMusic, { 
  volume: 0.4, 
  loop: true   
});
  const [numberAnimation, setNumberAnimation] = useState(false);
  const [currenWinNumber, setCurrentWinNumber] = useState(0)
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null)
  const openTimeRef = useRef<number>(0)
  
  useEffect(() => {
  playBackground();
  
  return () => stopBackground();
}, [playBackground, stopBackground]);
  
  const coins = useMemo(() => {
  if (!visible) return [];

  return Array.from({ length: (multiplier < 10) ? 10 : (multiplier < 50) ? 30 : 100}, (_, index) => {
    return {
      id: index,
      left: Math.floor(Math.random() * 100),
      delay: Math.floor(Math.random() * 7000), 
      duration: 1.5 + Math.random() * 3,        
      size: 0.5 + Math.random() * 1,          
      opacity: 0.4 + Math.random() * 0.6      
    };
  });
}, [visible]);

  useEffect(() => {
   if(visible) {
    playWin()
    openTimeRef.current = Date.now()
    const count = win/100.
    timerId.current = setInterval(() => {
      setCurrentWinNumber(prev => {
        if(prev >= win && timerId.current) {
          clearInterval(timerId.current);
          setNumberAnimation(false)
          return win
        }
        setNumberAnimation(true)
        return prev + +count
      })
    }, 50);
    return () => {
    stopWin(); 
    if (timerId.current) clearInterval(timerId.current);
  };
   } else {
    setCurrentWinNumber(0)
    setNumberAnimation(false)
   }
    
  }, [visible])


 
  const handleFirstClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
      
    if(numberAnimation && timerId.current) {
      if(Date.now() - openTimeRef.current <1000){
             return
      }
         setCurrentWinNumber(() => win)
         clearInterval(timerId.current)
         setNumberAnimation(false)
    } else {
    stopWin();
    onClick(e)
    }
  }


  return (
    <div onClick={handleFirstClick} 
    className={`
      ${visible ? classes.wrapper : classes.wrapper_of}
      
      `}
    >
      {coins.map(coin => (
  <div 
    key={coin.id}
    className={classes.coinContainer} 
    style={{
      left: `${coin.left}%`,
      transform: `scale(${coin.size})`,
      zIndex: (coin.size < 0.8) ? 1 : 3
    }}
  >
    <img 
      src={coinSVG} 
      className={classes.coin} 
      style={{
        animationDelay: `${coin.delay}ms`,
        animationDuration: `${coin.duration}s`,
        opacity: coin.opacity,
      }} 
      alt="" 
    />
  </div>
))}
      <div className={classes.winPanel}>
        <div className={classes.textBlock}>
        <p className={classes.winText}>ПОЗДРАВЛЯЕМ!</p>
        <p className={classes.winScore}>{currenWinNumber.toFixed(2)}{currency}</p>
        </div>
      </div>
    </div>
  )
}
