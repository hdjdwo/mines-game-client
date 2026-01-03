import { Field } from "../Field/Field"
import classes from './FieldWrapper.module.css'

export const FieldWrapper = () => {
 
  return (
    <div  className={classes.container}>
      <Field/>
    </div>
  )
}
