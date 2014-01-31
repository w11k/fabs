'use strict';

var grunt = require('grunt');
var path = require('path');
var utils = require('./../utils/common.js');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * The index.html template includes the stylesheet and javascript sources
 * based on dynamic names calculated in this Gruntfile. This task assembles
 * the list into variables for the template to use and then runs the
 * compilation.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var indexHtmlTask = function () {
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

  var jsFiles = utils.filterForJS(this.filesSrc).map(function (file) {
    return file.replace(basesRegExp, '');
  });
  var cssFiles = utils.filterForCSS(this.filesSrc).map(function (file) {
    return file.replace(basesRegExp, '');
  });


  grunt.file.copy('src/index.html', options.dir + '/index.html', {
    process: function (contents) {
      return grunt.template.process(contents, {
        data: {
          scripts: jsFiles,
          styles: cssFiles,
          angular_module: options.angular_module
        }
      });
    }
  });
};

grunt.registerMultiTask('indexHtml', 'Process index.html template', indexHtmlTask);

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
          port: options.port
        }
      });
    }
  });
};

grunt.registerMultiTask('karmaConfig', 'Process karma config templates', karmaConfigTask);

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
