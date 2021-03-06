import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider}from 'react-redux'
import {BrowserRouter,Route,Switch}  from 'react-router-dom'


import Authroute from './component/authroute/authroute'
import Login from "./container/login/login"
import BossInfo from "./container/bossInfo/bossInfo"
import GeniusInfo from "./container/geniusInfo/geniusInfo"
import Dashboard from "./container/Dashboard/dashboard"
import Chat from "./component/chat/chat"


import reducers from './reducer'
import './config'
import Register from './container/register/register';
import axios from 'axios'

import "./index.css"


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
            <Switch>
              <Route path="/bossinfo" component={BossInfo}></Route>
              <Route path="/geniusinfo" component={GeniusInfo}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/logout" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/chat/:user" component={Chat}></Route>
              <Route component={Dashboard}></Route>
            </Switch>
        </div>
      </BrowserRouter>
    </Provider>
    ),
    document.getElementById('root')
);


