import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem 
                link="/"
                clicked={props.clicked}
                >
                Burger Builder
            </NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders" clicked={props.clicked}>
                Orders
            </NavigationItem> : null }
            {props.isAuthenticated ? <NavigationItem link="/logout" clicked={props.clicked}>
                Log Out
            </NavigationItem> : <NavigationItem link="/auth" clicked={props.clicked}>
                Log In
            </NavigationItem>}
        </ul>
    );
}

export default navigationItems;