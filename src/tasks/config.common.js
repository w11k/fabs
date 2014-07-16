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

  karmaConfig: {
    spec: {
      options: {
        template: path.normalize(__dirname + './../snippets/karma-spec.tpl.js'),
        out: config.build.output.dir + '/karma-prepare-spec.js',
        junitResults: config.build.output.dir + '/karma-prepare-spec-results.xml',
        browsers: config.build.spec.browsers,
        port: config.build.spec.karma.port
      },
      files: [
        {
          expand: true,
          nosort: true,
          cwd: 'vendor',
          src: config.vendor.files.js
        },
        {
          expand: true,
          nosort: true,
          cwd: 'vendor',
          src: config.vendor.files.js_mock
        },
        {
          expand: true,
          nosort: true,
          cwd: 'vendor',
          src: config.vendor.files.js_spec
        },
        {
          expand: true,
          nosort: true,
          cwd: '.',
          src: '<%= copy.prepare_app_templates2js.options.out %>'
        },
        {
          expand: true,
          nosort: true,
          cwd: '.',
          src: '<%= translations2js.prepare.options.out %>'
        },
        {
          expand: true,
          nosort: true,
          cwd: 'src/common',
          src: config.common.files.js
        },
        {
          expand: true,
          nosort: true,
          cwd: 'src/app',
          src: config.app.files.js
        },
        {
          expand: true,
          nosort: true,
          cwd: 'src/common',
          src: config.common.files.js_mock
        },
        {
          expand: true,
          nosort: true,
          cwd: 'src/app',
          src: config.app.files.js_mock
        },
        {
          expand: true,
          nosort: true,
          cwd: 'src/common',
          src: config.common.files.js_spec
        },
        {
          expand: true,
          nosort: true,
          cwd: 'src/app',
          src: config.app.files.js_spec
        }
      ]
    }
  },

  bump: {
    options: {
      files: bumpFiles,
      commit: true,
      commitMessage: 'chore(project): bump version to %VERSION%',
      commitFiles: bumpFiles,
      createTag: false,
      push: false
    }
  }

};

module.exports = commonTasksConfig;
