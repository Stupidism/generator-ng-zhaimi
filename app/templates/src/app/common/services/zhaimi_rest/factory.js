(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name <%= scriptAppName %>.zhaimiRest
   * @description
   * # zhaimiRest
   * Factory in the <%= scriptAppName %>.
   */
  angular
    .module('<%= scriptAppName %>')
    .factory('zhaimiRest', zhaimiRest);

  function zhaimiRest(Restangular, dataService, $log, notifyService, errorService) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(dataService.baseUrl);
      RestangularConfigurer.addResponseInterceptor(listNormalizingInterceptor);
      RestangularConfigurer.addResponseInterceptor(returnDataInterceptor);
      RestangularConfigurer.setErrorInterceptor(errorLoggingInterceptor);
      RestangularConfigurer.setOnElemRestangularized(addGlobalMethods);
    });

    function errorLoggingInterceptor(res) {
      $log.error(res);
      return true;
    }

    function addGlobalMethods(element, isCollection, route, restangular) {
      if (!isCollection) {
        return element;
      }
      element.remove = remove;
      angular.extend(element, {
        create: create,
        one: one,
        remove: remove,
        extendModel: extendModel,
        extendCollection: extendCollection,
      });

      return element;

      function extendModel(members) {
        restangular.extendModel(element.route, function(item) {
          // Add instance members for each model in the route.
          return angular.extend(item, members);
        });
        return this;
      }

      function extendCollection(members) {
        restangular.extendCollection(element.route, function(collection) {
          // Add instance members for each model in the route.
          return angular.extend(collection, members);
        });
        angular.extend(element, members);
        return this;
      }
      // Create a new empty element in the collection with fields from obj,
      // which can be later .save()'d via a POST request.
      function create(obj) {
        return restangular.restangularizeElement(
          this.parentResource, obj || {}, this.route);
      }

      function one(type, id) {
        if (arguments.length === 1) {
          // Handle the case of SomeResource.one('id').
          id = type;
          if (this.parentResource) {
            return this.parentResource.one(this.route, id);
          } else {
            return restangular.one(this.route, id);
          }
        }
        // Otherwise, delegate to Restangular.one.
        return this.collection.one.apply(this, arguments);
      }

      function remove(element) {
        // use id to remove an element;
        var id = element.id || element;
        var collection = this;
        // create an element and call its remove method
        collection.create({id: id}).remove()
          .then(function() {
            notifyService.success('删除成功');
            angular.forEach(collection, function(element, index) {
              if (element.id === id) {
                collection.splice(index, 1);
              }
            });
          }, function(res) {
            errorService.error(res);
          });
      }
    }
  }

  function listNormalizingInterceptor(data, operation, what, url, res, defer) {
    try {
      if (operation === 'getList' && !angular.isArray(data)) {
        var items = data.items;
        var pagination = data.pagination;

        if (items == null) {
          for (var key in data) {
            if (angular.isArray(data[key])) {
              if (items == null) {
                items = data[key];
              } else {
                throw new Error('There are multiple arrays! I\'m confused...');
              }
            }
          }
          if (items == null) {
            throw new Error('Missing items array!');
          }
        }

        if (pagination == null) {
          // Add legacy pagination metadata handling here:
          pagination = {
            itemCount: data.count,
            currentPage: data.currentPage,
            pageCount: data.pageCount,
            perPage: data.perPage,
          };
        }
        if (res.config.params) {
          pagination.currentPage =
            pagination.currentPage || res.config.params.page;
          pagination.perPage = pagination.perPage || res.config.params.perPage;
        }
        pagination.currentPage = pagination.currentPage || 1;

        if (pagination.itemCount == null) {
          throw new Error('Missing itemCount field in pagination!');
        }
        if (!pagination.perPage) {
          throw new Error('Missing perPage field in pagination!');
        }

        if (!pagination.pageCount) {
          pagination.pageCount =
            Math.ceil(pagination.itemCount / pagination.perPage);
        }

        data = items;
        data.$pagination = pagination;
      }
      return data;
    } catch (err) {
      return defer.reject(err);
    }
  }

  function returnDataInterceptor(data, operation) {
    // Should return created, updated or deleted element,
    // but backend devs have no time ...
    switch (operation) {
      case 'post':
      case 'patch':
      case 'remove': {
        return null;
      }
    }
    return data;
  }

})();
