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
        .state('main.<%= name %>', {
          url: '<%= route %>',
          templateUrl: '<%= htmlUrl %>',
          controller: '<%= classedName %>Ctrl',
          controllerAs: 'vm',
          data: {
            permission: '<%= lodash.underscored(fatherRoute).toUpperCase() %>.<%= fileName.toUpperCase() %>',
          },
        });
    });
})();
