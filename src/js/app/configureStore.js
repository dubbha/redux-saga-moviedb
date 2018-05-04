import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from './rootReducer';

export default (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      devToolsEnhancer(),
    ),
  );

  return store;
};
