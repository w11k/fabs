'use strict';

exports.config = {
  rootElement: 'html',
  baseUrl: '<%= baseUrl %>',
  specs: [
    <%= scripts.map(function(file) { return '\'' + file + '\'' }).join(',\n    ') %>
  ],
  multiCapabilities: [
    <%= capabilities.join(',\n    ') %>
  ]
};
