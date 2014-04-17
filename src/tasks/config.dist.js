'use strict';

var config = require('./../build.config.js').getConfig();
var utils = require('./../utils/common.js');
var cacheBusting = require('./../utils/cacheBusting.js');
var pkg = require('./../utils/package.js');
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
        port: config.build.e2e.server.port,
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
          cwd: 'vendor',
          src: config.vendor.files.js_mock,
          dest: '<%= copy.dist_e2e.options.out %>'
        },
        {
          expand: true,
          cwd: 'src/common',
          src: config.common.files.js_mock,
          dest: '<%= copy.dist_e2e.options.out %>'
        },
        {
          expand: true,
          cwd: 'src/app',
          src: config.app.files.js_mock,
          dest: '<%= copy.dist_e2e.options.out %>'
        }
      ]
    }
  },

  karma: {
    dist_e2e: {
      configFile: '<%= karmaConfig.dist_e2e.options.out %>',
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
        out: config.build.output.dir + '/karma-dist-e2e.js',
        junitResults: config.build.output.dir + '/karma-dist-e2e-results.xml',
        connectPort: config.build.e2e.server.port,
        port: config.build.e2e.karma.port,
        browsers: config.build.e2e.browsers
      },
      files: '<%= karmaConfig.dev_e2e.files %>'
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
          src: config.common.files.js_mock
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
