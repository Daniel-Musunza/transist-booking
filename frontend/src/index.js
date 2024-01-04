import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/animate.min.css';
import './css/bootstrap.min.css';
import './css/card-js.min.css';
import './css/custom.css';
import './css/font-awesome.min.css';
import './css/jquery.flexdatalist.min.css';
import './css/responsive.css';
import './css/style-sgr.css';
import './css/updates.css';

import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
