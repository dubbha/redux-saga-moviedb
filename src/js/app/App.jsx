import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Search, Film } from './loadable';
import './style.sass';

const App = () => (
  <div className="app">
    <Switch>
      <Route path="/search/:by?/:query?" component={Search} />
      <Route path="/film/:id/:title?" component={Film} />
      <Route path="/" exact component={Search} />
    </Switch>
  </div>
);

export default App;
