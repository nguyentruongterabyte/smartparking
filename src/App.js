import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import './App.css';
import { DefaultLayout } from '~/layouts';
import RequireAuth from '~/components/RequireAuth';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
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
                    <Layout>
                      <Page />
                    </Layout>
                  }
                ></Route>
              </Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
