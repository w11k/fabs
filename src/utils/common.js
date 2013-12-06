'use strict';

var grunt = require('grunt');

module.exports = {
  includeIf: function (include, condition) {

    if (condition) {
      if (typeof include === 'function') {
        include = include();
      }

      if (!Array.isArray(include)) {
        include = [ include ];
      }

      return include;
    }
    else {
      return [];
    }
  },

  hasFiles: function (cwd, files) {
    var foundFiles = grunt.file.expand(
      { cwd: cwd },
      files
    );

    return foundFiles.length !== 0;
  },

  replaceExtension: function (from, to) {
    return function (file) {

      var replace = new RegExp('\\.' + from + '$');

      return file.replace(replace, '.' + to);
    };
  },

  addCwdToPattern: function (parent) {
    return function (file) {

      var prefix = '';

      if (file.indexOf('!') === 0) {
        prefix = '!';
        file = file.substring(1);
      }

      return prefix + parent + '/' + file;
    };
  },

  connectMiddleware: function (connect, options) {
    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

    var middlewares = [
      proxySnippet
    ];

    if (!Array.isArray(options.base)) {
      options.base = [ options.base ];
    }
    options.base.forEach(function (base) {
      // Serve static files.
      middlewares.push(connect.static(base));
    });

    var directory = options.directory || options.base[options.base.length - 1];
    middlewares.push(connect.directory(directory));

    return middlewares;
  },

  filterForJS: function (files) {
    return files.filter(function (file) {
      return file.match(/\.js$/);
    });
  },

  filterForJson: function (files) {
    return files.filter(function (file) {
      return file.match(/\.json$/);
    });
  },

  filterForCSS: function (files) {
    return files.filter(function (file) {
      return file.match(/\.css$/);
    });
  },

  escapeForRegExp: function (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }
};
