'use strict';

angular.module('books.description')

.controller('DescriptionController', ['$scope', '$http', '$state', '$stateParams', '$sce',
  function($scope, $http, $state, $stateParams, $sce){
    var trustHtml = function(){
      $scope.descriptionHtml = $sce.trustAsHtml($scope.descriptionHtml);
      $scope.bookDescription = $sce.trustAsHtml($scope.bookDescription);
    };

    if (!$scope.book) {
      var slug = $stateParams.slug;
      var bookList;

      $http.get('books/booklist.json').then(function(response){
        bookList = response.data.bookList;
        var book = _.find(bookList, {slug: slug});
        if (!book) {
          $state.go('home');
        } else {
          document.title = document.title + ' - ' + book.title;
          $scope.book = book;
          $http.get('books/' + book.slug + '.tpl.html').then(function(response){
            $scope.bookDescription = response.data;
            trustHtml();
          });
        }
      });

    } else {
      trustHtml();
    }

  }
]);
