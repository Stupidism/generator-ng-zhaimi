(function() {
  'use strict';

  describe('Factory: <%= lodash.singularize(classedName) %>', <%= lodash.singularize(classedName) %>Test);

  function <%= lodash.singularize(classedName) %>Test() {

    // load the service's module
    beforeEach(module('<%= scriptAppName %>'));

    // instantiate service
    var <%= lodash.singularize(classedName) %>;
    beforeEach(inject(function(_<%= lodash.singularize(classedName) %>_) {
      <%= lodash.singularize(classedName) %> = _<%= lodash.singularize(classedName) %>_;
    }));

    it('should do something', function() {<% if (hasFilter('jasmine')) { %>
      expect(!!<%= lodash.singularize(classedName) %>).toBe(true);<% } if (hasFilter('mocha')) { %>
      <%= expect() %>!!<%= lodash.singularize(classedName) %><%= to() %>.be.true;<% } %>
    });
  }
})();
