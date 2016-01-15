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
      template: '<div class="<%= dashedName %>-view"></div>',
      restrict: 'EA',
      scope: {
      },
      controller: <%= cameledName %>Ctrl,
      controllerAs: 'vm',
      bindToController: true,
      link: linkFunc,
    };
    return <%= cameledName %>;

    function linkFunc(/* scope, el, attr, ctrl */) {
    }
  }

  function <%= cameledName %>Ctrl(/* $scope */) {
    // var vm = this;

    activate();

    function activate() {
    }
  }
})();
