;
(function () {
  'use strict';

  angular.module("documentmanager", [
      'ui.router'
    ])
    .config(function ($stateProvider) {
      $stateProvider
        .state('index', {
          url: "/",
          views: {
            "menu": {
              templateUrl: "app/main/menu.html"
            },
            "left-pane-content": {
              template: "Nothing in this place"
            },
            "right-pane-content": {
              template: "Nothing in this place"
            }
          }
        })
        .state('documents', {
          url: "/documents",
          views: {
            "menu": {
              templateUrl: "app/document/views/menu.html"
            },
            "left-pane-content": {
              templateUrl: "app/document/views/list.html",
              controller: "DocumentController"
            },
            "right-pane-content": {
              template: "Nothing in this place"
            }
          }
        })
        .state("documents.browse", {
          url: "/:documentid",
          views: {
            "right-pane-content": {
              templateUrl: "app/document/views/detail.html",
              controller: "DocumentDetailController"
            }
          }
        })
    })
    .controller("MainController", function ($scope) {
      $scope.stuff = 'stuff goes here';
    })
    .controller("DocumentController", function ($scope, $state) {
      var state = $state;

      $scope.documents = [{
        "id": "1",
        "name": "Document1"
      }, {
        "id": "2",
        "name": "Document2"
      }];

      $scope.openDocument = function (id) {
        state.go('documents.browse', {
          documentid: id
        });
      };
    })
    .controller("DocumentDetailController", function ($scope, $stateParams) {
      console.log("Selected documents : ", $stateParams["documentid"]);
    });
})();
