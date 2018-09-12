import App from './common/App';
import React from 'react';
import StaticRouter from 'react-router-dom/StaticRouter';
import express from 'express';
import { renderToString } from 'react-dom/server';
import qs from 'qs';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import { HelmetProvider } from 'react-helmet-async';
import configureStore from './common/store/configureStore';
import { fetchCounter } from './common/api/counter';
import { JssProvider, SheetsRegistry } from 'react-jss';
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles';
import 'isomorphic-fetch';
import { dom as fontawesomeDom } from '@fortawesome/fontawesome-svg-core';
import theme from './common/utils/theme';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    fetchCounter(apiResult => {
      // Read the counter from the request, if provided
      const params = qs.parse(req.query);
      const counter = parseInt(params.counter, 10) || apiResult || 0;

      // Compile an initial state
      const preloadedState = { counter };
      // Create a new Redux store instance
      const store = configureStore(preloadedState);
      // Grab the initial state from our Redux store
      const finalState = store.getState();

      // This is needed in order to deduplicate the injection of CSS in the page.
      const sheetsManager = new WeakMap();
      // This is needed in order to inject the critical CSS.
      const sheetsRegistry = new SheetsRegistry();
      // Create a new class name generator.
      const generateClassName = createGenerateClassName();

      const helmetContext = {};
      const context = {};
      // Render the component to a string
      const markup = renderToString(
        <JssProvider
          registry={sheetsRegistry}
          generateClassName={generateClassName}
        >
          <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
            <Provider store={store}>
              <HelmetProvider context={helmetContext}>
                <StaticRouter context={context} location={req.url}>
                  <App />
                </StaticRouter>
              </HelmetProvider>
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      );

      const { helmet } = helmetContext;

      // Grab the CSS from our sheetsRegistry.
      const css = sheetsRegistry.toString();

      if (context.url) {
        res.redirect(context.url);
      } else {
        res.status(200).send(
          `<!doctype html>
      <html ${helmet.htmlAttributes.toString()}>
      <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''
          }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
          <style>${fontawesomeDom.css()}</style>
      </head>
      <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${markup}</div>
          <script>
            window.__PRELOADED_STATE__ = ${serialize(finalState)}
          </script>
      </body>
      </html>`
        );
      }
    });
  });

export default server;
