import styles from './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import Provider from 'components/Provider';
import { Router, Route, hashHistory } from 'react-router';

ReactDOM.render(
    <Provider>
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);