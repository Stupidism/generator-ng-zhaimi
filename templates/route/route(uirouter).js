(function() {
  'use strict';

  /**
   * @ngdoc overview - routes
   * @name frankyRoutes
   * @description
   * # frankyApp
   *
   * Config the routes of the application.
   */
  angular.module('<%= scriptAppName %>')
    .config(function($stateProvider) {
      $stateProvider
        .state('<%= name %>', {
          url: '<%= route %>',
          templateUrl: '<%= htmlUrl %>',
          controller: '<%= classedName %>Ctrl',
          controllerAs: 'vm',
        });
    });
})();
