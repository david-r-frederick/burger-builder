import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../hoc/axios-orders';
// import { Redirect } from 'react-router-dom';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount () {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push("/auth");
        }
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings,
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let checkoutBtnDisabled = false;
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if(Object.values(this.props.ings).length !== 0){
            if (Object.values(this.props.ings).every((el) => el === 0)) {
                checkoutBtnDisabled = true;
            }
            burger = (                
                <Fragment>
                    <Burger 
                        ingredients={this.props.ings} 
                        size={2}
                        />
                <BuildControls
                    increase={(ingName) => {
                        this.props.onAddIngredient(ingName);
                        this.props.onIncreasePrice(ingName);
                    }}
                    decrease={(ingName) => {
                        this.props.onRemoveIngredient(ingName)
                        this.props.onDecreasePrice(ingName);
                    }}
                    disabled={disabledInfo}
                    checkoutDisabled={checkoutBtnDisabled}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}
                    currentPrice={this.props.price}
                />
                </Fragment>
                    );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.props.price}
                />
            );
        }
        return (
            <Fragment>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingrs,
        price: state.price,
        error: state.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onIncreasePrice: (ingName) => dispatch(actions.increasePrice(ingName)),
        onDecreasePrice: (ingName) => dispatch(actions.decreasePrice(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onError: () => dispatch(actions.fetchIngredientsFailed),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
