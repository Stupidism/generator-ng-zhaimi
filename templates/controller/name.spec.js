(function() {
  'use strict';

  describe('Controller: <%= classedName %>Ctrl', <%= classedName %>CtrlTest);

  function <%= classedName %>CtrlTest() {

    // load the controller's module
    beforeEach(module('<%= scriptAppName %>'));

    var <%= classedName %>Ctrl;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      <%= classedName %>Ctrl = $controller('<%= classedName %>Ctrl', {
        $scope: scope
      });
    }));

    it('should ...', function() {<% if (hasFilter('jasmine')) { %>
      expect(!!<%= classedName %>Ctrl).toBe(true);<% } if (hasFilter('mocha')) { %>
      <%= expect() %>1<%= to() %>.equal(1);<% } %>
    });
  }
})();
