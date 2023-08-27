import React, { useEffect } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $auth } from '@store/index';

export type RequireAuthProps = {};

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useStore($auth);
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    if (!auth?.token) {
      history.push('/login', {
        from: location.pathname,
      });
    }
  }, [auth]);

  return children;
};
