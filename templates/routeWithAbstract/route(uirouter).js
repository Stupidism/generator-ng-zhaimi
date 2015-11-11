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
          template: '<div ui-view></div>',
          abstract: true,
          data: {
            permissionGroup: '<%= underscoredName.toUpperCase() %>',
          },
        })
        .state('main.<%= name %>.<%= fileName %>', {
          url: '',
          templateUrl: '<%= htmlUrl %>',
          controller: '<%= classedName %>Ctrl',
          controllerAs: 'vm',
          data: {
            permission: '<%= underscoredName.toUpperCase() %>.<%= fileName.toUpperCase() %>',
          },
        });
    });
})();
