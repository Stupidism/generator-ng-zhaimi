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
  var name = this.name;

  var done = this.async();
  var prompts = [{
    name: 'moduleName',
    message: 'What module name would you like to use?',
    default: self.scriptAppName + '.' + self.name,
    when: function() {return self.config.get('modulePrompt');}
  }, {
    name: 'dir',
    message: 'Where would you like to create this route?',
    default: self.config.get('routeDirectory')
  }, {
    name: 'fileName',
    message: 'What file name would you like to use?',
    default: name,
    when: function() {return self.config.get('fileNamePrompt');}
  }, {
    name: 'route',
    message: 'What will the url of your route be?',
    default: '/' + name
  }];

  this.prompt(prompts, function (props) {
    self.scriptAppName = props.moduleName || self.scriptAppName;
    self.route = props.route;
    self.fileName = props.fileName || self.name;
    self.dir = path.join(props.dir, self.name);
    done();
  });
};

Generator.prototype.writing = function createFiles() {
  var basePath = this.config.get('basePath') || '';
  this.htmlUrl = ngUtil.relativeUrl(basePath, path.join(this.dir, this.fileName + '.html'));
  ngUtil.copyTemplates(this, 'route');
};
