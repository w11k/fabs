'use strict';

var grunt = require('grunt');
var path = require('path');
var utils = require('./../utils/common.js');
var _ = require('lodash');

grunt.verbose.writeln('registering custom tasks');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * The index.html template includes the stylesheet and javascript sources
 * based on dynamic names calculated in this Gruntfile. This task assembles
 * the list into variables for the template to use and then runs the
 * compilation.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var processHtmlTask = function () {
  var options = this.options({});

  var bases = options.base;
  if (Array.isArray(bases) === false) {
    bases = [ bases ];
  }

  var basesEscaped = bases.map(function (base) {
    return utils.escapeForRegExp(grunt.template.process(base));
  });

  var basesJoined = basesEscaped.join('|');
  var basesRegExp = new RegExp('^(' + basesJoined + ')\/', 'g');

  var jsFilesWithPath = _.flatten(this.data.javascript.map(function (jsFiles) {
    return grunt.file.expand(jsFiles, jsFiles.src);
  }));

  var jsFiles = jsFilesWithPath.map(function (file) {
    return file.replace(basesRegExp, '');
  });

  var cssFilesWithPath = _.flatten(this.data.css.map(function (jsFiles) {
    return grunt.file.expand(jsFiles, jsFiles.src);
  }));

  var cssFiles = cssFilesWithPath.map(function (file) {
    return file.replace(basesRegExp, '');
  });

  var blessedCssFiles = cssFilesWithPath.map(function (file) {
    var fileDir = path.dirname(file);
    var fileName = path.basename(file, '.css');

    var blessedFiles = grunt.file.expand(
      {
        nosort: true
      },
      [
        fileDir + '/' + options.blessedPrefix + fileName + '.css',
        fileDir + '/' + options.blessedPrefix + fileName + '-blessed?.css',
        fileDir + '/' + options.blessedPrefix + fileName + '-blessed??.css'
      ]
    ).reverse();

    return blessedFiles.map(function (file) {
      return path.normalize(file).replace(basesRegExp, '');
    });
  });

  this.files.forEach(function (file) {
    if (file.src.length > 1) {
      grunt.fail.warn('more than one source file to copy to destination');
    }

    grunt.file.copy(file.src[0], file.dest, {
      process: function (contents) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            blessedStyles: blessedCssFiles,
            angular_module: options.angular_module
          }
        });
      }
    });
  });
};

grunt.registerMultiTask('processHtml', 'Process html pages (not templates but entry pages)', processHtmlTask);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * translations2js reads the specified translations (files property), put them into an angular module (options.module),
 * register them to the translationProvider of angular-translate and writes all that to the javascript file
 * (options.out). options.template specifies which template to process.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var translations2jsTask = function () {

  var jsonFiles = utils.filterForJson(this.filesSrc);
  grunt.verbose.writeln('Include languages: ' + JSON.stringify(jsonFiles, null, '  '));

  var options = this.options({});

  var languages = jsonFiles.map(function (jsonFile) {
    var locale = path.basename(jsonFile, '.json');
    var data = grunt.file.readJSON(jsonFile);

    var language = {
      locale: locale,
      data: data
    };

    return language;
  });

  grunt.file.copy(options.template, options.out, {
    process: function (contents) {
      return grunt.template.process(contents, {
        data: {
          module: options.module,
          languages: languages
        }
      });
    }
  });
};

grunt.registerMultiTask('translations2js', 'Includes translations into JS code', translations2jsTask);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * In order to avoid having to specify manually the files needed for karma to
 * run, we use grunt to manage the list for us. The `snippets/karma-*` files are
 * compiled as grunt templates.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var karmaConfigTask = function () {
  var jsFiles = utils.filterForJS(this.filesSrc);

  var options = this.options({});

  grunt.file.copy(options.template, options.out, {
    process: function (contents) {
      return grunt.template.process(contents, {
        data: {
          scripts: jsFiles,
          junit_results: options.junitResults,
          connect_e2e_port: options.connectPort,
          browsers: options.browsers,
          port: options.port,
          basePath: options.basePath
        }
      });
    }
  });
};

grunt.registerMultiTask('karmaConfig', 'Process karma config templates', karmaConfigTask);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * In order to avoid having to specify manually the files needed for protractor to
 * run, we use grunt to manage the list for us. The `snippets/protractor-*` files are
 * compiled as grunt templates.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var protractorConfigTask = function () {
  var jsFiles = utils.filterForJS(this.filesSrc).map(utils.addCwdToPattern('..'));

  var options = this.options({});

  var capabilities = options.browsers.map(function (browser) { return { browserName: browser.toLowerCase() }; });

  var phantomJsCapabilities = capabilities.filter(function (capability) { return capability.browserName == 'phantomjs'; });
  phantomJsCapabilities.forEach(function (capability) {
    capability['phantomjs.binary.path'] = './node_modules/phantomjs/bin/phantomjs';
  });

  var capabilitiesAsStrings = capabilities.map(function (capability) { return JSON.stringify(capability); });

  grunt.file.copy(options.template, options.out, {
    process: function (contents) {
      return grunt.template.process(contents, {
        data: {
          scripts: jsFiles,
          capabilities: capabilitiesAsStrings,
          baseUrl: options.url
        }
      });
    }
  });
};

grunt.registerMultiTask('protractorConfig', 'Process Protractor config templates', protractorConfigTask);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * We need to calculate a lot of configuration lazy. For most use cases grunt's templating is sufficient. But for
 * some use cases we need to call a function lazy, not on loading the configuration and that function returns complex
 * data, not a string. The 'update config' task helps us to modify the grunt configuration declarative.
 *
 * Usage:
 *
 * updateConfig: {
 *   target: {
 *     update: {
 *       "task.target.outerProperty.innerProperty": callback to get the value to update the config with
 *     }
 *   }
 * }
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var updateConfigTask = function () {
  var update = this.data.update;

  for (var key in update) {
    var value = update[key];

    if (typeof value === 'function') {
      value = value();
    }

    grunt.config.set(key, value);
  }

};

grunt.registerMultiTask('updateConfig', 'updates the grunt config dynamically', updateConfigTask);

grunt.verbose.writeln('custom tasks registered');
