(function() {
  'use strict';

  describe('Factory: <%= lodash.pluralize(classedName) %>', <%= lodash.pluralize(classedName) %>Test);

  function <%= lodash.pluralize(classedName) %>Test() {

    // load the service's module
    beforeEach(module('<%= scriptAppName %>'));

    // instantiate service
    var <%= lodash.pluralize(classedName) %>;
    beforeEach(inject(function(_<%= lodash.pluralize(classedName) %>_) {
      <%= lodash.pluralize(classedName) %> = _<%= lodash.pluralize(classedName) %>_;
    }));

    it('should do something', function() {<% if (hasFilter('jasmine')) { %>
      expect(!!<%= lodash.pluralize(classedName) %>).toBe(true);<% } if (hasFilter('mocha')) { %>
      <%= expect() %>!!<%= lodash.pluralize(classedName) %><%= to() %>.be.true;<% } %>
    });
  }
})();
