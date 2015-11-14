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
      indexHtmlPath: this.options.indexHtmlPath || 'src/index.html',
      mainScssPath: this.options.mainScssPath || 'src/app/main.scss',
      dataServicePath: this.options.dataServicePath || 'src/common/services/data_service.js'
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
