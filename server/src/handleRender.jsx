import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';

import routes from '../../src/js/app/routes';
import configureStore from '../../src/js/app/configureStore';
import App from '../../src/js/app/App';

function renderFullPage(html, preloadedState) {
  return `<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>React Mentoring Program</title>
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

  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({ route, match }) => {
    const { fetchData } = route.component;

    if (!(fetchData instanceof Function)) {
      return Promise.resolve(null);
    }

    return fetchData(store.dispatch, match);
  });

  return Promise.all(promises)
    .then(() => {
      const context = {};
      const app = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      );

      const html = renderToString(app);

      if (context.url) { // <Redirect> was rendered
        return res.redirect(context.url);
      }

      const preloadedState = store.getState();

      return res.send(renderFullPage(html, preloadedState));
    });
}

export default handleRender;
