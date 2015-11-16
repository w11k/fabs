'use strict';

var config = require('./../build.config.js').getConfig();
var grunt = require('grunt');
var project = require('./../utils/project.js');
var path = require('path');

var bowerrc = project.getBowerRc();
var bower = project.getBowerJson();

var bumpFiles = [ 'package.json' ];
if (bower !== undefined && bower.version !== undefined) {
  bumpFiles.push(bowerrc.json);
}

var commonTasksConfig = {
  /**
   * Make 'package.json' accessible to templates like banner below.
   */
  pkg: project.getPackageJson(),

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
      paths: [ config.vendor.base ]
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
      outputStyle: 'expanded',

      // changed for dev mode via updateConfig:dev_changeLessSassConfig
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
      command:
        'bower install --offline'
    }
  },

  karmaConfig: {
    spec: {
      options: {
        template: path.normalize(__dirname + './../snippets/karma-spec.tpl.js'),
        out: config.build.output.dir + '/spec-karma.js',
        junitResults: config.build.output.dir + '/' + config.build.tests.resultDir,
        browsers: config.build.tests.spec.browsers,
        port: config.build.tests.spec.karma.port,
        basePath: path.resolve('.')
      },
      files: [
        {
          expand: true,
          nosort: true,
          cwd: config.vendor.base,
          src: config.vendor.files.js
        },
        {
          expand: true,
          nosort: true,
          cwd: config.vendor.base,
          src: config.vendor.files.js_mock
        },
        {
          expand: true,
          nosort: true,
          cwd: config.vendor.base,
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
          cwd: config.app.files.root,
          src: config.app.files.js
        },
        {
          expand: true,
          nosort: true,
          cwd: config.app.files.root,
          src: config.app.files.js_mock
        },
        {
          expand: true,
          nosort: true,
          cwd: config.app.files.root,
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
  },

  conventionalChangelog: {
    options: {
      changelogOpts: {
        preset: 'angular'
      },
      context: {
      },
      gitRawCommitsOpts: {
      },
      parserOpts: {
      },
      writerOpts: {
      }
    },
    release: {
      src: 'CHANGELOG.md'
    }
  }

};

module.exports = commonTasksConfig;
