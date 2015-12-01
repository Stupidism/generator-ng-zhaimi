(function() {
  'use strict';

  describe('Directive: <%= cameledName %>', <%= cameledName %>Test);

  function <%= cameledName %>Test() {

    // load the directive's module and view
    beforeEach(module('<%= scriptAppName %>'));

    var element;
    var scope;

    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));

    it('should be wrapped by class "<%= dashedName %>-view"', inject(function($compile) {
      element = angular.element('<div <%= lodash.dasherize(name) %>></div>');
      element = $compile(element)(scope);
      scope.$digest();<% if (hasFilter('jasmine')) { %>
      expect(!!element.find('.<%= dashedName %>-view')).toBe(true);<% } if (hasFilter('mocha')) { %>
      <%= expect() %>element.text()<%= to() %>.equal('this is the <%= cameledName %> directive');<% } %>
    }));
  }
})();
