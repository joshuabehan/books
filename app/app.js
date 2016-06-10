'use strict';

angular.module('books', [
  'hl.sticky',
  'ui.bootstrap',
  'ui.router',
  'angular-bind-html-compile',
  'books.description',
  'books.main',
  'books.navibar'
])

.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'main/main.tpl.html',
      controller: 'MainController',
    })
    .state('book', {
      url: '/book/:slug',
      templateUrl: 'description/full-page-description.tpl.html',
      controller: 'DescriptionController'
    });
  $urlRouterProvider.otherwise('/');
}]);
