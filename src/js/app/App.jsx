import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import './style.sass';

const App = () => (
  <div className="app">
    <Switch>
      {renderRoutes(routes)}
    </Switch>
  </div>
);

export default App;
