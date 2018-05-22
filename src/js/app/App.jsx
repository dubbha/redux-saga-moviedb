import React, { StrictMode } from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import './style.sass';

const App = () => (
  <div className="app">
    <StrictMode>
      <Switch>
        {renderRoutes(routes)}
      </Switch>
    </StrictMode>
  </div>
);

export default App;
