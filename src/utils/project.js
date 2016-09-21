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
  getBowerJsonPath: function () {
    var bowerRc = projectUtil.getBowerRc();

    if (bowerRc && typeof bowerRc.json === "string" && grunt.file.exists(bowerRc.json)) {
      return bowerRc.json;
    }
    else if (grunt.file.exists("./bower.json")) {
      return "./bower.json";
    }
    else {
      throw new Error("can't find bower.json");
    }
  },
  getBowerJson: function () {
    var bowerJsonPath = projectUtil.getBowerJsonPath();
    return grunt.file.readJSON(bowerJsonPath);
  },
  getPackageJson: function () {
    return grunt.file.readJSON('./package.json');
  }
};

module.exports = projectUtil;
