(function() {
  'use strict';

  describe('Directive: <%= cameledName %>', <%= cameledName %>Test);

  function <%= cameledName %>Test() {

    beforeEach(module('<%= scriptAppName %>'));

    var element;
    var scope;

    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));

    it('should have class "<%= dashedName %>-view"', inject(function($compile) {
      element = angular.element('<div <%= lodash.dasherize(name) %>></div>');
      element = $compile(element)(scope);
      scope.$digest();<% if (hasFilter('jasmine')) { %>
      expect(element.children().hasClass('<%= dashedName %>-view')).toBe(true);<% } if (hasFilter('mocha')) { %>
      <%= expect() %>element.text()<%= to() %>.equal('this is the <%= cameledName %> directive');<% } %>
    }));
  }
})();
