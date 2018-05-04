import React from 'react';
import { acceptMock } from 'app/moduleStub';
import 'app';

jest.mock('app/moduleStub', () => {
  const mock = jest.fn();
  const stubMod = (module) => {
    module.hot = { accept: mock };
    return module;
  };
  stubMod.acceptMock = mock;
  return stubMod;
});

jest.mock('react-hot-loader', () => ({
  AppContainer({ children }) {
    return (<x-app-container>{children}</x-app-container>);
  },
}));

jest.mock('react-redux', () => ({
  Provider({ children }) {
    return (<x-provider>{children}</x-provider>);
  },
}));

jest.mock('react-router-dom', () => ({
  BrowserRouter({ children }) {
    return (<x-browser-router>{children}</x-browser-router>);
  },
}));

jest.mock('app/App', () => function App() { return <x-app />; });

jest.mock('app/configureStore', () => jest.fn());

describe('app/index', () => {
  it('should render successfully', () => {
    expect(document.getElementById().innerHTML).toMatchSnapshot();
  });

  it('should call hot module accept method', () => {
    expect(acceptMock).toBeCalledWith('./App', expect.any(Function));
  });
});

