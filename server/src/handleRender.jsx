import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../src/js/app/configureStore';
import rootSaga from '../../src/js/common/store/sagas';
import App from '../../src/js/app/App';

function renderFullPage(html, preloadedState) {
  return `<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Redux-Saga MovieDB SSR</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="shortcut icon" href="/favicon.ico">
  </head>
  <body>
    <div id="app">${html}</div>
    <script>
      window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script src="/bundle.js"></script>
  </body>
</html>
`;
}

function handleRender(req, res) {
  const store = configureStore();
  const context = {};
  const app = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  store.runSaga(rootSaga).done.then(() => {
    console.log('done');
    const html = renderToString(app);

    if (context.url) { // <Redirect> was rendered
      return res.redirect(context.url);
    }

    const preloadedState = store.getState();

    return res.send(renderFullPage(html, preloadedState));
  });

  // Do first render, starts initial actions.
  renderToString(app);

  // When the first render is finished, send the END action to redux-saga.
  store.close();
}

export default handleRender;
