import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// require('dotenv').config()
// const dotenv = require('dotenv')

ReactDOM.render(<App /> , document.getElementById('root'));

registerServiceWorker();
