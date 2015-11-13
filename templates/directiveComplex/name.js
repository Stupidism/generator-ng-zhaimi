(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name <%= scriptAppName %>.directive:<%= cameledName %>
   * @description
   * # <%= cameledName %>
   */

  angular.module('<%= scriptAppName %>')
    .directive('<%= cameledName %>', <%= cameledName %>);

  function <%= cameledName %>() {
    var <%= cameledName %> = {
      templateUrl: '<%= htmlUrl %>',
      restrict: 'EA',
      link: function(scope, element, attrs) {
      }
    };
    return <%= cameledName %>;
  }
})();
