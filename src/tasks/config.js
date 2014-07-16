'use strict';

var lodash = require('lodash');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Load and merge the configuration files.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var commonTasksConfig = require('./config.common.js');
var prepareTasksConfig = require('./config.prepare.js');
var devTasksConfig = require('./config.dev.js');
var compileTasksConfig = require('./config.compile.js');
var distTasksConfig = require('./config.dist.js');
var exportTasksConfig = require('./export.js');

var taskConfig = lodash.merge({}, commonTasksConfig, prepareTasksConfig, devTasksConfig, compileTasksConfig, distTasksConfig, exportTasksConfig);

module.exports = taskConfig;
