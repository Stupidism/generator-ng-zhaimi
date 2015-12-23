'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var ngUtils = require('../util');
var lodash = require('lodash');
var s = require('underscore.string');
lodash.mixin(s.exports());

var NgZhaimiGenerator = yeoman.generators.Base.extend({
  configuring: function () {
    var config = {
      routeDirectory: this.options.routeDirectory || 'src/app/',
      directiveDirectory: this.options.directiveDirectory || 'src/common/directives/',
      filterDirectory: this.options.filterDirectory || 'src/common/filters/',
      serviceDirectory: this.options.serviceDirectory || 'src/common/services/',
      basePath: this.options.basePath || 'src',
      appPath: this.options.appPath || 'src/app',
      commonPath: this.options.commonPath || 'src/common/',
      assetsPath: this.options.assetsPath || 'src/assets/',
      moduleName: this.options.moduleName || '',
      modulePrompt: this.options.hasOwnProperty('modulePrompt') ?
        this.options.modulePrompt : true,
      fileNamePrompt: this.options.hasOwnProperty('fileNamePrompt') ?
        this.options.fileNamePrompt : true,
      filters: this.options.filters || ['uirouter', 'jasmine'],
      extensions: this.options.extensions || ['js', 'html', 'scss'],
      directiveSimpleTemplates: this.options.directiveSimple || '',
      directiveComplexTemplates: this.options.directiveComplex || '',
      filterTemplates: this.options.filter || '',
      serviceTemplates: this.options.service || '',
      factoryTemplates: this.options.factory || '',
      controllerTemplates: this.options.controller || '',
      decoratorTemplates: this.options.decorator || '',
      providerTemplates: this.options.provider || '',
      routeTemplates: this.options.route || '',
    };

    if (this.options.forceConfig) {
      this.config.set(config);
      this.config.forceSave();
    } else {
      this.config.defaults(config);
    }

    this.scriptAppName = this.config.get('moduleName') || lodash.camelize(this.appname) + ngUtils.appName(this);
  },

  initializing: function () {
    this.composeWith('gulp-angular:app', { options: {
      rjs: true
    }});
  },

  writing: function() {
    this.lodash = lodash;
    ngUtils.copyTemplates(this, 'src', this.sourceRoot());
  }
});

module.exports = NgZhaimiGenerator;
