;
(function () {
  'use strict';

  angular.module("documentmanager", [
      'ui.router'
    ])
    .constant("BASE_API_URL", "http://base.url")
    .config(function ($stateProvider) {
      $stateProvider
        .state("index", {
          url: "",
          views: {
            "menu@": {
              templateUrl: "app/main/menu.html"
            },
            "left-pane-content@": {
              template: "Nothing in this place"
            },
            "right-pane-content@": {
              template: "Nothing in this place"
            }
          }
        })
        .state("documents", {
          url: "/documents",
          views: {
            "menu@": {
              templateUrl: "app/document/views/menu.html"
            },
            "left-pane-content@": {
              templateUrl: "app/document/views/list.html",
              controller: "DocumentController"
            },
            "right-pane-content@": {
              template: "Click 'Open' to see preview"
            }
          }
        })
        .state("documents.detail", {
          url: "/:documentid",
          views: {
            "menu@": {
              templateUrl: "app/main/menu.html"
            },
            "right-pane-content@": {
              templateUrl: "app/document/views/detail.html",
              controller: "DocumentDetailController"
            }
          }
        })
    })
    .service('pokemonService', function PokemonService($http, $q) {
      this.getList = function () {
        return $http.get("http://pokeapi.co/api/v1/pokedex/1/");
      }
      this.getItem = function (id) {
        return $http.get("http://pokeapi.co/" + unescape(id))
          .then(function (response) {
            return response.data;
          }).then(function (data) {
            return $http.get("http://pokeapi.co/api/v1/sprite/" + data.pkdx_id + "/");
          });
      }
      this.greet = function (name) {
        return asyncGreet(name);
      }

      function asyncGreet(name) {
        var deferred = $q.defer();

        setTimeout(function () {
          deferred.notify('About to greet ' + name + '.');

          if (name.indexOf("c") === 0) {
            deferred.resolve('Hello, ' + name + '!');
          } else {
            deferred.reject('Greeting ' + name + ' is not allowed.');
          }
        }, 1000);

        return deferred.promise;
      }
      this.calculate = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;

        promise.then(function () {
            console.info("Promise is just done!");
          },
          function () {
            console.error("Promise is rejected!");
          },
          function () {
            console.warn("Notification !");
          });

        //deferred.notify();
        //deferred.reject();
        // deferred.resolve();
        return promise;
      }
    })
    .service('backendApiService', function BackendApiService() {
      this.getDocuments = function () {
        return [{
          "id": "1",
          "name": "Document1",
          "image": "http://image.slidesharecdn.com/examplerequirementsspecification-120509024427-phpapp01/95/example-requirements-specification-1-728.jpg?cb=1336531501"
        }, {
          "id": "2",
          "name": "Document2",
          "image": "http://image.slidesharecdn.com/examplerequirementsspecification-120509024427-phpapp01/95/example-requirements-specification-2-728.jpg?cb=1336531501"
        }];
      };
    })
    .factory('backendApiFactory', function () {
      return function () {
        return [{
          "id": "3",
          "name": "Document3",
          "image": "http://image.slidesharecdn.com/examplerequirementsspecification-120509024427-phpapp01/95/example-requirements-specification-3-728.jpg?cb=1336531501"
        }, {
          "id": "4",
          "name": "Document4",
          "image": "http://image.slidesharecdn.com/examplerequirementsspecification-120509024427-phpapp01/95/example-requirements-specification-4-728.jpg?cb=1336531501"
        }];
      }
    })
    .controller("MainController", function ($scope) {
      $scope.stuff = 'stuff goes here';
    })
    .controller("DocumentDetailController", function ($scope, $stateParams, pokemonService) {
      var id = $stateParams["documentid"];
      pokemonService.getItem(id)
        .then(function (response) {
          $scope.pokemon = response.data;

          var promise = pokemonService.greet(response.data.pokemon.name);
          promise.then(function (greeting) {
            console.info('Success: ' + greeting);
          }, function (reason) {
            console.error('Failed: ' + reason);
          }, function (update) {
            console.warn('Got notification: ' + update);
          });

        })
    })
    .controller("DocumentController", function ($scope, $state, $q, pokemonService) {
      pokemonService.getList()
        .then(function (response) {
          $scope.pokemons = response.data.pokemon;
        });
    });
})();
