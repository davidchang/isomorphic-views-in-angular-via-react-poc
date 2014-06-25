var app = angular.module('myApp', ['ngRoute', 'ngReactGrid'])
  .config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html'
      }).
      when('/main', {
        templateUrl: 'views/mainTemplate.html',
        controller: 'MainCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  })

  .controller('MainCtrl', function($scope, KDStatsService, ngReactGrid) {
    $scope.grid = {
      data       : KDStatsService.getStats(),
      columnDefs : columnDefs,
      pageSize   : 1000,
      pageSizes  : [1000]
    };

    new ngReactGrid($scope, angular.element(document.getElementById('gridContainer')));
  })

  .service('KDStatsService', function() {
    return {
      getStats : function() {
        return stats;
      }
    };
  });