import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    lettuce: 0.1,
    cheese: 0.5,
    meat: 1.2,
    bacon: 0.7,
};

const priceReducer = (state = 4, action) => {
    switch(action.type){
        case actionTypes.INCREASE_PRICE:
            return state + INGREDIENT_PRICES[action.value];
        case actionTypes.DECREASE_PRICE:
            return state - INGREDIENT_PRICES[action.value];
        case actionTypes.SET_INGREDIENTS:
            return 4;
        default:
            return state;
    }
}

export default priceReducer;