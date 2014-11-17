'use strict';

var project = require('./utils/project.js');
var pkg = project.getPackageJson();

var systemConfig = {

  build: {
    bower: {
      // Enable / disable execution of 'bower install' && 'bower update' in dev mode
      runInDev: true,
      // Enable / disable execution of 'bower install' && 'bower update' in dist mode
      runInDist: true
    },
    less: {
      // Enable / disable usage of less
      enabled: true
    },
    sass: {
      // Enable / disable usage of sass
      enabled: true
    },
    ngAnnotate: {
      /**
       * Enable / disable execution of ng-annotate in compile phase to automatically create array notation for angular
       * dependency injection.
       *
       * Pay attention: ng-annotate perhaps does not detect all functions consuming dependencies via di.
       * Use a multiline comment with @ngInject in front of a function to mark it for annotation. See ng-annotate website for more information.
       */
      enabled: true
    },
    jshint: {
      runInDev: true,
      runInDist: true
    },
    bless: {
      prefix: 'blessed_',
      enabled: true
    },
    spec: {
      // Enable / disable running spec tests in dev mode
      runInDev: true,
      // Enable / disable running spec tests in dist mode
      runInDist: true,
      karma: {
        // port on which karma for spec tests runs
        port: 9010
      },
      /**
       * The list of browsers to launch to test on. May include:
       * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
       *
       * You may also leave this empty and manually navigate your browser to
       * http://localhost:9010/ when you're running tests. The window/tab can be left
       * open and the tests will automatically occur there during the build.
       */
      browsers: []
    },
    e2e: {
      // Enable / disable running end-to-end tests against compiled application
      runInDist: true,
      karma: {
        // Enable / disable running end-to-end tests with karma and ng-scenario runner
        enabled: false,
        // port on which karma for e2e tests runs
        port: 9011
      },
      protrctor: {
        // Enable / disable running end-to-end tests with protractor
        enabled: true
      },
      server: {
        // port used to start web server serving application for e2e tests (with mocks)
        port: 9001
      },
      /**
       * The list of browsers to launch to test on. May include:
       * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
       *
       * You may also leave this empty and manually navigate your browser to
       * http://localhost:9011/ when you're running tests. The window/tab can be left
       * open and the tests will automatically occur there during the build.
       */
      browsers: []
    },
    mocks: {
      /**
       * Enable / disable loading the mock files (app.files.js_mock and vendor.files.js_mock) in
       * the browser during development (dev mode)
       */
      loadInBrowser: false
    },
    server: {
      /**
       * Specifies proxies for all servers grunt will start (dev server, e2e servers and dist server). With proxies you
       * can redirect some http calls to other servers. This enables you to talk to your backend will running the
       * frontend in dev mode (grunt server with live reload, test execution, ...)
       */
      proxies: [],
      // Enables / disables starting a server (running forever, kill with Ctrl+C) serving the compiled application.
      runInDist: false,
      // specifies if live reload should be activated in dev mode
      withLiveReloadInDev: true,
      // port used to start web server to be able to open the application in browser (dev mode and if runInDist == true in dist)
      port: 9000
    },
    output: {
      // the overall output folder the build system will use
      dir: 'build-output'
    },
    prepare: {
      // the folder the prepared app will be placed to, sub folder of output.dir
      dir: 'prepared'
    },
    compile: {
      // the folder the compiled app will be placed to, sub folder of output.dir
      dir: 'compiled',
      // the folder under compile.dir used to move all files excepted index.html to
      cacheBustingDir: pkg.version
    },
    dist: {
      e2e: {
        // used internally to run e2e tests against compiled app but with mock files
        dir: 'dist_e2e'
      }
    }
  },


  app: {
    /**
     * Specifies which files to include to the prepared / compiled application.
     *
     * ALL PATHS ARE RELATIVE TO root !!!
     */
    files: {
      root: 'src',
      js: [
        '**/*.js',
        '!**/*.mock.js',
        '!**/*.spec.js',
        '!**/*.e2e.js'
      ],
      js_mock: [ '**/*.mock.js' ],
      js_spec: [ '**/*.spec.js' ],
      js_e2e: [ '**/*.e2e.js' ],

      html: [
        'index.html'
      ],

      // application's html templates
      templates: [
        '**/*.html'
      ],
      // a subset of templates to compile to js and preload with js code
      templates2js: [
        // don't use the next line, otherwise index.html will be included too
        // '**/*.html'
        'route/home/home.html'
      ],
      /**
       * Translations for one language must be defined within one file. There is no merging of translations, neither
       * within the build system nor withing the running application.
       */
      translations: [
        'translations/**/*.json'
      ],
      /**
       * A subset of translations to include and preload with js code.
       * Build will not fail if one of the specified files does not exist.
       */
      translations2js: [
        'translations/en.json',
        'translations/de.json'
      ],
      css: [
        '**/*.css'
      ],
      /**
       * We can use wildcards to match multiple or all less files or we can specify less files and use imports
       * within these file to manage the inclusion manually.
       */
      less: [
        '**/*.less',
        '!**/_*.less'
      ],
      /**
       * We can use wildcards to match multiple or all scss files or we can specify scss files and use imports
       * within these file to manage the inclusion manually.
       */
      sass: [
        '**/*.scss'
        /**
         * Do not exclude scss files starting with _. Compass will ignore the automatically. Excluding them here means
         * excluding them from being watched.
         */
        //'!**/_*.scss'
        //'app.scss'
      ]
    },

    angular_module: {
      // name of the angular module to boostrap the prepared / compiled application with
      regular: 'app',
      /**
       * name of the angular module to boostrap the application with if mocks should be used
       * loadInBrowser == true, spec and e2e tests
       */
      withMocks: 'app.mock',
      /**
       * name of the module to put the compiled templates in (templates2js)
       * You have to add a dependency to this module your 'main' module (specified via 'regular') to load the templates
       * from the javascript code. Otherwise each template is loaded from the server a separated http request.
       */
      templates: 'app.templates',
      /**
       * name of the module to put the compiled translations in (translations2js)
       * Like for templates, you have to add a dependency to this module to your 'main' module to benefit from loading
       * the translations with the javascript code. Otherwise each language will be loaded via an extra http request.
       */
      translations: 'app.translations'
    }
  },

  vendor: {
    /**
     * Specifies which files to include to the prepared / compiled application.
     *
     * No default values because you will always have to add something and arrays get replaced, not concatenated or
     * merged. So the default will always be replaced.
     *
     * While 'app.files' can easily use wildcards, it's a bit more complicate for vendor code.
     * Bower packages usually comes with a bunch of files and we certainly do not want to include them all. So we have
     * to handle the inclusion manually.
     *
     * ALL PATHS ARE RELATIVE TO 'vendor' !!!
     */
    files: {
      js: [
//        'angular/angular.js'
      ],
      js_mock: [
//        'angular-mocks/angular-mocks.js'
      ],
      /**
       * No need to add mock files here, spec tests will always include js_mock.
       * Add files / libraries you use within your test code. Jasmine will be included automatically for you.
       */
      js_spec: [],
      /**
       * No need to add mock files here, e2e tests will always include js_mock.
       * Add files / libraries you use within your test code. Angular-Scenario-Runner will be included automatically
       * for you.
       */
      js_e2e: [],
      css: [],
      assets: []
    }
  }

};

module.exports = systemConfig;
