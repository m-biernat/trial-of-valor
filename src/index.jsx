/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';

import './index.css';
import 'bootstrap'

import App from './App';

render(
    () => (
        <Router>
            <App />
        </Router>
    ),
    document.getElementById('root')
);
