'use strict';

var grunt = require('grunt');
var _ = require('lodash');
var config = require('./../build.config.js').getConfig();

var devPatterns = function () {
  var variablePatterns = [{
    match: '@@cacheBustingDir/',
    replacement: ''
  }];

  return variablePatterns;
};

var compilePatterns = function () {
  var filesToSearchFor = grunt.file.expand(
    {
      cwd: config.build.compile.outdir + '/' + config.build.compile.cacheBustingDir,
      filter: 'isFile'
    },
    // match all files, but no folders
    [ '**' ]
  );

  var filePatterns = _.flatten(filesToSearchFor.map(function (file) {
    var replacement = config.build.compile.cacheBustingDir + '/' + file;

    return [
      {
        match: '"' + file + '"',
        replacement: '"' + replacement + '"'
      },
      {
        match: '\'' + file + '\'',
        replacement: '\'' + replacement + '\''
      }
    ];
  }));

  var variablePatterns = [{
    match: '@@cacheBustingDir/',
    replacement: config.build.compile.cacheBustingDir + '/'
  }];

  var allPatterns = [].concat(filePatterns, variablePatterns);

  return allPatterns;
};

module.exports = {
  devPatterns: devPatterns,
  compilePatterns: compilePatterns
};
