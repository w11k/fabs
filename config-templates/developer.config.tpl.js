'use strict';

/**
 * This file contains additional configuration for the development process.
 * The exported object will be merged with 'project.config.js' and 'system.config.js', so this file can be used
 * to temporarily override some values (e.g. proxies). Also, you can use the developer configuration to enable or
 * disable some features of the build system during development like running 'bower install' on each start of
 * 'grunt dev' without adding '--bower=false' all the time.
 *
 * COPY THE FILE AND REMOVE THE .tpl BUT DO NOT COMMIT THE RESULTING JS FILE !!!
 * Otherwise another developer may override your settings or the CI build will fail because of reading your personal
 * config.
 */
module.exports = {

  build: {
    server: {
      // ATTENTION: ARRAYS DOES NOT GET CONCATENATED BUT REPLACED!
      // THIS CONFIGURATION OVERRIDES ALL PROXIES CONFIGURED IN project.config.js
      proxies: [
        {
          // example how to connect to a local backend
          context: '/api',
          host: 'localhost',
          port: 8080,
          changeOrigin: false
        }
      ]
    },

    // disable long running e2e tests in dev mode
    e2e: {
      runInDev: false
    },

    // do not depend on the server guys, develop teh frontend with mocks
    mocks: {
      loadInBrowser: true
    },

    /**
     * speed up grunt a bit, but be carefull, you have to install and update bower components manually if someone
     * changes the frontend dependencies specified via bower.json (e.g. after pulling)
     */
    bower: {
      runInPrepare: false
    }
  }

};
