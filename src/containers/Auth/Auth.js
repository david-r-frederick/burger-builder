import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import checkValidity from '../../hoc/checkValidity/checkValidity';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false,
                    type: 'email',
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    type: 'password',
                },
                valid: false,
                touched: false,
            },
        },
        isSignUp: true,
    };

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== "/"){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true,
            },
        };
        this.setState({ controls: updatedControls });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp
        );
    };

    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return { isSignUp: !prevState.isSignUp };
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        let form = formElementsArray.map((formElement) => (
            <Input
                key={formElement.id}
                valid={formElement.config.valid}
                touched={formElement.config.touched}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) =>
                    this.inputChangedHandler(event, formElement.id)
                }
            />
        ));

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error){
            switch(this.props.error.message){
                case 'INVALID_EMAIL':
                    errorMessage = <p>The email you entered was invalid.</p>
                    break;
                case 'MISSING_PASSWORD':
                    errorMessage = <p>The password field was empty.</p>
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = <p>Incorrect password. Please try again.</p>
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = <p>We could not find an account with that email.</p>
                    break;
                default:
                    errorMessage = <p>{this.props.error.message}</p>
            }
        }

        if(this.props.isAuthenticated){
            return (
                <Redirect to={this.props.authRedirectPath} />
                )
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <p className={classes.SmallText}>
                        Password must be at least 6 characters long, contain 1 letter, 1 number, and 1 special
                        character.
                    </p>
                    <Button btnType="Success" disabled={false}>
                        Submit
                    </Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">
                    Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
