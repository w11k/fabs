'use strict';

var grunt = require('grunt');
var _ = require('lodash');
var configuration = require('./build.config.js');

module.exports = {
  createConfig: function (pathToConfigFolder) {
    configuration.setConfigFolder(pathToConfigFolder);

    return {
      getGruntConfig: function () {

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Load the build configuration.
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

        var fabsBuildConfig = configuration.getConfig();

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Load the task configuration, the object Grunt uses to give each task its instructions and apply the build
         * configuration -> replace all variables like '<%= build.output.dir %>' within task configuration with the
         * value from build configuration.
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

        grunt.verbose.writeln('reading tasks configuration');
        var tasksConfig = require('./tasks/config.js');
        grunt.verbose.writeln('tasks configuration read');

        var gruntConfig = _.extend(tasksConfig, fabsBuildConfig);

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Load composite and custom tasks. No need to do anything else than require the modules. They register the
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
          grunt.log.writeln('Build configuration: ' + JSON.stringify(fabsBuildConfig, null, '  '));
          grunt.log.writeln(asterisk);
          grunt.log.writeln('Tasks configuration: ' + JSON.stringify(tasksConfig, null, '  '));
          grunt.log.writeln(asterisk);
        }

        return gruntConfig;
      },
      getBuildConfig: function () {
        return configuration.getConfig();
      }
    };
  }
};
