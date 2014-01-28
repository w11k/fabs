'use strict';

var grunt = require('grunt');
var _ = require('lodash');
var path = require('path');

var pathToConfigFolder;

function loadAndMergeConfigs(configs) {
  var result = {};

  _.forEach(configs, function (configPath) {
    var configJson = require(configPath);
    result = _.merge(result, configJson);
  });

  return result;
}

function createBuildConfig(absPathToConfigFolder) {

  var loadDeveloperConfig;
  if (grunt.option('devConfig') !== undefined) {
    grunt.verbose.writeln('detected command line argument: --devConfig=' + grunt.option('devConfig'));
    loadDeveloperConfig = grunt.option('devConfig');
  }
  else {
    loadDeveloperConfig = true;
  }

  var configs = [];

  var systemConfig = './system.config.js';
  configs.push(systemConfig);

  var projectConfig = path.normalize(absPathToConfigFolder + path.sep + '/project.config.js');
  configs.push(projectConfig);

  if (loadDeveloperConfig) {
    // developer config don't have to exist because the build system defines a template only.
    // Perhaps the developer created a developer config based on this template, perhaps he doesn't.
    try {
      var developerConfig = path.normalize(absPathToConfigFolder + path.sep + 'developer.config.js');
      // try to load
      require(developerConfig);
      // if no exception
      configs.push(developerConfig);
    } catch (e) {
      grunt.log.writeln('No developer config found!');
    }
  }

  var buildConfig = loadAndMergeConfigs(configs);

  /* for easier usage within the task configuration
   * we concatenate the output dir and the build / compile dir to a new property outdir
   */
  buildConfig.build.prepare.outdir = buildConfig.build.output.dir + '/' + buildConfig.build.prepare.dir;
  buildConfig.build.compile.outdir = buildConfig.build.output.dir + '/' + buildConfig.build.compile.dir;
  buildConfig.build.dist.e2e.outdir = buildConfig.build.output.dir + '/' + buildConfig.build.dist.e2e.dir;
  buildConfig.build.dev.e2e.outdir = buildConfig.build.output.dir + '/' + buildConfig.build.dev.e2e.dir;

  return buildConfig;
}

var buildConfig;

module.exports = {
  setConfigFolder: function (configFolder) {
    pathToConfigFolder = configFolder;
    buildConfig = undefined;
  },
  getConfig: function () {
    if (buildConfig === undefined) {
      var configFolder;
      if (pathToConfigFolder) {
        configFolder = pathToConfigFolder;
      }
      else {
        configFolder = './build-config';
      }

      var absPathToConfigFolder = path.resolve('./../../../', configFolder);

      buildConfig = createBuildConfig(absPathToConfigFolder);
    }

    return buildConfig;
  }
};
