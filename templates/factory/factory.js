(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name <%= scriptAppName %>.<%= lodash.pluralize(classedName) %>
   * @description
   * # <%= lodash.pluralize(classedName) %>
   * Factory in the <%= scriptAppName %>.
   */
  angular
    .module('<%= scriptAppName %>')
    .factory('<%= lodash.pluralize(classedName) %>', <%= lodash.pluralize(classedName) %>Factory);

  function <%= lodash.pluralize(classedName) %>Factory(zhaimiRest) {

    // Extend your model and collection with object or function
    var <%= lodash.pluralize(classedName) %> = zhaimiRest.all('<%= lodash.pluralize(underscoredName) %>');
    // .extendModel({})
    // .extendModel(function(element) {return element;})
    // .extendCollection({});
    // .extendCollection(function(collection) {return collection;})

    // Add special http request here, for example:
    // <%= lodash.pluralize(classedName) %>.addRestangularMethod('getSpecialList', 'get', 'special');

    // Add special process before sending any request to server here;
    // zhaimiRest.addRequestInterceptor(function(element, operation, what) {
    //   if (what !== '<%= lodash.pluralize(underscoredName) %>') return element;
    //   // Please write special handling of legacy API endpoints here.
    //   return element;
    // });

    return <%= lodash.pluralize(classedName) %>;
  }
})();
