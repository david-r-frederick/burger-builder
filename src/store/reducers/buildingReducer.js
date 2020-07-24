import * as actionTypes from '../actions/actionTypes';

const buildingReducer = (state = false, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return true;
        case actionTypes.REMOVE_INGREDIENT: return true;
        case actionTypes.SET_INGREDIENTS: return false
        default: return state;
    }
};

export default buildingReducer;