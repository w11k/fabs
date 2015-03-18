'use strict';

var config = require('./../build.config.js').getConfig();
var utils = require('./../utils/common.js');
var cacheBusting = require('./../utils/cacheBusting.js');
var project = require('./../utils/project.js');

var runKarmaInDev = config.build.spec.runInDev && utils.hasFiles(config.app.files.root, config.app.files.js_spec);
var bowerRc = project.getBowerRc();

var devTasksConfig = {

  updateConfig: {
    dev_changeLessSassConfig: {
      update: {
        'compass.options.debugInfo': true,
        'less.options.dumpLineNumbers': 'mediaquery'
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
          src: [ '<%= copy.prepare_app_js.options.out %>/**/*.js' ],
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
      livereload: true,
      interval: 1007
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
          'replace:dev_cacheBusting'
          // do not run any test or linting on startup
//          utils.includeIf('jshint', config.build.jshint.runInDev),
//          utils.includeIf('karma:dev_spec:run', runKarmaInDev)
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
        config.app.files.js.map(utils.addCwdToPattern(config.app.files.root))
      ],
      tasks: (function () {
        return [].concat(
          utils.includeIf('jshint:src', config.build.jshint.runInDev),
          utils.includeIf('karma:dev_spec:run', runKarmaInDev),
          'copy:prepare_app_js',
          'replace:dev_cacheBusting',
          'processHtml:prepare'
        );
      })()
    },

    js_mock: {
      files: [
        config.app.files.js_mock.map(utils.addCwdToPattern(config.app.files.root))
      ],
      tasks: (function () {
        return [].concat(
          utils.includeIf('jshint:mock', config.build.jshint.runInDev),
          utils.includeIf('karma:dev_spec:run', runKarmaInDev),
          utils.includeIf('copy:prepare_app_js_mock', config.build.mocks.loadInBrowser),
          'processHtml:prepare'
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
        config.app.files.js_spec.map(utils.addCwdToPattern(config.app.files.root))
      ],
      tasks: (function () {
        return [].concat(
          utils.includeIf('jshint:spec', config.build.jshint.runInDev),
          utils.includeIf('karma:dev_spec:run', runKarmaInDev)
        );
      })()
    },

    e2e: {
      options: {
        livereload: false
      },
      files: [
        config.app.files.js_e2e.map(utils.addCwdToPattern(config.app.files.root))
      ],
      tasks: (function () {
        return [].concat(
          utils.includeIf('jshint:e2e', config.build.jshint.runInDev)
        );
      })()
    },

    translations: {
      files: [
        config.app.files.translations.map(utils.addCwdToPattern(config.app.files.root))
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
      files: config.app.files.html.map(utils.addCwdToPattern(config.app.files.root)),
      tasks: [ 'processHtml:prepare' ]
    },

    templates: {
      files: [
        config.app.files.templates.map(utils.addCwdToPattern(config.app.files.root))
      ],
      tasks: [ 'copy:prepare_app_templates' ]
    },

    less: {
      options: {
        livereload: false
      },
      files: [
        'src/**/*.less'
      ],
      tasks: (function () {
        return [].concat(
          utils.includeIf('less:prepare_app', config.build.less.enabled && utils.hasFiles(config.app.files.root, config.app.files.less)),
          'concat:prepare_css',
          'processHtml:prepare'
        );
      })()
    },
    sass: {
      options: {
        livereload: false
      },
      files: [
        'src/**/*.scss'
      ],
      tasks: (function () {
        return [].concat(
          utils.includeIf('compass:prepare_app', config.build.sass.enabled && utils.hasFiles(config.app.files.root, config.app.files.sass)),
          'concat:prepare_css',
          'processHtml:prepare'
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
  },

  karma: {
    dev_spec: {
      configFile: '<%= karmaConfig.spec.options.out %>',
      background: true,
      reporters: [
        'progress'
      ]
    }
  }
};

if (config.build.bower.runInDev) {
  devTasksConfig.watch.vendor = {
    options: {
      livereload: false
    },
    files: [ bowerRc.json ],
    tasks: ['shell:bower']
  };
}

module.exports = devTasksConfig;
