import Home from '@pages/Home';
import Item from '@pages/Item';
import Items from '@pages/Items';
import Other from '@pages/Other';
import React from 'react';

type Routes = {
  path: string;
  exact: boolean;
  requireAuth: boolean;
  Component: React.FC<any>;
  title: string;
  withSubtitle?: boolean;
}[];

export const menu: Routes = [
  {
    path: '/',
    exact: true,
    requireAuth: true,
    Component: Home,
    title: 'Главная',
  },
  {
    path: '/items',
    exact: true,
    requireAuth: true,
    Component: Items,
    title: 'Итемы',
  },
  {
    path: '/other',
    exact: true,
    requireAuth: true,
    Component: Other,
    title: 'Другая',
  },
];

export const routes: Routes = [
  ...menu,
  {
    path: '/item/:id',
    exact: false,
    requireAuth: true,
    Component: Item,
    title: 'Итем',
    withSubtitle: true,
  },
];
