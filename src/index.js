import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers,applyMiddleware, compose } from 'redux';
import ingredientsReducer from './store/reducers/ingredientsReducer';
import priceReducer from './store/reducers/priceReducer';
import thunk from 'redux-thunk';
import errorReducer from './store/reducers/errorReducer';
import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';
import buildingReducer from './store/reducers/buildingReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    ingrs: ingredientsReducer,
    price: priceReducer,
    error: errorReducer,
    orders: orderReducer,
    auth: authReducer,
    building: buildingReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();