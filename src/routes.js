import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from 'containers/App';
import NotFound from 'containers/NotFound';

// eslint-disable-next-line
export default (/* store */) => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      {/* Home (main) route */}
      <IndexRoute
        getComponent={(nextState, callback) => {
          require.ensure([], (require) => {
            callback(null, require('containers/Home'));
          });
        }}
      />
      <Route
        path="articles"
        getComponent={(nextState, callback) => {
          require.ensure([], (require) => {
            callback(null, require('containers/Articles'));
          });
        }}
      />
      <Route
        path="examples"
        getComponent={(nextState, callback) => {
          require.ensure([], (require) => {
            callback(null, require('containers/Examples'));
          });
        }}
      />
      <Route
        path="about"
        getComponent={(nextState, callback) => {
          require.ensure([], (require) => {
            callback(null, require('containers/About'));
          });
        }}
      />

      {/* Catch all route */}
      <Route
        path="*"
        component={NotFound}
        status={404}
      />
    </Route>
  );
};
