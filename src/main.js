'use strict';

var grunt = require('grunt');
var _ = require('lodash');
var configuration = require('./build.config.js');

module.exports = {
  getGruntConfig: function (pathToConfigFolder) {

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Load the build configuration.
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    configuration.setConfigFolder(pathToConfigFolder);
    var buildConfig = configuration.getConfig();

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Load the task configuration, the object Grunt uses to give each task its instructions and apply the build
     * configuration -> replace all variables like '<%= build.output.dir %>' within task configuration with the
     * value from build configuration. Then apply the resulting configuration.
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    var tasksConfig = require('./tasks/config.js');

    var gruntConfig = _.extend(tasksConfig, buildConfig);

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Load composite and custom tasks. No need to do anything else than require the modules. They register the
     * tasks themselves.
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    require('./tasks/def.npm.js');
    require('./tasks/def.composite.js');
    require('./tasks/def.custom.js');

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
