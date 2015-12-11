var path = require('path');
var fs = require('fs');

var pathToFabs = path.resolve(__dirname, '..', '..');
var pathToFabsModules = path.resolve(pathToFabs, 'node_modules');
//var pathToProject = path.resolve(pathToFabs, '..', '..');
//var pathToProjectModules = path.resolve(pathToProject, 'node_modules');

module.exports = {
  isRelativeToFabs: function (plugin) {
    var isRelativeToFabs;

    try {
      isRelativeToFabs = fs.statSync(path.normalize(pathToFabsModules + path.sep + plugin)).isDirectory();
    }
    catch(e) {
      isRelativeToFabs = false;
    }

    return isRelativeToFabs;
  }
};
