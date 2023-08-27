// Core
import { createEvent, createStore } from 'effector';
import { createBrowserHistory } from 'history';
import { Nullable } from './typings';

export const history = createBrowserHistory();

type AuthStore = {
  token: string;
};
const auth = localStorage.getItem('auth');

export const $auth = createStore<Nullable<AuthStore>>(
  auth ? JSON.parse(auth) : null,
);
export const setAuth = createEvent<Nullable<AuthStore>>();
export const loguot = createEvent<Nullable<AuthStore>>();

$auth.on(setAuth, (_, auth) => {
  if (!auth) return null;
  localStorage.setItem('auth', JSON.stringify(auth));

  return auth;
});

$auth.on(loguot, () => {
  localStorage.removeItem('auth');

  return null;
});
