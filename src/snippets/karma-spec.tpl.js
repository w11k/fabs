'use strict';

module.exports = function (karmaConfig) {
  karmaConfig.set({
    basePath: '<%= basePath %>',

    files: [
      <%= scripts.map(function(file) { return '\'' + file + '\'' }).join(',\n      ') %>
    ],

    frameworks: [ 'jasmine' ],
    plugins: [
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-opera-launcher',
      'karma-ie-launcher'
    ],

    reporters: [
      'progress'
    ],

    junitReporter: {
      outputDir: '<%= junit_results %>',
      outputFile: 'spec-karma.xml'
    },

    port: <%= port %>,
    urlRoot: '/',
    autoWatch: false,

    browsers: [
      <%= browsers.map(function(browser) { return '\'' + browser + '\'' }).join(',\n      ') %>
    ]
  });
};
