'use strict';

var grunt = require('grunt');
var _ = require('lodash');
var configuration = require('./build.config.js');

module.exports = {
  getGruntConfig: function (pathToConfigFolder) {

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Load the build configuration.
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    grunt.verbose.writeln('used config folder: ' + pathToConfigFolder);
    configuration.setConfigFolder(pathToConfigFolder);

    grunt.verbose.writeln('reading fabs configuration');
    var buildConfig = configuration.getConfig();
    grunt.verbose.writeln('fabs configuration read');

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Change the build configuration according to command line options. A developer can use developer.config.js
     * to persist the options to not have to type them over and over again on the command line. Using/Merging the
     * developer.config.js can be disabled via --devConfig=false.
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    // Enable or disable loading mock files in browser too, in dev mode
    // check for undefined to not override the default
    if (grunt.option('mocks') !== undefined) {
      grunt.verbose.writeln('detected command line argument: --mocks=' + grunt.option('mocks'));
      buildConfig.build.mocks.loadInBrowser = !!grunt.option('mocks');
    }

    // Enable or disable running bower
    // check for undefined to not override the default
    if (grunt.option('bower') !== undefined) {
      grunt.verbose.writeln('detected command line argument: --bower=' + grunt.option('bower'));
      buildConfig.build.bower.runInDev = !!grunt.option('bower');
    }

    // Enable or disable running dist server
    // check for undefined to not override the default
    if (grunt.option('server') !== undefined) {
      grunt.verbose.writeln('detected command line argument: --server=' + grunt.option('server'));
      buildConfig.build.server.runInDist = !!grunt.option('server');
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Load the task configuration, the object Grunt uses to give each task its instructions and apply the build
     * configuration -> replace all variables like '<%= build.output.dir %>' within task configuration with the
     * value from build configuration. Then apply the resulting configuration.
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


    grunt.verbose.writeln('reading tasks configuration');
    var tasksConfig = require('./tasks/config.js');
    grunt.verbose.writeln('tasks configuration read');

    var gruntConfig = _.extend(tasksConfig, buildConfig);

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Load our composite and custom tasks. No need to do anything else than require the modules. They register the
     * tasks themselves.
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    grunt.verbose.writeln('registering tasks');
    require('./tasks/def.npm.js');
    require('./tasks/def.composite.js');
    require('./tasks/def.custom.js');
    grunt.verbose.writeln('tasks registered');

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Dump configuration to console (e.g. for debugging the build system)
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (grunt.option('dump')) {
      var asterisk = grunt.util.repeat(60, '* ');
      grunt.log.writeln(asterisk);
      grunt.log.writeln('Build configuration: ' + JSON.stringify(buildConfig, null, '  '));
      grunt.log.writeln(asterisk);
      grunt.log.writeln('Tasks configuration: ' + JSON.stringify(tasksConfig, null, '  '));
      grunt.log.writeln(asterisk);
    }

    return gruntConfig;
  }
};
