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

    var <%= lodash.singularize(classedName) %> = zhaimiRest.all('<%= lodash.pluralize(cameledName) %>').toZhaimiService({
      // // Object-Oriented methods of model
      //
      // // static members of model
      // static: {
      //
      // },
    });

    // <%= lodash.singularize(classedName) %>.addRestangularMethod('getSpecialList', 'get', 'special');

    // zhaimiRest.extendModel('<%= lodash.pluralize(cameledName) %>', function(element) {
    //   // Special process before getting any element from server;
    //   return element;
    // });

    // zhaimiRest.addRequestInterceptor(function(element, operation, what) {
    //   if (what !== '<%= lodash.pluralize(cameledName) %>') return element;
    //   // Please write special handling of legacy API endpoints here.
    //
    //   return element;
    // });

    return <%= lodash.singularize(classedName) %>;
  }
})();
