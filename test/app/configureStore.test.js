import { createStore, applyMiddleware, compose } from 'redux';
import configureStore from 'app/configureStore';

jest.mock('redux', () => ({
  createStore: jest.fn(),
  applyMiddleware: jest.fn(),
  compose: jest.fn(),
}));

jest.mock('redux-thunk', () => jest.fn(() => 'thunk'));

jest.mock('redux-devtools-extension/logOnlyInProduction', () => ({
  devToolsEnhancer: jest.fn(),
}));

jest.mock('app/rootReducer', () => jest.fn(() => 'rootReducer'));

describe('app/configureStore', () => {
  configureStore();

  it('should call createStore from redux', () => {
    expect(createStore).toBeCalled();
  });

  it('should call applyMiddleware from redux', () => {
    expect(applyMiddleware).toBeCalled();
  });

  it('should call compose from redux', () => {
    expect(compose).toBeCalled();
  });
});
