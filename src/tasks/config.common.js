'use strict';

var config = require('./../build.config.js').getConfig();
var grunt = require('grunt');
var pkg = require('./../utils/package.js');
var path = require('path');

var bowerrc = grunt.file.exists('./.bowerrc') ? grunt.file.readJSON('./.bowerrc') : { 'json': 'bower.json' };
var bower;
if (grunt.file.exists(bowerrc.json)) {
  bower = grunt.file.readJSON(bowerrc.json);
}

var bumpFiles = [ 'package.json' ];
if (bower !== undefined && bower.version !== undefined) {
  bumpFiles.push(bowerrc.json);
}

var commonTasksConfig = {
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

  bless: {
    options: {
      imports: false,
      cacheBuster: false
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
  },

  shell: {
    bower: {
      command: [
        'bower install',
        'bower update -q'
      ].join(' && ')
    }
  },

  bump: {
    options: {
      files: bumpFiles,
      commit: true,
      commitMessage: 'bumps version to %VERSION%',
      commitFiles: ['-a'],
      createTag: false,
      push: false
    }
  }

};

module.exports = commonTasksConfig;
