import React from 'react';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';

import Login from '@pages/Login';

import styles from './App.module.scss';
import { RequireAuth } from '@utils/RequireAuth/RequireAuth';
import { Layout } from '@components/Layout';
import { routes } from '@utils/routes';

const App = () => {
  return (
    <div className={styles.root}>
      <Switch>
        <Route path={'/login'} exact component={Login} />

        {routes.map(({ Component, ...route }) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={
              route.requireAuth
                ? (props: RouteComponentProps) => (
                    <RequireAuth>
                      <Layout>
                        <Component {...props} />
                      </Layout>
                    </RequireAuth>
                  )
                : Component
            }
          />
        ))}

        <Redirect to={'/'} />
      </Switch>
    </div>
  );
};

export default App;
