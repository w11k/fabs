'use strict';

var config = require('./../build.config.js').getConfig();
var utils = require('./../utils/common.js');
var cacheBusting = require('./../utils/cacheBusting.js');
var path = require('path');

var devTasksConfig = {

  updateConfig: {
    dev_changeLessSassConfig: {
      update: {
        'compass.options.outputStyle': 'expanded',
        'compass.options.debugInfo': true,
        'less.options.dumpLineNumbers': 'mediaquery',
        'less.options.compress': false
      }
    }
  },

  connect: {
    dev: {
      options: {
        port: config.build.server.port,
        hostname: '0.0.0.0',
        livereload: config.build.server.withLiveReloadInDev,
        base: config.build.prepare.outdir,
        middleware: utils.connectMiddleware
      },
      proxies: config.build.server.proxies
    },
    dev_e2e: {
      options: {
        port: config.build.e2e.server.port,
        hostname: '0.0.0.0',
        livereload: false,
        keepalive: false,
        base: [
          config.build.dev.e2e.outdir,
          config.build.prepare.outdir
        ],
        middleware: utils.connectMiddleware
      },
      proxies: config.build.server.proxies
    }
  },

  karma: {
    dev_e2e_watch: {
      configFile: '<%= karmaConfig.dev_e2e.options.out %>',
      background: true
    }
  },

  karmaConfig: {
    dev_e2e: {
      options: {
        template: path.normalize(__dirname + './../snippets/karma-e2e.tpl.js'),
        out: config.build.output.dir + '/karma-dev-e2e.js',
        junitResults: config.build.output.dir + '/karma-dev-e2e-results.xml',
        connectPort: config.build.e2e.server.port,
        port: config.build.e2e.karma.port,
        browsers: config.build.e2e.browsers
      },
      files: [
        {
          expand: true,
          nosort: true,
          cwd: 'vendor',
          src: config.vendor.files.js_e2e
        },
        {
          expand: true,
          nosort: true,
          cwd: 'src/common',
          src: config.common.files.js_e2e
        },
        {
          expand: true,
          nosort: true,
          cwd: 'src/app',
          src: config.app.files.js_e2e
        }
      ]
    }
  },

  indexHtml: {
    dev_e2e: {
      options: {
        base: [
          config.build.prepare.outdir,
          config.build.dev.e2e.outdir
        ],
        dir: config.build.dev.e2e.outdir,
        angular_module: config.app.angular_module.withMocks
      },
      files: (function () {
        return [].concat(
          // javascript
          {
            expand: true,
            nosort: true,
            cwd: '<%= copy.prepare_vendor_js.options.out %>',
            src: config.vendor.files.js
          },
          {
            expand: true,
            nosort: true,
            cwd: '<%= copy.prepare_common_js.options.out %>',
            src: config.common.files.js
          },
          {
            expand: true,
            nosort: true,
            cwd: '<%= copy.prepare_app_js.options.out %>',
            src: config.app.files.js
          },
          {
            src: '<%= translations2js.prepare.options.out %>'
          },
          {
            src: '<%= copy.prepare_app_templates2js.options.out %>'
          },
          {
            expand: true,
            nosort: true,
            cwd: '<%= copy.prepare_vendor_js_mock.options.out %>',
            src: config.vendor.files.js_mock
          },
          {
            expand: true,
            nosort: true,
            cwd: '<%= copy.prepare_common_js_mock.options.out %>',
            src: config.common.files.js_mock
          },
          {
            expand: true,
            nosort: true,
            cwd: '<%= copy.prepare_app_js_mock.options.out %>',
            src: config.app.files.js_mock
          },

          // css
          {
            src: '<%= concat.prepare_css.options.out %>'
          }
        );
      })()
    }
  },

  replace: {
    /**
     * We need to replace variables for manual cache busting in our code. Otherwise the paths won't match in dev mode.
     * There can't be dynamically calculated paths in css code, so we don't need to check the css files.
     */
    dev_cacheBusting: {
      options: {
        prefix: '',
        patterns: cacheBusting.devPatterns()
      },
      files: [
        {
          expand: true,
          cwd: '.',
          src: [
            '<%= copy.prepare_app_js.options.out %>/**/*.js',
            '<%= copy.prepare_common_js.options.out %>/**/*.js'
          ],
          dest: '.'
        }
      ]
    }
  },

  /**
   * And for rapid development, we have a watch set up that checks to see if
   * any of the files listed below change, and then to execute the listed
   * tasks when they do. This just saves us from having to type "grunt" into
   * the command-line every time we want to see what we're working on; we can
   * instead just leave grunt running in a background terminal.
   *
   * But we don't need the same thing to happen for all the files.
   */
  watch: {
    /**
     * By default, we want the Live Reload to work for all tasks; this is
     * overridden in some tasks (like this file) where browser resources are
     * unaffected. It runs by default on port 35729, which your browser
     * plugin should auto-detect.
     */
    options: {
      livereload: true
    },

    /*
     * Not really a watch (empty files array). This target should execute some tasks at the beginning of watch.
     * By running the tasks from watch instead of running them before start watching, a failure will
     * not stop the hole grunt command. If a failure (jslint error or broken test) happens, grunt will remain in
     * watch mode, and we will have the change to fix the error without the need to start grunt again manually.
     */
    runOnce: {
      files: [],
      tasks: (function () {
        return [].concat(
          'jshint',
          'replace:dev_cacheBusting',
          utils.includeIf('karma:prepare_spec_watch:run', config.build.spec.runInPrepare),
          utils.includeIf('karma:dev_e2e_watch:run', config.build.e2e.runInDev)
        );
      })(),
      options: {
        atBegin: true
      }
    },

    /**
     * When our JavaScript source files change, we want to run lint them and
     * run our unit tests.
     */
    js: {
      files: [
        config.app.files.js.map(utils.addCwdToPattern('src/app')),
        config.common.files.js.map(utils.addCwdToPattern('src/common'))
      ],
      tasks: (function () {
        return [].concat(
          'jshint:src',
          utils.includeIf('karma:prepare_spec_watch:run', config.build.spec.runInPrepare),
          utils.includeIf('karma:dev_e2e_watch:run', config.build.e2e.runInDev),
          'copy:prepare_app_js',
          'copy:prepare_common_js',
          'replace:dev_cacheBusting',
          'indexHtml:prepare'
        );
      })()
    },

    js_mock: {
      files: [
        config.app.files.js_mock.map(utils.addCwdToPattern('src/app')),
        config.common.files.js_mock.map(utils.addCwdToPattern('src/common'))
      ],
      tasks: (function () {
        return [].concat(
          'jshint:mock',
          utils.includeIf('karma:prepare_spec_watch:run', config.build.spec.runInPrepare),
          utils.includeIf('karma:dev_e2e_watch:run', config.build.e2e.runInDev),
          utils.includeIf('copy:prepare_app_js_mock', config.build.mocks.loadInBrowser),
          utils.includeIf('copy:prepare_common_js_mock', config.build.mocks.loadInBrowser),
          'indexHtml:prepare'
        );
      })()
    },

    /**
     * When a JavaScript unit test file changes, we only want to lint it and
     * run the unit tests. We don't want to do any live reloading.
     */
    js_spec: {
      options: {
        livereload: false
      },
      files: [
        config.app.files.js_spec.map(utils.addCwdToPattern('src/app')),
        config.common.files.js_spec.map(utils.addCwdToPattern('src/common'))
      ],
      tasks: (function () {
        return [].concat(
          'jshint:spec',
          utils.includeIf('karma:prepare_spec_watch:run', config.build.spec.runInPrepare)
        );
      })()
    },

    e2e: {
      options: {
        livereload: false
      },
      files: [
        config.app.files.js_e2e.map(utils.addCwdToPattern('src/app')),
        config.common.files.js_e2e.map(utils.addCwdToPattern('src/common'))
      ],
      tasks: (function () {
        return [].concat(
          'jshint:e2e',
          utils.includeIf('karma:dev_e2e_watch:run', config.build.e2e.runInDev)
        );
      })()
    },

    translations: {
      files: [
        config.app.files.translations.map(utils.addCwdToPattern('src/app'))
      ],
      tasks: [ 'translations2js:prepare' ]
    },

    /**
     * When assets are changed, copy them. Note that this will *not* copy new
     * files, so this is probably not very useful.
     */
    assets: {
      files: [
        'assets/**/*'
      ],
      tasks: [ 'copy:prepare_app_assets' ]
    },

    html: {
      files: [ 'src/index.html' ],
      tasks: (function () {
        return [].concat(
          'indexHtml:prepare',
          utils.includeIf('karma:dev_e2e_watch:run', config.build.e2e.runInDev)
        );
      })()
    },

    templates: {
      files: [
        config.app.files.templates.map(utils.addCwdToPattern('src/app')),
        config.common.files.templates.map(utils.addCwdToPattern('src/common'))
      ],
      tasks: (function () {
        return [].concat(
          'copy:prepare_app_templates',
          'copy:prepare_common_templates',
          utils.includeIf('karma:dev_e2e_watch:run', config.build.e2e.runInDev)
        );
      })()
    },

    less: {
      options: {
        livereload: false
      },
      files: [
        config.app.files.less.map(utils.addCwdToPattern('src/app')),
        config.common.files.less.map(utils.addCwdToPattern('src/common'))
      ],
      tasks: (function () {
        return [].concat(
          utils.includeIf('less:prepare_app', config.build.less.enabled && utils.hasFiles('src/app', config.app.files.less)),
          utils.includeIf('less:prepare_common', config.build.less.enabled && utils.hasFiles('src/common', config.common.files.less)),
          'concat:prepare_css',
          'indexHtml:prepare',
          utils.includeIf('karma:dev_e2e_watch:run', config.build.e2e.runInDev)
        );
      })()
    },
    sass: {
      options: {
        livereload: false
      },
      files: [
        config.app.files.sass.map(utils.addCwdToPattern('src/app')),
        config.common.files.sass.map(utils.addCwdToPattern('src/common'))
      ],
      tasks: (function () {
        return [].concat(
          utils.includeIf('compass:prepare_app', config.build.sass.enabled && utils.hasFiles('src/app', config.app.files.sass)),
          utils.includeIf('compass:prepare_common', config.build.sass.enabled && utils.hasFiles('src/common', config.common.files.sass)),
          'concat:prepare_css',
          'indexHtml:prepare',
          utils.includeIf('karma:dev_e2e_watch:run', config.build.e2e.runInDev)
        );
      })()
    },
    css: {
      files: [
        '<%= concat.prepare_css.options.out %>'
      ],
      // livereload only
      tasks: []
    }
  }

};

module.exports = devTasksConfig;
