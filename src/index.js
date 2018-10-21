import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider}from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch}  from 'react-router-dom'

import Authroute from './component/authroute/authroute'
import Login from "./container/login/login"
import Logout from './container/logout/logout'
import reducers from './reducer'
import './config'
import Register from './container/register/register';

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension:f=>f
))

ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <div>
            <Authroute></Authroute>
            <Route path="/login" component={Login}></Route>
            <Route path="/logout" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
        </div>
      </BrowserRouter>
    </Provider>
    ),
    document.getElementById('root')
);


