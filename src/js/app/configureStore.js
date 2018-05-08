import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from './rootReducer';
import initSagas from './initSagas';

export default (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware, thunk),
      devToolsEnhancer(),
    ),
  );
  initSagas(sagaMiddleware);
  return store;
};
