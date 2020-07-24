import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
    const attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses.pop();
        attachedClasses.push(classes.Open);
    }
    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems 
                        isAuthenticated={props.isAuth}
                        clicked={props.closed}
                    />
                </nav>
            </div>
        </Fragment>
    )
};

export default sideDrawer;