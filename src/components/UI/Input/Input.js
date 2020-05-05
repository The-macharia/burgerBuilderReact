import React from "react";
import classes from "./Input.module.css";

const Input = props => {
  let inputEl = null;
  let inputClasses = [classes.InputElement]
  if (props.touched && props.invalid && props.shouldValidate){
    inputClasses.push(classes.Invalid)
  }
  if(props.touched && props.valid){
    inputClasses.push(classes.Valid)
  }

  switch (props.type) {
    case "input":
      inputEl = <input onChange={props.changed} className={inputClasses.join(' ')}{...props.elementType} value={props.value}/>;
      break;
    case "textarea":
      inputEl = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementType} value={props.value} />;
      break;
    case "select":
        inputEl = <select onChange={props.changed} className={[classes.InputElement, classes.Valid].join(' ')} value={props.value}>
            {props.elementType.options.map(option => (
                <option key={option.value} value={option.value} >{option.displayValue}</option>
            ))}
        </select>
        break;
    default:
      inputEl = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementType} value={props.value} />;
  }
  return <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEl}
  </div>;
};

export default Input;
