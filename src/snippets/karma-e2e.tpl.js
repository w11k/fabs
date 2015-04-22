'use strict';

module.exports = function (karmaConfig) {
  karmaConfig.set({
    basePath: '<%= basePath %>',

    files: [
      <%= scripts.map(function(file) { return '\'' + file + '\'' }).join(',\n      ') %>
    ],
    frameworks: [
      'ng-scenario'
    ],
    plugins: [
      'karma-ng-scenario',
      'karma-phantomjs-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-opera-launcher',
      'karma-junit-reporter'
    ],

    proxies: {
      '/': 'http://localhost:<%= connect_e2e_port %>/'
    },

    reporters: [
      'progress'
    ],

    junitReporter: {
      outputFile: '<%= junit_results %>' + '/e2e-karma.xml'
    },

    port: <%= port %>,
    urlRoot: '/tests/e2e/',

    autoWatch: false,

    browsers: [
      <%= browsers.map(function(browser) { return '\'' + browser + '\'' }).join(',\n      ') %>
    ]
  });
};

