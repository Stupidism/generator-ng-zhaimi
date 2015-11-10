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
  var config = this.config;
  var prompts = [{
    name: 'moduleName',
    message: 'What module name would you like to use?',
    default: self.scriptAppName + '.' + self.name,
    when: function() {return config.get('modulePrompt');}
  }, {
    name: 'dir',
    message: 'Where would you like to create this filter?',
    default: path.join(config.get('filterDirectory'), self.underscoredName),
  }];

  this.prompt(prompts, function (props) {
    self.scriptAppName = props.moduleName || self.scriptAppName;
    self.dir = props.dir;
    done();
  });
};

Generator.prototype.writing = function createFiles() {
  ngUtil.copyTemplates(this, 'filter');
  this.addScriptToIndex(path.join(this.dir, this.fileName || this.name));
};
