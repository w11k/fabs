# fabs - Fabulous AngularJS Build System

A Grunt based build system for AngularJS applications

Features:
* Dev-Mode with Server, Proxy and LiveReload
* SASS 3.2 and LESS 1.5 support
* Spec and End-2-End Test
* Mock Data for Tests and Dev-Mode
* Running Bower to Install and Update Frontend Dependencies
* Project- and Per-Developer Configuration as well as Command Line Arguments
* Building Distribution with
    * Embedding Templates and Translations
    * Annotating AngularJS Dependencies (Transform to Array-Notation)
    * Code Minimization
    * Cache Busting
    * Running End-2-End Tests Against Build Application


## Getting Started

For a demo with project structure and fully configured build system, take a look at the companion project
https://github.com/w11k/fabs-boilerplate


## Installation

Add the `grunt` and `fabs` as dev dependencies to your package.json. Replace x with most recent or required version.

    "grunt": "0.4.4",
    "fabs": "x",


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

### Hook into fabs lifecycle

fabs defines some empty dummy tasks at the beginning and the end of each phase (prepare and compile) and mode (dev and dist). You can use these hooks to add additional custom tasks.

Provided hooks:

* hookPrepareStart
* hookPrepareEnd
* hookCompileStart
* hookCompileEnd
* hookCacheBustingStart
* hookCacheBustingEnd
* hookDevStart
* hookDevEnd
* hookDistStart
* hookDistEnd

In your Gruntfile.js you can override these tasks. In the example below a replace task is added to replace a placeholder in a template file with the version number from package.json.

    'use strict';
    
    var grunt = require('grunt');
    var fabs = require('fabs');
    var path = require('path');
    var lodash = require('lodash');
    var pkg = grunt.file.readJSON('./package.json');
    
    module.exports = function () {
      var configFolder = path.resolve('./build-config');
      var fabsConfig = fabs.getGruntConfig(configFolder);
    
      var additionalConfig = {
        replace: {
          version: {
            options: {
              prefix: '',
              patterns: [{
                match: '@@pkg.version',
                replacement: pkg.version,
                expression: false
              }]
            },
            files: [
              {
                expand: true,
                cwd: 'build-output/prepared',
                src: [ 'route/about/about.html' ],
                dest: 'build-output/prepared'
              }
            ]

          }
        }
      };
      
      var gruntConfig = lodash.merge(additionalConfig, fabsConfig);
    
      grunt.registerTask('hookPrepareEnd', ['replace:version']);
      grunt.initConfig(gruntConfig);
    };


### Other Tasks

In addition to `grunt dev` and `grunt dist` there are some other tasks meant to run stand-alone e.g. during release
preparation.

* `grunt bump`: bumps the semver version number (see https://github.com/vojtajina/grunt-bump)
* `grunt changelog`: generates a changelog (see https://github.com/btford/grunt-conventional-changelog)


## Roadmap

see milestones and issues at https://github.com/w11k/fabs/issues


## License

MIT - see LICENSE file
