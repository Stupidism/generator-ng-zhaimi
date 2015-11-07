(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name <%= scriptAppName %>.decorator:<%= classedName %>Decorator
   * @description
   * # <%= classedName %>Decorator
   * Decorator of the <%= scriptAppName %>
   */
  angular
    .module('<%= scriptAppName %>')
    .config('<%= cameledName %>'Decorator);

    function '<%= cameledName %>'Decorator($provide) {
      $provide.decorator('<%= cameledName %>', function($delegate) {
        // decorate the $delegate
        return $delegate;
      });
    }
})();
