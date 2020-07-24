import * as actionTypes from '../actions/actionTypes';

const ingredientsReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                [action.ingredientName]: state[action.ingredientName] + 1,
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                [action.ingredientName]: state[action.ingredientName] - 1,
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                lettuce: action.ingredients.lettuce,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat,
            };
        default:
            return {
                ...state,
            };
    }
};

export default ingredientsReducer;