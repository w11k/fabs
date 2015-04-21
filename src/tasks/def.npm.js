'use strict';

var grunt = require('grunt');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Load all the grunt tasks provided by plugins. Plugins must be defined as devDependency in package.json
 * and installed with 'npm install'.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*
 * Grunt requires plugins to be installed relative to Gruntfile.js. (directly under node_modules).
 * But we want to install the plugins as dependencies of fabs instead of the project itself.
 * So we have to tell Grunt the relative path down to the node_modules folder of fabs.
 */
grunt.verbose.writeln('loading npm tasks');

grunt.loadNpmTasks('fabs/node_modules/grunt-contrib-clean');
grunt.loadNpmTasks('fabs/node_modules/grunt-contrib-copy');
grunt.loadNpmTasks('fabs/node_modules/grunt-contrib-htmlmin');
grunt.loadNpmTasks('fabs/node_modules/grunt-contrib-jshint');
grunt.loadNpmTasks('fabs/node_modules/grunt-contrib-compass');
grunt.loadNpmTasks('fabs/node_modules/grunt-contrib-concat');
grunt.loadNpmTasks('fabs/node_modules/grunt-contrib-cssmin');
grunt.loadNpmTasks('fabs/node_modules/grunt-contrib-watch');
grunt.loadNpmTasks('fabs/node_modules/grunt-contrib-uglify');
grunt.loadNpmTasks('fabs/node_modules/grunt-contrib-connect');
grunt.loadNpmTasks('fabs/node_modules/grunt-contrib-compress');
grunt.loadNpmTasks('fabs/node_modules/grunt-contrib-less');
grunt.loadNpmTasks('fabs/node_modules/grunt-connect-proxy');
grunt.loadNpmTasks('fabs/node_modules/grunt-karma');
grunt.loadNpmTasks('fabs/node_modules/grunt-ng-annotate');
grunt.loadNpmTasks('fabs/node_modules/grunt-minjson');
grunt.loadNpmTasks('fabs/node_modules/grunt-replace');
grunt.loadNpmTasks('fabs/node_modules/grunt-html2js');
grunt.loadNpmTasks('fabs/node_modules/grunt-shell');
grunt.loadNpmTasks('fabs/node_modules/grunt-bless');
grunt.loadNpmTasks('fabs/node_modules/grunt-bump');
grunt.loadNpmTasks('fabs/node_modules/grunt-conventional-changelog');
grunt.loadNpmTasks('fabs/node_modules/grunt-protractor-runner');

grunt.verbose.writeln('npm tasks loaded');
