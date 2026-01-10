import classes from './MyButton.module.css'

interface MyButtonProps {
  handleStartGame: () => void;
  isPending: boolean;
  children: React.ReactNode;
  isFirstStep: boolean;
  isFire?: boolean; 
  isEpic?: boolean; 
}

export const MyButton = ({ handleStartGame, isPending, children, isFirstStep, isFire, isEpic }: MyButtonProps) => {
  return (
    <button
      className={`
        ${classes.StartGame}
        ${isFirstStep ? classes.disabled : ''}
        ${isFire ? classes.btn_fire : ''}
        ${isEpic ? classes.btn_epic : ''}
      `}
      onClick={handleStartGame}
      disabled={isPending || isFirstStep}
    >
      {children}
    </button>
  );
};
