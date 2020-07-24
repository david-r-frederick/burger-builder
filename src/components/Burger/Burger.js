import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const burger = props => {
    // Big array with sub arrays- 1 array for each type of food, 1 object in each subarray per count of type
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientName => {
            return [...Array(props.ingredients[ingredientName])]
        .map((_, index) => {
            return <BurgerIngredient size={props.size} key={ingredientName + index} type={ingredientName}/>
        });
    });

    if(Object.values(props.ingredients).every(el => el === 0)){
        transformedIngredients = <p>Please add ingredients.</p>
    }

    return (
        <div className={classes.Burger}
            style={props.style}
        >
            <BurgerIngredient 
                size={props.size}
                type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient 
                size={props.size}
                type="bread-bottom" />
        </div>
    )
}

export default withRouter(burger);