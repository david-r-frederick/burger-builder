import React, { Component, Fragment } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    openSideDrawerHandler = () => {
        this.setState({showSideDrawer: true})
    }

    render() {
        return (
            <Fragment>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    showSide={this.openSideDrawerHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.closeSideDrawerHandler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStatetoProps)(Layout);
