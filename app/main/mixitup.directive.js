'use strict';

angular.module('books.main')

.directive('mixitup', [function(){
    return {
      restrict: 'A',
      controller: ['$rootScope', function($rootScope) {
        var mixitContainer;
        this.setElement = function(element) {
          mixitContainer = element;
        };
        this.mixit = function(){
          $rootScope.mixer = mixitup(mixitContainer);
        };
      }],
      link: function(scope, element, attrs, controller) {
        controller.setElement(element);
      }
    };
}])

.directive('mixitupNgRepeat', [function(){
    return {
      restrict: 'A',
      require: '^mixitup',
      link: function(scope, element, attrs, controller){
        if (scope.$last) {
          controller.mixit();
        }
      }
    };
}]);
