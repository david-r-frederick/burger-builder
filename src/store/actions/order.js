//Holds action creators for submitting an order
import * as actionTypes from './actionTypes';
import axios from '../../hoc/axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        error: error,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios
            .post('/orders.json?auth=' + token, orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((error) => {
                dispatch(purchaseBurgerFailure(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
};

export const fetchOrdersFailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILURE,
        error: error,
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrders = (token ,userId) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        const queryParams = `?auth=${token}&orderBy="userId"&equalto="${userId}"`;
        axios
            .get('/orders.json' + queryParams)
            .then((res) => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key,
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch((err) => {
                dispatch(fetchOrdersFailure(err));
            });
    };
};

export const deleteOrderStart = () => {
    return {
        type: actionTypes.DELETE_ORDER_START
    }
}

export const deleteOrderSuccess = (index) => {
    return {
        type: actionTypes.DELETE_ORDER_SUCCESS,
        index: index
    }
}

export const deleteOrderFailure = (error) => {
    return {
        type: actionTypes.DELETE_ORDER_FAILURE,
        error: error
    }
}

export const deleteOrder = (orderId, token, index) => {
    return dispatch => {
        dispatch(deleteOrderStart());
        axios.delete(`/orders/${orderId}.json?auth=${token}`)
            .then((response) => {
                dispatch(deleteOrderSuccess(index));
            })
            .catch((error) => {
                dispatch(deleteOrderFailure(error));
            })
    }
}
