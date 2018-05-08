import React from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './App';

// Grab the state from a global variable injected into the server-generated HTML
const store = configureStore(window.PRELOADED_STATE);

// Allow the passed state to be garbage-collected
delete window.PRELOADED_STATE;

const renderApp = () => {
  const renderMethod = module.hot ? render : hydrate;
  renderMethod(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./App', renderApp);
}
