import { Field } from "../Field/Field"
import classes from './FieldWrapper.module.css'
import background from '../../assets/image/background1.png'
import { WinModal } from "../WinModal/WinModal";
import { useGame, useGameDispatch } from "../../Context/GameHoks";

export const FieldWrapper = () => {

  const {isModalOpen,currentScore, currency, betAmount} = useGame()
 const dispatch = useGameDispatch()
   
  const sectionStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  marginLeft: "-2px", 
  borderLeft: "1px solid rgba(255,255,255,0.05)", 
  backgroundImage: `
    linear-gradient(to right, #12121a 0%, rgba(18, 18, 26, 0) 15%), 
    url(${background})
  `,
  backgroundSize: "cover",
  backgroundPosition: "center",
  boxShadow: "inset 20px 0px 100px -10px rgba(0,0,0,0.9)",
};

const handleWinModal = (e: React.MouseEvent<HTMLDivElement>) => {
  e.preventDefault()
  dispatch({type: 'CLOSE_MODAL'})
}



  return (
    <div style={sectionStyle} className={classes.container} >
      <WinModal 
        onClick={handleWinModal} 
        win={currentScore} 
        visible={isModalOpen} 
        currency={currency}
        multiplier={currentScore/betAmount}
      />
      <Field/>
    </div>
  )
}
