'use strict';
var path = require('path');
var util = require('util');
var ngUtil = require('../util');
var ScriptBase = require('../script-base.js');
var lodash = require('lodash');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.prompting = function askFor() {
  var self = this;
  var name = this.name;
  var config = this.config;

  var done = this.async();
  var prompts = [{
    name: 'moduleName',
    message: 'What module name would you like to use?',
    default: self.scriptAppName + '.' + self.name,
    when: function() {return config.get('modulePrompt');}
  }, {
    name: 'dir',
    message: 'Where would you like to create this route?',
    default: path.join(config.get('routeDirectory'), self.slashedName || self.underscoredName),
  }, {
    name: 'fileName',
    message: 'What file name would you like to use?',
    default: config.get('defaultFileName') || self.lastDotName || self.underscoredName,
    when: function() {return config.get('fileNamePrompt');}
  }, {
    name: 'route',
    message: 'What will the url of your route be?',
    default: '/' + (self.lastDotName || name)
  }];

  this.prompt(prompts, function (props) {
    self.scriptAppName = props.moduleName || self.scriptAppName;
    self.route = props.route;
    self.fileName = props.fileName || self.name;
    self.dir = props.dir;
    done();
  });
};

Generator.prototype.writing = function createFiles() {
  var basePath = this.config.get('basePath') || '';
  var underscoredDir = lodash.underscored(this.dir);
  this.htmlUrl = ngUtil.relativeUrl(basePath, path.join(underscoredDir, this.fileName + '.html'));
  ngUtil.copyTemplates(this, 'route');
  this.addScriptToIndex(path.join(this.dir, this.fileName || this.name));
  this.addScriptToIndex(path.join(this.dir, 'route'));
  this.addScssToMain(path.join(this.dir, this.fileName || this.name));
};
