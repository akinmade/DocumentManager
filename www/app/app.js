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
              templateUrl: "app/document/views/document-list.html",
              controller: 'DocumentController'
            },
            "right-pane-content": {
              template: "Nothing in this place"
            }
          }
        })
        .state('documents.browse', {
          url: "/:documentid",
          views: {
            "right-pane-content": {
              template: "Document Content"
            }
          }
        })
    })
    .controller("MainController", function ($scope) {
      $scope.stuff = 'stuff goes here';
    })
    .controller("DocumentController", function ($scope, $stateProvider) {
      var that = this;
      $scope.documents = [{
        "id": "1",
        "name": "Document1"
      }, {
        "id": "2",
        "name": "Document2"
      }];

      $scope.openDocument = function (id) {
        that.$stateProvider.go('document.browse', {
          documentid: id
        });
      };

    });
})();
