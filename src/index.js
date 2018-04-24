import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";


import './index.css';
import App from './components/App';
import Errors from './components/Errors';
import Checkout from './components/Checkout';
import registerServiceWorker from './registerServiceWorker';


const app = document.getElementById('root')
ReactDOM.render(
<Router history={hashHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Errors}></IndexRoute>
        <Route path="checkout" name="checkout" component={Checkout}></Route>
    </Route>
</Router>,
app);

registerServiceWorker();
