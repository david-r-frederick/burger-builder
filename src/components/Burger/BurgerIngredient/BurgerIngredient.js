/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case 'bread-bottom':
                ingredient = (
                    <div
                        // style={{height: `${this.props.size * 1.3}em` }}
                        style={{ height: `40px` }}
                        className={classes.BreadBottom}
                    ></div>
                );
                break;
            case 'bread-top':
                ingredient = (
                    <div
                        // style={{height: `${this.props.size * 1.3}em` }}
                        style={{ height: `40px` }}
                        className={classes.BreadTop}
                    >
                        <div
                            style={{ height: `${this.props.size * 0.2}em` }}
                            className={classes.Seeds1}
                        ></div>
                        <div
                            style={{ 
                                height: `${this.props.size * 0.2}em`
                            }}
                            className={classes.Seeds2}
                        ></div>
                    </div>
                );
                break;
            case 'meat':
                ingredient = (
                    <div
                        style={{ height: `40px` }}
                        // style={{height: `${this.props.size}em` }}
                        className={classes.Meat}
                    ></div>
                );
                break;
            case 'cheese':
                ingredient = (
                    <div
                        style={{ height: `40px` }}
                        // style={{ height: `${this.props.size}em`}}
                        className={classes.Cheese}
                    ></div>
                );
                break;
            case 'lettuce':
                ingredient = (
                    <div
                        // style={{ height: `${this.props.size}em` }}
                        style={{ height: `40px` }}
                        className={classes.Lettuce}
                    ></div>
                );
                break;
            case 'bacon':
                ingredient = (
                    <div
                        // style={{ height: `${this.props.size * 0.4}em` }}
                        style={{ height: `15px` }}
                        className={classes.Bacon}
                    ></div>
                );
                break;
            default:
                ingredient = null;
                break;
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
