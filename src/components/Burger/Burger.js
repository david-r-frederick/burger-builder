import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const burger = props => {
    let transformedIngredients = // Big array with sub arrays- 1 array for each type of food, 1 object in each subarray per count of type
    Object.keys(props.ingredients) //['salad', 'bacon', 'cheese', 'meat']
    .map(ingredientName => {
        return [...Array(props.ingredients[ingredientName])] //[1, 1, 2, 2]
        .map((_, index) => {
            return <BurgerIngredient key={ingredientName + index} type={ingredientName}/>
        });
    });

    if(Object.values(props.ingredients).every(el => el === 0)){
        transformedIngredients = <p>Please add ingredients.</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default withRouter(burger);