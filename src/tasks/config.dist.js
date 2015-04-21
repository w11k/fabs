'use strict';

var config = require('./../build.config.js').getConfig();
var utils = require('./../utils/common.js');
var cacheBusting = require('./../utils/cacheBusting.js');
var project = require('./../utils/project.js');
var pkg = project.getPackageJson();
var path = require('path');

var distTasksConfig = {

  connect: {
    dist: {
      options: {
        port: config.build.server.port,
        hostname: '0.0.0.0',
        livereload: false,
        keepalive: true,
        base: config.build.compile.outdir,
        middleware: utils.connectMiddleware
      },
      proxies: config.build.server.proxies
    },
    dist_e2e: {
      options: {
        port: config.build.tests.e2e.server.port,
        hostname: '0.0.0.0',
        livereload: false,
        keepalive: false,
        base: [
          config.build.dist.e2e.outdir,
          config.build.compile.outdir
        ],
        middleware: utils.connectMiddleware
      },
      proxies: config.build.server.proxies
    }
  },

  copy: {
    dist_e2e: {
      options: {
        out: config.build.dist.e2e.outdir
      },
      files: [
        {
          expand: true,
          cwd: config.vendor.base,
          src: config.vendor.files.js_mock,
          dest: '<%= copy.dist_e2e.options.out %>'
        },
        {
          expand: true,
          cwd: config.app.files.root,
          src: config.app.files.js_mock,
          dest: '<%= copy.dist_e2e.options.out %>'
        }
      ]
    }
  },

  karma: {
    dist_spec: {
      configFile: '<%= karmaConfig.spec.options.out %>',
      singleRun: true,
      reporters: [
        'progress',
        'junit'
      ]
    },
    dist_e2e: {
      configFile: '<%= karmaConfig.e2e.options.out %>',
      singleRun: true,
      reporters: [
        'progress',
        'junit'
      ]
    }
  },

  karmaConfig: {
    dist_e2e: {
      options: {
        template: path.normalize(__dirname + './../snippets/karma-e2e.tpl.js'),
        out: config.build.output.dir + '/e2e-karma.js',
        junitResults: config.build.output.dir + '/test-results',
        connectPort: config.build.tests.e2e.server.port,
        port: config.build.tests.e2e.karma.port,
        browsers: config.build.tests.e2e.browsers,
        basePath: path.resolve('.')
      },
      files: [
        {
          expand: true,
          nosort: true,
          cwd: config.app.files.root,
          src: config.app.files.js_e2e
        }
      ]
    }
  },

  protractorConfig: {
    dist: {
      options: {
        template: path.normalize(__dirname + './../snippets/protractor.tpl.js'),
        out: config.build.output.dir + '/protractor.js',
        browsers: config.build.tests.e2e.browsers,
        url: 'http://localhost:' + config.build.tests.e2e.server.port
      },
      files: [
        {
          expand: true,
          nosort: true,
          cwd: config.app.files.root,
          src: config.app.files.js_e2e
        }
      ]
    }
  },

  shell: {
    dist_e2e: {
      command: 'node node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update'
    }
  },

  protractor: {
    dist: {
      options: {
        configFile: '<%= protractorConfig.dist.options.out %>'
      }
    }
  },

  indexHtml: {
    dist_e2e: {
      options: {
        base: [
          config.build.prepare.outdir,
          config.build.compile.outdir + '/' + config.build.compile.cacheBustingDir,
          config.build.compile.outdir,
          config.build.dist.e2e.outdir
        ],
        dir: config.build.dist.e2e.outdir,
        blessedPrefix: config.build.bless.prefix,
        angular_module: config.app.angular_module.withMocks
      },
      files: [
        {
          expand: true,
          cwd: '<%= copy.compile_cacheBusting.options.out %>',
          src: '<%= concat.compile_js.options.outRelative %>'
        },
        {
          expand: true,
          nosort: true,
          cwd: '<%= copy.dist_e2e.options.out %>',
          src: config.vendor.files.js_mock
        },
        {
          expand: true,
          nosort: true,
          cwd: '<%= copy.dist_e2e.options.out %>',
          src: config.app.files.js_mock
        },
        {
          expand: true,
          cwd: '<%= copy.compile_cacheBusting.options.out %>',
          src: '<%= copy.compile_css.options.outRelative %>'
        }
      ]
    }
  },

  htmlmin: {
    dist_e2e: {
      files: [{
        src: config.build.dist.e2e.outdir  + '/index.html',
        dest: config.build.dist.e2e.outdir + '/index.html'
      }]
    }
  },

  updateConfig: {
    replace_dist_e2e_cacheBusting: {
      update: {
        'replace.dist_e2e_cacheBusting.options.patterns': cacheBusting.compilePatterns
      }
    }
  },


  replace: {
    dist_e2e_cacheBusting: {
      options: {
        prefix: '',
        // will be set by updateConfig:replace_compile_cacheBusting
        patterns: []
      },
      files: [
        {
          expand: true,
          cwd: config.build.dist.e2e.outdir,
          src: [ 'index.html' ],
          dest: config.build.dist.e2e.outdir
        }
      ]
    }
  },

  compress: {
    dist_app: {
      options: {
        archive: config.build.output.dir + '/' + pkg.name + '_v' + pkg.version + '.zip'
      },
      files: [
        {
          expand: true,
          filter: 'isFile',
          cwd: config.build.compile.outdir,
          src: ['**']
        }
      ]
    }
  }


};

module.exports = distTasksConfig;
