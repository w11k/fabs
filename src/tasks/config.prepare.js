'use strict';

var grunt = require('grunt');
var config = require('./../build.config.js').getConfig();
var utils = require('./../utils/common.js');
var path = require('path');
var project = require('./../utils/project.js');
var pkg = project.getPackageJson();

var paths = {
  preprocess: {
    prepare_app_sass: {
      out: config.build.prepare.outdir + '/scss/app'
    }
  }
};

var prepareTasksConfig = {

  jshint: {
    src: {
      options: {
        jshintrc: true
      },
      files: [{
        expand: true,
        cwd: config.app.files.root,
        src: config.app.files.js
      }]
    },
    mock: {
      options: {
        jshintrc: true
      },
      files: [{
        expand: true,
        cwd: config.app.files.root,
        src: config.app.files.js_mock
      }]
    },
    spec: {
      options: {
        jshintrc: true
      },
      files: [{
        expand: true,
        cwd: config.app.files.root,
        src: config.app.files.js_spec
      }]
    },
    e2e: {
      options: {
        jshintrc: true
      },
      files: [{
        expand: true,
        cwd: config.app.files.root,
        src: config.app.files.js_e2e
      }]
    }
  },

  clean: {
    /**
     * Empty the output folder, but do not delete it to get a stable directory structure under project root.
     * Avoids directory tree flicker.
     */
    prepare: config.build.output.dir + '/*'
  },

  copy: {
    prepare_app_templates2js: {
      options: {
        out: config.build.prepare.outdir + '/js/templates.js',
        processContent: function (content) {
          return grunt.template.process(content, { data: {
            module: config.app.angular_module.templates
          }});
        }
      },
      files: [{
        src: path.normalize(__dirname + './../snippets/emptyAngularModule.tpl.js'),
        dest: '<%= copy.prepare_app_templates2js.options.out %>'
      }]
    },
    prepare_app_translations: {
      options: {
        out: config.build.prepare.outdir
      },
      files: [
        {
          expand: true,
          cwd: config.app.files.root,
          src: config.app.files.translations,
          dest: '<%= copy.prepare_app_translations.options.out %>'
        }
      ]
    },
    prepare_app_assets: {
      files: [
        {
          expand: true,
          cwd: 'assets',
          src: [ '**' ],
          dest: config.build.prepare.outdir + '/assets/'
        }
      ]
    },
    prepare_vendor_assets: {
      files: [
        {
          expand: true,
          cwd: config.vendor.base,
          src: config.vendor.files.assets,
          dest: config.build.prepare.outdir + '/assets/'
        }
      ]
    },
    prepare_vendor_js: {
      options: {
        out: config.build.prepare.outdir + '/js/vendor'
      },
      files: [{
        expand: true,
        cwd: config.vendor.base,
        src: config.vendor.files.js,
        dest: '<%= copy.prepare_vendor_js.options.out %>'
      }]
    },
    prepare_app_js_mock: {
      options: {
        out: config.build.prepare.outdir + '/js/app_mock'
      },
      files: [{
        expand: true,
        cwd: config.app.files.root,
        src: config.app.files.js_mock,
        dest: '<%= copy.prepare_app_js_mock.options.out %>'
      }]
    },
    prepare_vendor_js_mock: {
      options: {
        out: config.build.prepare.outdir + '/js/vendor_mock'
      },
      files: [{
        expand: true,
        cwd: config.vendor.base,
        src: config.vendor.files.js_mock,
        dest: '<%= copy.prepare_vendor_js_mock.options.out %>'
      }]
    }
  },

  less: {
    prepare_app: {
      options: {
        out: config.build.prepare.outdir + '/less/app',
        paths: ['<%= preprocess.prepare_app_sass.options.out %>', config.vendor.base]
      },
      files: [
        {
          expand: true,
          cwd: '<%= preprocess.prepare_app_less.options.out %>',
          src: config.app.files.less,
          dest: '<%= less.prepare_app.options.out %>',
          ext: '.css'
        }
      ]
    }
  },

  compass: {
    prepare_app: {
      options: {
        // files
        sassDir: '<%= preprocess.prepare_app_sass.options.out %>',
        specify: grunt.file.expand(
          { cwd: config.app.files.root },
          config.app.files.sass
        ).map(function (file) {
            return paths.preprocess.prepare_app_sass.out + '/' + file;
          }
        ),
        cssDir: config.build.prepare.outdir + '/sass/app'
      }
    }
  },

  concat: {
    prepare_css: {
      options: {
        outRelative: 'main.css',
        out: config.build.prepare.outdir + '/<%= concat.prepare_css.options.outRelative %>'
      },
      files: [{
        src: (function () {
          return [].concat(
            config.vendor.files.css
              .map(utils.addCwdToPattern(config.vendor.base)),
            config.app.files.css
              .map(utils.addCwdToPattern('<%= preprocess.prepare_app_css.options.out %>')),
            config.app.files.less
              .map(utils.addCwdToPattern('<%= less.prepare_app.options.out %>'))
              .map(utils.replaceExtension('less', 'css')),
            config.app.files.sass
              .map(utils.addCwdToPattern('<%= compass.prepare_app.options.cssDir %>'))
              .map(utils.replaceExtension('scss', 'css'))
          );
        })(),
        dest: '<%= concat.prepare_css.options.out %>'

      }]
    }
  },

  bless: {
    prepare: {
      files: [{
        src: '<%= concat.prepare_css.options.out %>',
        dest: config.build.prepare.outdir + '/' + config.build.bless.prefix + '<%= concat.prepare_css.options.outRelative %>'
      }]
    }
  },

  preprocess: {
    options: {
      context: config.build.preprocess.context
    },
    prepare_app_js: {
      options: {
        out: config.build.prepare.outdir + '/js/app'
      },
      expand: true,
      cwd: config.app.files.root,
      src: config.app.files.js,
      dest: '<%= preprocess.prepare_app_js.options.out %>'
    },
    prepare_app_css: {
      options: {
        out: config.build.prepare.outdir + '/css/app'
      },
      expand: true,
      cwd: config.app.files.root,
      src: config.app.files.css,
      dest: '<%= preprocess.prepare_app_css.options.out %>'
    },
    prepare_app_sass: {
      options: {
        out: paths.preprocess.prepare_app_sass.out
      },
      expand: true,
      cwd: config.app.files.root,
      src: '**/*.scss',
      dest: '<%= preprocess.prepare_app_sass.options.out %>'
    },
    prepare_app_less: {
      options: {
        out: config.build.prepare.outdir + '/less/app'
      },
      expand: true,
      cwd: config.app.files.root,
      src: '**/*.less',
      dest: '<%= preprocess.prepare_app_less.options.out %>'
    },
    prepare_app_templates: {
      options: {
        out: config.build.prepare.outdir
      },
      expand: true,
      cwd: config.app.files.root,
      src: config.app.files.templates,
      dest: '<%= preprocess.prepare_app_templates.options.out %>'
    },
  },

  processHtml: {
    /**
     * During development, we don't want to have wait for compilation,
     * concatenation, minification, etc. So to avoid these steps, we simply
     * add all script files directly to the html file.
     */
    prepare: {
      options: {
        base: [
          config.build.prepare.outdir
        ],
        blessedPrefix: config.build.bless.prefix,
        angular_module: (function () {
          if (config.build.mocks.loadInBrowser) {
            return config.app.angular_module.withMocks;
          }
          else {
            return config.app.angular_module.regular;
          }
        })()
      },
      javascript: (function () {
        return [].concat(
          {
            expand: true,
            nosort: true,
            src: config.vendor.files.js.map(utils.addCwdToPattern('<%= copy.prepare_vendor_js.options.out %>'))
          },
          {
            expand: true,
            nosort: true,
            src: config.app.files.js.map(utils.addCwdToPattern('<%= preprocess.prepare_app_js.options.out %>'))
          },
          {
            src: '<%= translations2js.prepare.options.out %>'
          },
          {
            src: '<%= copy.prepare_app_templates2js.options.out %>'
          },
          utils.includeIf([
            {
              expand: true,
              nosort: true,
              src: config.vendor.files.js_mock.map(utils.addCwdToPattern('<%= copy.prepare_vendor_js_mock.options.out %>'))
            },
            {
              expand: true,
              nosort: true,
              src: config.app.files.js_mock.map(utils.addCwdToPattern('<%= copy.prepare_app_js_mock.options.out %>'))
            }
          ], config.build.mocks.loadInBrowser)
        );
      })(),
      css: [{
        src: '<%= concat.prepare_css.options.out %>'
      }],
      files: [{
        expand: true,
        cwd: config.app.files.root,
        src: config.app.files.html,
        dest: config.build.prepare.outdir
      }]
    }
  },

  translations2js: {
    prepare: {
      options: {
        module: config.app.angular_module.translations,
        template: path.normalize(__dirname + './../snippets/translations.tpl.js'),
        out: config.build.prepare.outdir + '/js/translations.js'
      },
      files: [{
        expand: true,
        cwd: config.app.files.root,
        src: config.app.files.translations2js
      }]
    }
  }

};

module.exports = prepareTasksConfig;
