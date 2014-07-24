'use strict';

var grunt = require('grunt');

var projectUtil = {
  getBowerRc: function () {
    var defaultBowerRc = {
      'json': 'bower.json',
      'directory': 'bower_components'
    };

    var bowerRc;
    if (grunt.file.exists('./.bowerrc')) {
      bowerRc = grunt.file.readJSON('./.bowerrc');
    }
    else {
      bowerRc = defaultBowerRc;
    }

    return bowerRc;

  },
  getBowerJson: function () {
    var bowerRc = projectUtil.getBowerRc();

    var bower;
    if (grunt.file.exists(bowerRc.json)) {
      bower = grunt.file.readJSON(bowerRc.json);
    }
    else {
      bower = undefined;
    }

    return bower;
  },
  getPackageJson: function () {
    return grunt.file.readJSON('./package.json');
  }
};

module.exports = projectUtil;
