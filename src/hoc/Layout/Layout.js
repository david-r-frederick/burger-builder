import React, { Component, Fragment } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/SideDrawer';

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
                    showSide={this.openSideDrawerHandler}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.closeSideDrawerHandler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Fragment>
        );
    }
}

export default Layout;
