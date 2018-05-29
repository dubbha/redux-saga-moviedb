import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../common/Loading';
import './style.sass';

const Search = Loadable({
  loader: () => import(/* webpackChunkName: "search" */ '../search'),
  loading: Loading,
});

const Film = Loadable({
  loader: () => import(/* webpackChunkName: "film" */ '../film'),
  loading: Loading,
});

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
