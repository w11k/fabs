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
var root = 'fabs/node_modules/';

grunt.loadNpmTasks(root + 'grunt-contrib-clean');
grunt.loadNpmTasks(root + 'grunt-contrib-copy');
grunt.loadNpmTasks(root + 'grunt-contrib-htmlmin');
grunt.loadNpmTasks(root + 'grunt-contrib-jshint');
grunt.loadNpmTasks(root + 'grunt-contrib-compass');
grunt.loadNpmTasks(root + 'grunt-contrib-concat');
grunt.loadNpmTasks(root + 'grunt-contrib-cssmin');
grunt.loadNpmTasks(root + 'grunt-contrib-watch');
grunt.loadNpmTasks(root + 'grunt-contrib-uglify');
grunt.loadNpmTasks(root + 'grunt-contrib-connect');
grunt.loadNpmTasks(root + 'grunt-contrib-compress');
grunt.loadNpmTasks(root + 'grunt-contrib-less');
grunt.loadNpmTasks(root + 'grunt-connect-proxy');
grunt.loadNpmTasks(root + 'grunt-karma');
grunt.loadNpmTasks(root + 'grunt-ngmin');
grunt.loadNpmTasks(root + 'grunt-minjson');
grunt.loadNpmTasks(root + 'grunt-replace');
grunt.loadNpmTasks(root + 'grunt-html2js');
grunt.loadNpmTasks(root + 'grunt-shell');
grunt.loadNpmTasks(root + 'grunt-bump');
