(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name <%= scriptAppName %>.<%= lodash.singularize(classedName) %>
   * @description
   * # <%= lodash.singularize(classedName) %>
   * Factory in the <%= scriptAppName %>.
   */
  angular
    .module('<%= scriptAppName %>')
    .factory('<%= lodash.singularize(classedName) %>', <%= lodash.singularize(classedName) %>Factory);

  function <%= lodash.singularize(classedName) %>Factory(zhaimiRest) {

    var <%= lodash.singularize(classedName) %> = zhaimiRest.all('<%= lodash.pluralize(underscoredName) %>').toZhaimiService({
      // Add object-Oriented methods of model here.

      // Add static members of model here.
      // static: {
      //
      // },
    });
    // Add special http request here, for example:
    // <%= lodash.singularize(classedName) %>.addRestangularMethod('getSpecialList', 'get', 'special');

    // Add special process after getting any element from server here;
    // zhaimiRest.extendModel('<%= lodash.pluralize(underscoredName) %>', function(element) {
    //
    //   return element;
    // });

    // Add special process before sending any request to server here;
    // zhaimiRest.addRequestInterceptor(function(element, operation, what) {
    //   if (what !== '<%= lodash.pluralize(underscoredName) %>') return element;
    //   // Please write special handling of legacy API endpoints here.
    //
    //   return element;
    // });

    return <%= lodash.singularize(classedName) %>;
  }
})();
