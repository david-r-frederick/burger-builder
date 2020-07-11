import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>
            Current Price: <strong>{`$${props.currentPrice}`}</strong>
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
            ORDER NOW
        </button>
    </div>
);

export default buildControls;
