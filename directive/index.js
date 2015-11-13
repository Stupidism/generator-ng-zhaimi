'use strict';
var path = require('path');
var util = require('util');
var ngUtil = require('../util');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.prompting = function askFor() {
  var self = this;
  var done = this.async();
  var config =  this.config;

  var prompts = [{
    name: 'moduleName',
    message: 'What module name would you like to use?',
    default: self.scriptAppName + '.' + self.name,
    when: function() {return config.get('modulePrompt');}
  }, {
    name: 'dir',
    message: 'Where would you like to create this directive?',
    default: path.join(config.get('directiveDirectory'), self.underscoredName),
  }, {
    name: 'fileName',
    message: 'What file name would you like to use?',
    default: config.get('defaultFileName') || 'directive',
    when: function() {return config.get('fileNamePrompt');}
  }, {
    type:'confirm',
    name: 'complex',
    message: 'Does this directive need an external html file?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    self.scriptAppName = props.moduleName || self.scriptAppName;
    self.dir = props.dir;
    self.complex = props.complex;
    self.fileName = props.fileName;
    done();
  });
};

Generator.prototype.writing = function createFiles() {
  var configName = 'directiveSimpleTemplates';
  var templateDir = path.join(this.sourceRoot(), 'directiveSimple');
  if (this.complex) {
    configName = 'directiveComplexTemplates';
    templateDir = path.join(this.sourceRoot(), 'directiveComplex');
  }

  var basePath = this.config.get('basePath') || '';
  this.htmlUrl = ngUtil.relativeUrl(basePath, path.join(this.dir, this.fileName + '.html'));
  ngUtil.copyTemplates(this, 'directive', templateDir, configName);
  this.addScriptToIndex(path.join(this.dir, this.fileName || this.name));
  if (this.complex) {
    this.addScssToMain(path.join(this.dir, this.fileName || this.name));
  }
};
