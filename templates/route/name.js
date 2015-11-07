(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name <%= scriptAppName %>.controller:<%= classedName %>Ctrl
   * @description
   * # <%= classedName %>Ctrl
   * Controller of the <%= scriptAppName %>
   */
  angular
    .module('<%= scriptAppName %>')
    .controller('<%= classedName %>Ctrl', <%= classedName %>Ctrl);

  function <%= classedName %>Ctrl(notifyService, errorService) {
    var vm = this;

    activate();

    function activate() {
      vm.message = 'Hello';
    }
  }
})();
