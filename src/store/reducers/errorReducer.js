import * as actionTypes from '../actions/actionTypes';

const errorReducer = (state = false, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return true;
        default:
            return false;
    }
};

export default errorReducer;