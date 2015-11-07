(function() {
  'use strict';

  describe('Directive: <%= cameledName %>', <%= cameledName %>Test);

  function <%= cameledName %>Test() {

    // load the directive's module and view
    beforeEach(module('<%= scriptAppName %>'));
    beforeEach(module('<%= htmlUrl %>'));

    var element;
    var scope;

    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function($compile) {
      element = angular.element('<<%= lodash.dasherize(name) %>></<%= lodash.dasherize(name) %>>');
      element = $compile(element)(scope);
      scope.$apply();<% if (hasFilter('jasmine')) { %>
      expect(element.text()).toBe('this is the <%= cameledName %> directive');<% } if (hasFilter('mocha')) { %>
      <%= expect() %>element.text()<%= to() %>.equal('this is the <%= cameledName %> directive');<% } %>
    }));
  }
})();
