import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import LogOut from './containers/Auth/LogOut/LogOut';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Confirmation from './containers/Checkout/Confirmation/Confirmation';

const asyncCheckout = asyncComponent(() => {
    return import ('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import ('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import ('./containers/Auth/Auth');
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }
    
    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if(this.props.isAuthenticated){
            routes = (
            <Switch>
                <Route path="/confirmation" component={Confirmation} />
                <Route path="/checkout" component={asyncCheckout} />
                <Route path="/orders" component={asyncOrders} />
                <Route path="/logout" component={LogOut} />
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
