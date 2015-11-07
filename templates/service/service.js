(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name <%= scriptAppName %>.<%= cameledName %>
   * @description
   * # <%= cameledName %>
   * Service in the <%= scriptAppName %>.
   */
  angular
    .module('<%= scriptAppName %>')
    .service('<%= cameledName %>', <%= cameledName %>);

  function <%= cameledName %>(dataService) {
  };
})();
