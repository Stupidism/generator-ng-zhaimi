(function() {
  'use strict';

  /**
   * @ngdoc filter
   * @name <%= scriptAppName %>.filter:<%= cameledName %>
   * @description
   * # <%= cameledName %>
   */

  angular.module('<%= scriptAppName %>')
    .filter('<%= cameledName %>', <%= cameledName %>);

  function <%= cameledName %>() {

    return <%= cameledName %>Filter;

    function <%= cameledName %>Filter(input) {
      return '<%= cameledName %> filter: ' + input;
    }
  }
})();
