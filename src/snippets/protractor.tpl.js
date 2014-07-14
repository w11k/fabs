'use strict';

exports.config = {
  rootElement: 'html',
  specs: [
    <%= scripts.map(function(file) { return '\'' + file + '\'' }).join(',\n      ') %>
  ],
  multiCapabilities: [
    <% browsers.forEach( function ( browser ) { %>{ browserName: <%= browser %> }<% }); %>
  ]
};
