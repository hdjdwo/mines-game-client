
import classes from './MySelect.module.css'



export const MySelect = ( {value, onChange, disabled} :
   {value: number, 
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, 
    disabled: boolean} ) => {
  return (
    <div className={classes.SelectContaiter}>
      <label className={classes.Label} htmlFor="minesCount">Мины</label>
    <select value={value} onChange={onChange} disabled={disabled} className={classes.Select}>
      {[...Array(22)].map((_, i) => (
        <option key={i + 1} value={i + 3}>{i + 3}</option>
      ))}
    </select>
    </div>
  )
}



