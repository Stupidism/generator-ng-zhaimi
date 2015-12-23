(function() {
  'use strict';
  /**
   * @ngdoc overview
   * @name <%= scriptAppName %>
   * @description
   * # <%= scriptAppName %>
   *
   * Main module of the application.
   */
  angular
    .module('<%= scriptAppName %>', [
      'ngAnimate',
      'ngCookies',
      'ngMessages',
      'ngSanitize',
      'ui.router',
      'zhaimi-auth',
      'ui.bootstrap',
      'ui.bootstrap.datetimepicker',
      'angular-confirm',
      'cgNotify',
      'ui.select',
      'ngFileUpload',
      'angularMoment',
      'NgSwitchery',
      'ui.indeterminate',
      'checklist-model',
      'uiSwitch',
      'restangular',
    ]);
})();
