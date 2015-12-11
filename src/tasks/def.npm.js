'use strict';

var grunt = require('grunt');
var nodeUtils = require('../utils/node');

/*
 * Grunt requires plugins to be installed relative to Gruntfile.js. (directly under node_modules).
 * But we want to install the plugins as dependencies of fabs instead of the project itself.
 * So we have to tell Grunt the relative path down to the node_modules folder of fabs.
 */
grunt.verbose.writeln('loading npm tasks');

var plugins = [
  'grunt-contrib-clean',
  'grunt-contrib-copy',
  'grunt-contrib-htmlmin',
  'grunt-contrib-jshint',
  'grunt-contrib-compass',
  'grunt-contrib-concat',
  'grunt-contrib-cssmin',
  'grunt-contrib-watch',
  'grunt-contrib-uglify',
  'grunt-contrib-connect',
  'grunt-contrib-compress',
  'grunt-contrib-less',
  'grunt-preprocess',
  'grunt-connect-proxy',
  'grunt-karma',
  'grunt-ng-annotate',
  'grunt-minjson',
  'grunt-replace',
  'grunt-html2js',
  'grunt-shell',
  'grunt-bless',
  'grunt-bump',
  'grunt-conventional-changelog',
  'grunt-protractor-runner'
];



plugins.forEach(function (plugin) {
  if (nodeUtils.isRelativeToFabs(plugin)) {
    grunt.loadNpmTasks('fabs/node_modules/' + plugin);
  }
  else {
    grunt.loadNpmTasks(plugin);
  }
});

grunt.verbose.writeln('npm tasks loaded');
