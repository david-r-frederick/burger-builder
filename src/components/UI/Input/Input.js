import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement;
    let validationErrorMessage = null;
    const inputClasses = [classes.InputElement];
    if(!props.valid && props.touched){
        inputClasses.push(classes.Invalid);
        validationErrorMessage = <p>Please enter a valid value.</p>;
    }
    switch (props.elementType) {
        case 'textarea':
            inputElement = (
                <textarea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case 'select':
            inputElement = (
                <select
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationErrorMessage}
        </div>
    );
};

export default input;
