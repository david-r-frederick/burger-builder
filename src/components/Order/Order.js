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
                    <p className={classes.IngredientsChart}>
                        Ingredients:{' '}
                        {Object.entries(this.props.ingredients).map((el) => {
                            return (
                                <span
                                    key={el[0]}
                                    style={{
                                        textTransform: 'capitalize',
                                        display: 'inline-block',
                                        margin: '0 8px',
                                        border: '1px solid #ccc',
                                        padding: '6px',
                                    }}
                                >
                                    {el[0]} {el[1]}
                                </span>
                            );
                        })}
                    </p>
                    <Burger
                        size={1}
                        ingredients={this.props.ingredients}
                    />
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
