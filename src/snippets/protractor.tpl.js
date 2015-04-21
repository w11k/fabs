'use strict';

exports.config = {
  rootElement: 'html',
  baseUrl: '<%= baseUrl %>',
  framework: "jasmine2",
  onPrepare: function() {
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: '<%= junitResults %>',
      filePrefix: 'e2e-protractor'
    }));
  },
  specs: [
    <%= scripts.map(function(file) { return '\'' + file + '\'' }).join(',\n    ') %>
  ],
  multiCapabilities: [
    <%= capabilities.join(',\n    ') %>
  ]
};
