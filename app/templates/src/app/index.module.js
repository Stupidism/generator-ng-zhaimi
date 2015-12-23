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
      'ui.router',
      'ui.bootstrap',
      'restangular',
      'toastr',
    ]);
})();
