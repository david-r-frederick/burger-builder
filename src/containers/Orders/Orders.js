import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../hoc/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if(!this.props.loading){
            orders = this.props.orders.map((order, index) => (
                <Order
                    key={order.id}
                    ind={index}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ));
        }
        return (
            <div style={{
                width: "90%"
            }}>
                {orders}
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
