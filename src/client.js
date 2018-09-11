import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { Provider } from 'react-redux';
import configureStore from './common/store/configureStore';
import { HelmetProvider } from 'react-helmet-async';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles';
import theme from './common/utils/theme';
import App from './common/App';

// This is needed in order to deduplicate the injection of CSS in the page.
const sheetsManager = new WeakMap();

// Create a new class name generator.
const generateClassName = createGenerateClassName();

class Client extends Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker
    //     .register('/sw.js')
    //     .then(registration => {
    //       console.log('service worker registration successful');
    //     })
    //     .catch(err => {
    //       console.warn('service worker registration failed', err.message);
    //     });
    // }
  }

  render() {
    return (
      <Provider store={store}>
        <JssProvider generateClassName={generateClassName}>
          <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
            <HelmetProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </HelmetProvider>
          </MuiThemeProvider>
        </JssProvider>
      </Provider>
    );
  }
}

const store = configureStore(window.__PRELOADED_STATE__);

hydrate(<Client />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./common/App', () => {
    hydrate(<Client />, document.getElementById('root'));
  });
}
