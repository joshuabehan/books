'use strict';

angular.module('books.main')

.controller('MainController', ['$scope', '$http', '$rootScope', '$uibModal', '$location', '$state', '$timeout',
  function($scope, $http, $rootScope, $uibModal, $location, $state, $timeout) {
    document.title = document.title.split(' - ')[0];

    $http.get('books/booklist.json').then(function(response){
      $scope.bookList = response.data.bookList;
    });

    $scope.links = [];
    $scope.createUrl = function(index, book){
      $scope.links[index] = $location.absUrl() + 'book/' + book.slug;
    };

    $scope.tags = {
      all: {
        id: 'all',
        label: 'All books',
        text: '',
        img: 'images/book.png'
        },
      complex: {
        id: 'complex',
        label: 'Complex',
        text: 'Complex, confusing for the reader.',
        img: 'images/complex2.png'
      },
      mysterious: {
        id: 'mysterious',
        label: 'Mysterious',
        text: 'Mysteries, secrets, questions. Confused characters looking for answers.',
        img: 'images/mysterious2.png'
      },
      weird: {
        id: 'weird',
        label: 'Weird',
        text: 'Bizarre, unexpected, unconventional, strange. Like a fever dream.',
        img: 'images/weird2.png'
      },
      mystical: {
        id: 'mystical',
        label: 'Mystical',
        text: 'The universe contains things we cannot understand. Magical, supernatural, natural, or technological wonders.',
        img: 'images/mystical2.png'
      },
      spooky: {
        id: 'spooky',
        label: 'Spooky',
        text: 'Spooky, unsettling, scary. Sometimes eldritch.',
        img: 'images/spooky2.png'
      },
      feelings: {
        id: 'feelings',
        label: 'Feelings',
        text: 'This story might bring a tear to your third eye.',
        img: 'images/feelings2.png'
      }
    };

    $scope.contentFilter = $scope.tags.all;
    $scope.setContentFilter = function(id) {
      var target = $('#content-top');
      var targetHeight = target.outerHeight();
      var defaultScrollTime = 500;
      var defaultFilterDelay = 510;
      var scrollTime;
      var filterDelay;

      var isInView = function(){
        return target.visible();
      };
      var getAbsDistance = function(){
        var scrollTop = $(window).scrollTop();
        var elementOffset = target.offset().top;
        var distance = (elementOffset - scrollTop);
        return Math.abs(distance);
      };
      var isTooClose = function(){
        if (getAbsDistance() < targetHeight) {
          return true;
        } else {
          return false;
        }
      };
      var getProportionalTime = function(time){
        var ratio = getAbsDistance() / targetHeight;
        return time * ratio;
      };
      var filterContent = function(){
        if (id !== 'all') {
          $rootScope.mixer.filter('.'+id);
        } else {
          $rootScope.mixer.filter(id);
        }
      };

      if (isInView()) {
        filterDelay = 0;
        scrollTime = 0;
      } else if (isTooClose()) {
        filterDelay = getProportionalTime(defaultFilterDelay);
        scrollTime = getProportionalTime(defaultScrollTime);
      } else {
        filterDelay = defaultFilterDelay;
        scrollTime = defaultScrollTime;
      }

      if (filterDelay) {
        $timeout(filterContent, filterDelay);
      } else {
        filterContent();
      }
      if (scrollTime) {
        $(window).scrollTo(target, scrollTime);
      }
      $scope.contentFilter = $scope.tags[id];
    };

    var clickedModal;
    $scope.openReview = function($event, book){
      $event.preventDefault();
      if (clickedModal) {
        return;
      } else {
        clickedModal = true;
        $($event.currentTarget).addClass('card--loading');
      }
      var modal;
      var template;
      var scope = $rootScope.$new();
      scope.book = book;
      $http.get('description/modal-description.tpl.html').then(function(response){
        template = response.data;
        $http.get('description/description.tpl.html').then(function(response){
          scope.descriptionHtml = response.data;
          $http.get('books/' + book.slug + '.tpl.html').then(function(response){
          scope.bookDescription = response.data;
            modal = $uibModal.open({
              scope: scope,
              controller: 'DescriptionController',
              size: 'description',
              template: template
            });
            modal.closed.then(function(){
              $state.go('home');
            });
            clickedModal = false;
            $($event.currentTarget).removeClass('card--loading');
          });
        });
      });
    };

    $scope.openKey = function() {
      var scope = $rootScope.$new();
      scope.tags = $scope.tags;
      $uibModal.open({
          scope: scope,
          size: 'key',
          templateUrl: 'main/key.tpl.html'
      });
    };

}]);
