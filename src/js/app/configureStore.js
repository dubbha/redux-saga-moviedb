import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from './rootReducer';
import rootSaga from '../common/store/sagas';

export default (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      devToolsEnhancer(),
    ),
  );

  store.runSaga = sagaMiddleware.run; // two methods needed for SSR
  store.close = () => store.dispatch(END);

  sagaMiddleware.run(rootSaga);
  return store;
};
