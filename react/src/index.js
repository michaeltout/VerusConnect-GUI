import React from 'react';
import { render } from 'react-dom';
import {
  Router,
  Route,
  hashHistory
} from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/app/app';
import './styles/index.scss';
import ErrorBoundary from './components/error/ErrorBoundary';

const router = (
  <ErrorBoundary>
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route
          exact path="/"
          component={ App } />
      </Router>
    </Provider>
  </ErrorBoundary>
);

document.addEventListener('DOMContentLoaded', () => {
  render(
    router,
    document.getElementById('app'),
  );
});