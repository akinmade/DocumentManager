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
      console.log("MainController is created");
      $scope.stuff = 'stuff goes here';
    })
    .controller("DocumentDetailController", function ($scope, $stateParams, backendApiService, backendApiFactory) {
      console.log("DocumentDetailController is created");
      var documents = backendApiService.getDocuments().concat(backendApiFactory());
      var id = $stateParams["documentid"];
      $scope.selectedDocumentImage = "";

      for (var i = 0; i < documents.length; i++) {
        if (documents[i].id === id) {
          $scope.selectedDocumentImage = documents[i].image;
        }
      }

    })
    .controller("DocumentController", function ($scope, $state, backendApiService, backendApiFactory) {
      console.log("DocumentController is created");
      $scope.documents = backendApiService.getDocuments().concat(backendApiFactory());

      $scope.openDocument = function (documentid) {
        $state.go('documents.show', {
          id: documentid
        });
      };
    });
})();
