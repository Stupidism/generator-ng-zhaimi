'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var NgZhaimiGenerator = yeoman.generators.Base.extend({

  initializing: function () {
    if (!this.options['skip-message']) {
      this.log(chalk.magenta('You\'re using the fantastic NgZhaimi generator.\n'));
      this.log(chalk.magenta('Initializing yo-rc.json configuration.\n'));
    }
  },

  configuring: function () {
    var config = {
      'routeDirectory': this.options.routeDirectory || 'app/',
      'directiveDirectory': this.options.directiveDirectory || 'app/directives/',
      'filterDirectory': this.options.filterDirectory || 'app/filters/',
      'serviceDirectory': this.options.serviceDirectory || 'app/services/',
      'basePath': this.options.basePath || 'app',
      'moduleName': this.options.moduleName || '',
      'modulePrompt': this.options.hasOwnProperty('modulePrompt') ?
        this.options.modulePrompt : true,
      'filters': this.options.filters || ['uirouter', 'jasmine'],
      'extensions': this.options.extensions || ['js', 'html', 'scss'],
      'directiveSimpleTemplates': this.options.directiveSimple || '',
      'directiveComplexTemplates': this.options.directiveComplex || '',
      'filterTemplates': this.options.filter || '',
      'serviceTemplates': this.options.service || '',
      'factoryTemplates': this.options.factory || '',
      'controllerTemplates': this.options.controller || '',
      'decoratorTemplates': this.options.decorator || '',
      'providerTemplates': this.options.provider || '',
      'routeTemplates': this.options.route || '',
      'modulePrompt': this.options.modulePrompt || false,
      'fileNamePrompt': this.options.fileNamePrompt || true
    };

    if (this.options.forceConfig) {
      this.config.set(config);
      this.config.forceSave();
    } else {
      this.config.defaults(config);
    }
  }
});

module.exports = NgZhaimiGenerator;
