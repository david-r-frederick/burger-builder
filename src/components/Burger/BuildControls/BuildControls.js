import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>
            Current Price: <strong>{`$${props.currentPrice.toFixed(2)}`}</strong>
        </p>
        {controls.map((control, index) => {
            return (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    increase={() => props.increase(control.type)}
                    decrease={() => props.decrease(control.type)}
                    disabled={props.disabled[control.type]}
                />
            );
        })}
        <button
            className={classes.OrderButton}
            disabled={props.checkoutDisabled}
            onClick={props.ordered}
        >
            {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
        </button>
    </div>
);

export default buildControls;
