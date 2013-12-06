'use strict';

var lodash = require('lodash');
var pkg = require('./../utils/package.js');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Load and merge the configuration files.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var prepareTasksConfig = require('./config.prepare.js');
var devTasksConfig = require('./config.dev.js');
var compileTasksConfig = require('./config.compile.js');
var distTasksConfig = require('./config.dist.js');
var exportTasksConfig = require('./export.js');

var additionalTasksConfig = {
  /**
   * Make 'package.json' accessible to templates like banner below.
   */
  pkg: pkg,

  /**
   * The banner is the comment that is placed at the top of our compiled files.
   * It is first processed as a Grunt template, where variables ('<%= ... %>') are evaluated based on this
   * configuration object.
   */
  meta: {
    banner:
      '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' */\n'
  },

  /**
   * define some default configuration for tasks used within multiple phases like prepare and compile
   */

  less: {
    options: {
      // changed for dev mode via updateConfig:dev_changeLessSassConfig
      dumpLineNumbers: 'false',
      compress: true,
      paths: [ 'vendor' ]
    }
  },

  compass: {
    options: {
      importPath: [ 'vendor' ],
      relativeAssets: false,

      // changed for dev mode via updateConfig:dev_changeLessSassConfig
      outputStyle: 'compressed',
      debugInfo: false
    }
  },

  htmlmin: {
    options: {
      collapseWhitespace: true
    }
  }

};

var taskConfig = lodash.merge({}, additionalTasksConfig, prepareTasksConfig, devTasksConfig, compileTasksConfig, distTasksConfig, exportTasksConfig);

module.exports = taskConfig;
