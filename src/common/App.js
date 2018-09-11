import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet-async';
import Layout from './../common/components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

const App = () => (
  <Fragment>
    <Helmet>
      <title>SSSR</title>
      <html lang="en" />
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="SSR on steroid!" />
      <meta name="theme-color" content="#008f68" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Helmet>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Fragment>
);

export default App;
