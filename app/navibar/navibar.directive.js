'use strict';

angular.module('books.navibar')

.directive('navibar', [function(){
    return {
      restrict: 'E',
      templateUrl: 'navibar/navibar.tpl.html',
    };
}]);
