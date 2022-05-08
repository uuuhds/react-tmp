import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/client/components';

const Home = lazy(() => import('@/client/pages/Home'));
const Settings = lazy(() => import('@/client/pages/Settings'));

const routes = [
  {
    component: Layout,
    path: '/',
    routes: [
      {
        path: '',
        exact: true,
        component: Home,
      },
      {
        path: '/settings',
        component: Settings,
      },
    ],
  },
];

const RouteApp = () => {
  return (
    <Routes>
      {routes.map((Item, key) => {
        return (
          <Route key={key} path={Item.path} element={<Item.component />}>
            {Item.routes.map((SubItem, subKey) => {
              return (
                <Route
                  key={subKey}
                  path={SubItem.path}
                  element={<SubItem.component />}
                />
              );
            })}
          </Route>
        );
      })}
    </Routes>
  );
};

export default RouteApp;
