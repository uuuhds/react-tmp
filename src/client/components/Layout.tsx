import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const Layout: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <div className="layout">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
};
