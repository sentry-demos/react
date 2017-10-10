import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, hashHistory } from "react-router";

import './index.css';
import App from './components/App';
import Login from './components/Login';
import Errors from './components/Errors';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path='errors' name='errors' component={Errors}/>
        </Route>
    </Router>,

document.getElementById('root'));
registerServiceWorker();
