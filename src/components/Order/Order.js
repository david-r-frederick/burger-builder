import React, { Component } from 'react';
import classes from './Order.module.css';
import Burger from '../../components/Burger/Burger';
import Button from '../UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class order extends Component {
    render() {
        return (
            <div className={classes.Order}>
                <div className={classes.Elements}>
                    <div className={classes.IngredientsChart}>
                        <h3>Ingredients: </h3>
                        <ul className={classes.IngredientsList}>
                            {Object.entries(this.props.ingredients).map(
                                (el) => {
                                    return (
                                        <li
                                            key={el[0]}
                                            className={
                                                classes.IngredientListItem
                                            }
                                        >
                                            {el[1]} {el[0]}
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                    <Burger size={1} ingredients={this.props.ingredients} />
                </div>
                <div>
                    <ul className={classes.OrderOptions}>
                        <li>
                            <p className={classes.PriceOption}>
                                Price:{' '}
                                <strong>
                                    {parseFloat(this.props.price).toFixed(2)}
                                </strong>
                            </p>
                        </li>
                        <li>
                            <Button
                                btnType="Danger"
                                clicked={() =>
                                    this.props.onDeleteOrder(
                                        this.props.orders[this.props.ind].id,
                                        this.props.token,
                                        this.props.ind
                                    )
                                }
                            >
                                Delete
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteOrder: (orderId, token, index) =>
            dispatch(actions.deleteOrder(orderId, token, index)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(order);
