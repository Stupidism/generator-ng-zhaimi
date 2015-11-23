'use strict';
var util = require('util');
var path = require('path');
var lodash = require('lodash');
var lodashInflection = require('lodash-inflection');
var s = require('underscore.string');
var yeoman = require('yeoman-generator');
var ngUtils = require('./util.js');
var chalk = require('chalk');

// extend lodash with underscore.string
lodash.mixin(s.exports());
lodash.mixin(lodashInflection);

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.lodash = lodash;

  try {
    this.appname = require(path.join(process.cwd(), 'bower.json')).name;
  } catch (e) {
    this.appname = path.basename(process.cwd());
  }
  this.appname = lodash.slugify(lodash.humanize(this.appname));
  this.scriptAppName = this.config.get('moduleName') || lodash.camelize(this.appname) + ngUtils.appName(this);
  this.basePath = this.config.get('basePath') || 'src';

  this.classedName = lodash.classify(this.name);
  this.cameledName = lodash.camelCase(this.classedName);
  this.dashedName = lodash.dasherize(this.cameledName);
  this.underscoredName = lodash.underscored(this.cameledName);

  this.hasFilter = function(filter) {
    return this.config.get('filters').indexOf(filter) !== -1;
  }.bind(this);

  // dynamic assertion statements
  this.expect = function() {
    return this.hasFilter('expect') ? 'expect(' : '';
  }.bind(this);
  this.to = function() {
    return this.hasFilter('expect') ? ').to' : '.should';
  }.bind(this);

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }

  this.sourceRoot(path.join(__dirname, '/templates'));
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.addScriptToIndex = function (script) {
  try {
    var appPath = this.env.options.appPath + '/';
    var fullPath = this.config.get('indexHtmlPath') || path.join(appPath, 'index.html');
    script = script.toLowerCase().replace(/\\/g, '/');
    if (lodash.startsWith(script, appPath)) {
      script = script.replace(appPath, '');
    }
    ngUtils.rewriteFile({
      file: fullPath,
      startbuild: '<!-- inject: js (ng-zhaimi) **/*.js -->',
      endbuild: '<!-- endInject -->',
      splicable: [
        '<script src="' + script + '.js"></script>'
      ]
    });
  } catch (e) {
    this.log.error(chalk.yellow(
      '\nUnable to find ' + fullPath + '. Reference to ' + script + '.js ' + 'not added.\n'
    ));
  }
};

Generator.prototype.addScssToMain = function (scss) {
  try {
    var appPath = this.env.options.appPath + '/';
    var fullPath = this.config.get('mainScssPath') || path.join(appPath, 'styles/main.scss');
    scss = scss.toLowerCase().replace(/\\/g, '/');
    if (lodash.startsWith(scss, appPath)) {
      scss = scss.replace(appPath, '');
    }
    ngUtils.rewriteFile({
      file: fullPath,
      startbuild: '// inject: {scss, sass} (ng-zhaimi) **/*.{scss, sass}',
      endbuild: '// endInject',
      splicable: [
        '@import \'' + scss + '\';'
      ]
    });
  } catch (e) {
    this.log.error(chalk.yellow(
      '\nUnable to find ' + fullPath + '. Reference to _' + scss + '.scss ' + 'not added.\n'
    ));
  }
};
