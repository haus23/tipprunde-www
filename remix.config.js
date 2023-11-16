const { flatRoutes } = require('remix-flat-routes');

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  // Routing
  ignoredRouteFiles: ['**/*'],
  routes: async (defineRoutes) => {
    return flatRoutes('routes', defineRoutes);
  },
  // V2 Default Opt-Out
  serverModuleFormat: 'cjs',
};
