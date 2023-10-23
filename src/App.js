import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { publicRoutes, privateRoutes } from '~/routes';
import './App.css';
import { DefaultLayout } from '~/layouts';
import RequireAuth from '~/components/RequireAuth';
import PersistLogin from '~/components/PersistLogin';
import Error from '~/components/Error';
import config from './config';

function App() {
  return (
    <div className="app">
      <Router>
        {/*Public routes*/}
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            // const HeaderSearch = route.headerSearch;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {/*We want to protect these routes*/}
          <Route element={<PersistLogin />}>
            {privateRoutes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              const Page = route.component;
              return (
                <Route key={index} element={<RequireAuth allowedRoles={route.allowedRoles} />}>
                  <Route
                    path={route.path}
                    element={
                      <Layout headerSearch={route.headerSearch}>
                        <Page />
                      </Layout>
                    }
                  />
                </Route>
              );
            })}
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Error goBack={config.routes.home} />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
