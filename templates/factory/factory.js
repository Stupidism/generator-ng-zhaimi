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
    // 按字母序排序
    var exports = {
      get<%= classedName %>: get<%= classedName %>,
      get<%= classedName %>s: get<%= classedName %>s,
    };

    return exports;

    function get<%= pluralClassedName %>(query) {
      return dataService
        .get<%= classedName %>s(query)
        .then(function(res) {
          var ret = res.data;
          return ret;
        });
    }

    function get<%= singularClassedName %>(id) {
      return dataService
        .get<%= classedName %>(id)
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
