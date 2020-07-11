import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../hoc/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.1,
    cheese: 0.5,
    meat: 1.2,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount () {
        axios.get('https://react-my-burger-fc3a1.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
            // alert(error.message);
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        let updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        const queryParams = []; //["meat=2", "cheese=2", etc.]
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push("price=" + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push(
            {
                pathname: '/checkout',
                search: '?' + queryString
            }
        );
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let checkoutBtnDisabled = false;
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if(this.state.ingredients){
            if (Object.values(this.state.ingredients).every((el) => el === 0)) {
                checkoutBtnDisabled = true;
            }
            burger = (                
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        increase={this.addIngredientHandler}
                        decrease={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        currentPrice={this.state.totalPrice.toFixed(2)}
                        checkoutDisabled={checkoutBtnDisabled}
                        ordered={this.purchaseHandler}
                    />
                </Fragment>);
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);
