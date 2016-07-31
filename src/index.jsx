import styles from './index.css';
//TODO: we don't use React in code, but we need it somehow.
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);