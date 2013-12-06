'use strict';

var grunt = require('grunt');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Load all the grunt tasks provided by plugins. Plugins must be defined as devDependency in package.json
 * and installed with 'npm install'.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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
grunt.loadNpmTasks('grunt-ngmin');
grunt.loadNpmTasks('grunt-minjson');
grunt.loadNpmTasks('grunt-replace');
grunt.loadNpmTasks('grunt-html2js');
grunt.loadNpmTasks('grunt-shell');
