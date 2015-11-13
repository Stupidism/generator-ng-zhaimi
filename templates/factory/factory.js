(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name <%= scriptAppName %>.<%= cameledName %>
   * @description
   * # <%= cameledName %>
   * Factory in the <%= scriptAppName %>.
   */
  angular
    .module('<%= scriptAppName %>')
    .service('<%= cameledName %>', <%= cameledName %>);

  function <%= cameledName %>(dataService) {
    // Public APIs here
    // Ordered by alphabetical order
    // 按字母序排列
    var exports = {
      get: get,
      getById: getById,
    };

    return exports;

    function get(query) {
      return dataService
        .get<%= pluralClassedName %>(query)
        .then(function(res) {
          var ret = res.data;
          return ret;
        });
    }

    function getById(id) {
      return dataService
        .get<%= singularClassedName %>(id)
        .then(function(res) {
          var ret = res.data;
          return ret;
        }, function(res) {
          // maybe id not found
          return res;
        });
    }

  };
})();
