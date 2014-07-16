'use strict';

var grunt = require('grunt');
var config = require('./../build.config.js').getConfig();
var utils = require('./../utils/common.js');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Hook tasks
 *
 * Register some empty dummy tasks. This tasks can be overridden by the project to hook into fabs lifecycle.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

grunt.registerTask('hookPrepareStart', []);
grunt.registerTask('hookPrepareEnd', []);
grunt.registerTask('hookCompileStart', []);
grunt.registerTask('hookCompileEnd', []);
grunt.registerTask('hookCacheBustingStart', []);
grunt.registerTask('hookCacheBustingEnd', []);
grunt.registerTask('hookDevStart', []);
grunt.registerTask('hookDevEnd', []);
grunt.registerTask('hookDistStart', []);
grunt.registerTask('hookDistEnd', []);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * dev mode: build the app, start a web server, start karma and watch for changes.
 *
 * Watch is configured to run some tasks (jshint and karma tests) at the beginning, see watch:runOnce.
 * By running watch first and call the tasks via watch:runOnce we avoid grunt to fail on an error.
 * While in watch mode, only the watch cycle fails and grunt runs on, watching for other changes.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var devTask = [].concat(
  'updateConfig:dev_changeLessSassConfig',

  'hookDevStart',

  'prepare',

  utils.includeIf([
    'karmaConfig:prepare_spec',
    'karma:prepare_spec_watch'
  ], config.build.spec.runInPrepare),

  utils.includeIf([
    'indexHtml:dev_e2e',
    'karmaConfig:dev_e2e',
    'configureProxies:dev_e2e',
    'connect:dev_e2e',
    'karma:dev_e2e_watch'
  ], config.build.e2e.runInDev),

  'configureProxies:dev',
  'connect:dev',
  'watch',

  'hookDevEnd'
);

grunt.registerTask('dev', devTask);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * The 'prepare' task gets the app ready to run for development and testing.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var prepareTask = [].concat(
  'clean:prepare',

  'hookPrepareStart',

  utils.includeIf('shell:prepare_bower', config.build.bower.runInPrepare),

  /* html2js and translations2js have to run in prepare phase because there are dependencies in
   * the code referencing the generated angular modules
   * in prepare we create the module, but without content
   */
  'copy:prepare_app_templates',
  'copy:prepare_common_templates',
  'copy:prepare_app_templates2js',

  /**
   * not including the default language to js code may cause error (race condition, lookup translation before language
   * file is loaded, perhaps a bug in angular-translate). So don't move this 'optimization' to compile right now but
   * leave it here in prepare and test it again with a later version of angular-translate
   */
  'translations2js:prepare',

  utils.includeIf('less:prepare_app', config.build.less.enabled),
  utils.includeIf('less:prepare_common', config.build.less.enabled),
  utils.includeIf('compass:prepare_app', config.build.sass.enabled && utils.hasFiles('src/app', config.app.files.sass)),
  utils.includeIf('compass:prepare_common', config.build.sass.enabled && utils.hasFiles('src/common', config.common.files.sass)),
  'concat:prepare_css',
  utils.includeIf('bless:prepare', config.build.bless.enabled),
  'copy:prepare_app_assets',
  'copy:prepare_vendor_assets',
  'copy:prepare_app_js',
  'copy:prepare_app_translations',

  utils.includeIf('copy:prepare_app_js_mock', config.build.mocks.loadInBrowser || config.build.e2e.runInDev),
  utils.includeIf('copy:prepare_common_js_mock', config.build.mocks.loadInBrowser || config.build.e2e.runInDev),
  utils.includeIf('copy:prepare_vendor_js_mock', config.build.mocks.loadInBrowser || config.build.e2e.runInDev),

  'copy:prepare_common_js',
  'copy:prepare_vendor_js',
  'indexHtml:prepare',

  'hookPrepareEnd'
);

grunt.registerTask('prepare', prepareTask);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * The 'compile' task gets the app ready for deployment by concatenating and minifying all the code.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var compileTask = [].concat(
  'hookCompileStart',

  'copy:compile_css',
  'cssmin:compile',
  utils.includeIf('bless:compile', config.build.bless.enabled),

  'copy:compile_assets',

  'htmlmin:compile_templates',
  'copy:compile_templates',
  'html2js:compile_templates',

  'copy:compile_translations',
  'minjson:compile_translations',

  utils.includeIf('ngmin', config.build.ngmin.enabled),
  'concat:compile_js',
  'uglify:compile',

  'indexHtml:compile',
  'htmlmin:compile_index',

  'hookCacheBustingStart',

  'copy:compile_cacheBusting',
  'clean:compile_cacheBusting',
  'updateConfig:replace_compile_cacheBusting',
  'replace:compile_cacheBusting',

  'hookCacheBustingEnd',
  'hookCompileEnd'
);

grunt.registerTask('compile', compileTask);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * The 'dist' task prepares and compiles the app and then runs e2e tests against the compiled app.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// don't forget to run the tasks that are called by watch:runOnce in dev mode
var distTask = [].concat(
  'hookDistStart',

  utils.includeIf([
    'jshint'
  ], config.build.jshint.runInDist),
  'prepare',

  utils.includeIf([
    'karmaConfig:prepare_spec',
    'karma:prepare_spec'
  ], config.build.spec.runInPrepare && (utils.hasFiles('src/app', config.app.files.js_spec) || utils.hasFiles('src/common', config.common.files.js_spec))),

  'compile',

  utils.includeIf([
    'copy:dist_e2e',
    'indexHtml:dist_e2e',
    'htmlmin:dist_e2e',
    'updateConfig:replace_dist_e2e_cacheBusting',
    'replace:dist_e2e_cacheBusting',
    'karmaConfig:dist_e2e',
    'configureProxies:dist_e2e',
    'connect:dist_e2e',
    'karma:dist_e2e'
  ], config.build.e2e.runInDist),

  'compress:dist_app',

  utils.includeIf([
    'configureProxies:dist',
    'connect:dist'
  ], config.build.server.runInDist),

  'hookDistEnd'
);

grunt.registerTask('dist', distTask);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * The 'export' task create two zip files: one containing the hole projects without external dependencies (node module,
 * bower components etc.) and one with the build system only. This task is useful to export the boilerplate project.
 * The project zip file is to kick off a new project and the build system zip file is to update the build system of an
 * existing project.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

grunt.registerTask('export', [ 'compress:project', 'compress:build_system' ]);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * The default task is dist: prepare and compile the application.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

grunt.registerTask('default', [ 'dist' ]);
