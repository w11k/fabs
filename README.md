# fabs - Fabulous AngularJS Build System

A Grunt based build system for AngularJS applications

Features:
* Dev-mode with server, proxy and LiveReload
* Mock data for tests and dev-mode
* SASS 3.2 and LESS 1.5 support
* Spec and end-2-end tests
* Project- and per-developer configuration as well as command line arguments
* Building distribution with code minimization and cache busting as well as running tests against build app

## Installation

Add the `grunt` and `fabs` as dev dependencies to your package.json.

    "grunt": "0.4.2",
    "fabs": "~3.0.0",


Add something like the following lines to your `Gruntfile.js` to include fabs's grunt configuration. Of course you
are free to modify or extend the configuration object or merge it with other objects before registering it via
`grunt.initConfig`.

    var grunt = require('grunt');
    var fabs = require('fabs');
    var path = require('path');

    module.exports = function () {
      // get absolute path to folder holding config files
      var configFolder = path.resolve('./build-config');

      var config = fabs.getGruntConfig(configFolder);
      grunt.initConfig(config);
    };


Add following grunt plugins as dev dependencies to your projects package.json.
Grunt requires all plugins to be installed as dependency of your project (relative to your Gruntfile.js).
Unfortunately, transient dependencies don't work.

    "grunt-contrib-less": "0.8.1",
    "grunt-contrib-clean": "0.5.0",
    "grunt-contrib-copy": "0.4.1",
    "grunt-contrib-htmlmin": "0.1.3",
    "grunt-contrib-jshint": "0.6.4",
    "grunt-contrib-compass": "0.6.0",
    "grunt-contrib-cssmin": "0.4.2",
    "grunt-contrib-concat": "0.3.0",
    "grunt-contrib-watch": "0.5.3",
    "grunt-contrib-uglify": "0.2.4",
    "grunt-contrib-connect": "0.5.0",
    "grunt-contrib-compress": "0.5.1",
    "grunt-connect-proxy": "0.1.6",
    "grunt-ngmin": "0.0.3",
    "grunt-html2js": "0.1.8",
    "grunt-minjson": "0.1.1",
    "grunt-replace": "0.5.1",
    "grunt-shell": "0.5.0",
    "grunt-karma": "0.6.2",
    "karma-ng-scenario": "0.1.0",
    "karma-junit-reporter": "0.1"


## Usage

### Configuration

The build configuration used by fabs gets assembled by merging the internal 'system.config.js', a 'project.config.js'
(required) and a 'developer.config.js' (optional). 'system.config.js' specifies all the properties the build system
needs to run without errors. It tries to define some useful default but for all project you will need to adjust
something.

Copy `config-templates/project.config.tpl.js` to your build-config folder (folder used in Gruntfile.js as parameter for
fabs to load the configuration from) and adjust it to define your project configuration and override settings of
'system.config.js'.

The per developer configuration can be used to temporarily override some values (e.g. different proxy configuration to
talk to a server running on your computer). Also, you can use developer.config.js to enable or disable some features of
the build system during development like running 'bower install' on each start of `grunt dev` without adding
`--bower=false` as command line argument all the time.
Do not change the project configuration to adjust it to your personal needs during development.
Use `developer.config.js`!

For documentation of build configuration properties, see 'src/system.config.js'.

Pay attention: the configurations (system, project and developer) get merged and merging doesn't extend but
replace arrays!


### Development

In dev mode for easy debugging the application's javascript files are neither concatenated nor minified. CSS code
(form CSS files and generated from less or sass files) gets concatenated but not minified and will contains sass debug
info. We have to concatenate CSS code to one file placed next to index.html, otherwise relative paths to assets won't
work.

Run `grunt dev` to prepare the application, start the development server and watch for file changes. The application's
code is copied to and served from `build-output/prepared` folder by default.

Pay attention: Watching for file changes does not include watching for new files on some systems / node versions.
To ensure to collect all files kill and restart the dev server after creating a new file. Restart the dev server will
be necessary too after changing the build configuration!


### Build a distribution / deployable version

Run `grunt dist` to build a deployable version of the application, which is put to `build-output/compiled` folder by
default and gets zipped to `build-output/{{ Name and Version from package.json }}.zip`


## Roadmap

see milestones and issues at https://github.com/w11k/fabs/issues
