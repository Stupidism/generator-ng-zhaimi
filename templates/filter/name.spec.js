(function() {
  'use strict';

  describe('Filter: <%= cameledName %>', <%= cameledName %>Test);

  function <%= cameledName %>Test() {

    // load the filter's module
    beforeEach(module('<%= scriptAppName %>'));

    // initialize a new instance of the filter before each test
    var <%= cameledName %>;
    beforeEach(inject(function($filter) {
      <%= cameledName %> = $filter('<%= cameledName %>');
    }));

    it('should be something', function() {
      <% if (hasFilter('jasmine')) { %>expect(!!<%= cameledName %>).toBe(true);<% } if (hasFilter('mocha')) { %>
      <%= expect() %><%= cameledName %>(text)<%= to() %>.equal('<%= cameledName %> filter: ' + text);<% } %>
    });

  }
})();
