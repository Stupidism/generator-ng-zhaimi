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

  /* ngInject */
  function zhaimiRest(Restangular, dataService, $log) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(dataService.baseUrl);
      RestangularConfigurer.addRescomponseInterceptor(listNormalizingInterceptor);
      RestangularConfigurer.addResponseInterceptor(returnDataInterceptor);
      RestangularConfigurer.setErrorInterceptor(errorLoggingInterceptor);
      RestangularConfigurer.setOnElemRestangularized(addGlobalMethods);
    });

    function errorLoggingInterceptor(res) {
      $log.error(res);
      return true;
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

  function addGlobalMethods(element, isCollection, route, restangular) {
    if (isCollection) {
      // Static members for all resources returned by toZhaimiService.
      var defaultStatic = {
        // Create a new empty element in the collection with fields from obj,
        // which can be later .save()'d via a POST request.
        create: function(obj) {
          return restangular.restangularizeElement(
            this.parentResource, obj || {}, this.route);
        },
        one: function(type, id) {
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
        },
      };
      // Convert a collection for use as a service. It will add members to
      // each element of the route of the given collection, and add
      // members.static to the result service.
      element.toZhaimiService = function(members) {
        members = members || {};
        var service;
        if (this._isZhaimiRestService) {
          // Already converted to service.
          service = this;
        } else {
          // angular.copy won't copy additional properties if the target is an
          // array. Therefore we need to copy them manually below.
          service = [];
          for (var key in element) {
            service[key] = element[key];
          }
          // Calling this will correctly bind restangular methods to the
          // collection.
          service = restangular.restangularizeCollection(
            this.parentResource, service, this.route, this.reqParams);
          service._isZhaimiRestService = true;
          // Store the original collection for calling original restangular
          // methods.
          service.collection = this;
        }
        // Add default and custom static members.
        angular.extend(service, defaultStatic, members.static);
        delete members.static;
        // Merge instance members for later use.
        service._members = service._members || {};
        angular.extend(service._members, members);
        restangular.extendModel(service.route, function(item) {
          // Add instance members for each model in the route.
          return angular.extend(item, service._members);
        });
        return service;
      };
    } else {
    }
    return element;
  }

})();
