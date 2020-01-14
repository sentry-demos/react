import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// import * as Sentry from '@sentry/browser';
// import {Integrations} from '@sentry/apm';

ReactDOM.render(<App /> , document.getElementById('root'));
registerServiceWorker();

// Sentry.init({
//   dsn: 'https://0d52d5f4e8a64f5ab2edce50d88a7626@sentry.io/1428657',
//   integrations: [
//     new Integrations.Tracing({
//       tracingOrigins: ['localhost', 'sentry.io', /^\//]
//     })
//   ]
// });