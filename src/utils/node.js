var path = require('path');
var process = require('process');
var fs = require('fs');
var grunt = require('grunt');

var pathToFabs = path.resolve(__dirname, '..', '..');
var pathToFabsModules = path.resolve(pathToFabs, 'node_modules');

function pathToModule(start, moduleName) {
  var localInstallationPath = path.normalize(start + path.sep + 'node_modules' + path.sep + moduleName);

  var localInstallationFound;
  try {
    localInstallationFound = fs.statSync(localInstallationPath).isDirectory();
  }
  catch(e) {
    localInstallationFound = false;
  }

  if (localInstallationFound) {
    return localInstallationPath;
  }

  var projectInstallationPath = path.resolve(process.cwd(), 'node_modules' + path.sep + moduleName);
  var projectInstallationFound;
  try {
    projectInstallationFound = fs.statSync(projectInstallationPath).isDirectory();
  }
  catch(e) {
    projectInstallationFound = false;
  }

  if (projectInstallationFound) {
    return projectInstallationPath;
  }

  throw new Error('Module ' + moduleName + ' not found!');
}


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
  },
  getPathToModule: function (dependencyPath) {
    var module = dependencyPath.pop();

    var start = dependencyPath.map(function (module) {
      return 'node_modules' + path.sep + module;
    }).join(path.sep);

    return pathToModule(path.resolve(start), module);
  }
};
