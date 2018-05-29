import { createStore, applyMiddleware, compose } from 'redux';
import configureStore from 'app/configureStore';

jest.mock('redux', () => ({
  createStore: jest.fn(() => ({ dispatch: jest.fn(() => ({})) })),
  applyMiddleware: jest.fn(),
  compose: jest.fn(),
}));

jest.mock('redux-saga', () => {
  const defaultFn = () => ({ run: jest.fn() });
  defaultFn.END = 'theEND';
  return defaultFn;
});

jest.mock('redux-devtools-extension/logOnlyInProduction', () => ({
  devToolsEnhancer: jest.fn(),
}));

jest.mock('app/rootReducer', () => jest.fn(() => 'rootReducer'));

describe('app/configureStore', () => {
  const store = configureStore();

  it('should call createStore from redux', () => {
    expect(createStore).toBeCalled();
  });

  it('should call applyMiddleware from redux', () => {
    expect(applyMiddleware).toBeCalled();
  });

  it('should call compose from redux', () => {
    expect(compose).toBeCalled();
  });

  it('should add a close method to store', () => {
    store.close();
    expect(store.dispatch).toBeCalledWith('theEND');
  });
});
