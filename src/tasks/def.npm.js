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

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-connect-proxy');
grunt.loadNpmTasks('grunt-karma');
grunt.loadNpmTasks('grunt-ng-annotate');
grunt.loadNpmTasks('grunt-minjson');
grunt.loadNpmTasks('grunt-replace');
grunt.loadNpmTasks('grunt-html2js');
grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-bless');
grunt.loadNpmTasks('grunt-bump');
grunt.loadNpmTasks('grunt-conventional-changelog');
grunt.loadNpmTasks('grunt-protractor-runner');

grunt.verbose.writeln('npm tasks loaded');
