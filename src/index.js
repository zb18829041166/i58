import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider}from 'react-redux'
import {BrowserRouter,Route}  from 'react-router-dom'

import Authroute from './component/authroute/authroute'
import Login from "./container/login/login"
import reducers from './reducer'
import './config'
import Register from './container/register/register';
import axios from 'axios'

axios.defaults.withCredentials = true;


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


