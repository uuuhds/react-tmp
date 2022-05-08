import React, { Suspense } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import RouteApp from '@/client/routes';
import { Loading } from '@/client/components';

const Router = BrowserRouter || HashRouter;

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <RouteApp />
      </Router>
    </Suspense>
  );
}

export default App;
