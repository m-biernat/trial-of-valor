/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, hashIntegration } from 'solid-app-router';

import './index.css';
import 'bootstrap';

import App from './App';

render(
    () => (
        <Router source={hashIntegration()}>
            <App />
        </Router>
    ),
    document.getElementById('root')
);
