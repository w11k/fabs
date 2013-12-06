'use strict';

var config = require('./../build.config.js').getConfig();
var pkg = require('./../utils/package.js');

var taskConfig = {
  compress: {
    project: {
      options: {
        archive: config.build.output.dir + '/' + pkg.name + '_project_v' + pkg.version + '.zip'
      },
      src: [
        // include all files
        '**',
        // include dot files of root folder
        '.*',
        '!**/.DS_STORE',
        '!.git',
        '!.idea',
        '!.sass-cache',
        '!*.iml',
        '!' + config.build.output.dir + '/**',
        '!node_modules/**',
        '!vendor/**'
      ]
    },
    build_system: {
      options: {
        archive: config.build.output.dir + '/' + pkg.name + '_build_system_v' + pkg.version + '.zip'
      },
      src: [
        'build-system/**/*',
        'Gruntfile.js',
        'package.json'
      ]
    }
  }
};

module.exports = taskConfig;
