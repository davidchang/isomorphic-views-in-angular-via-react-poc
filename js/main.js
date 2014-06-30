var app = angular.module('myApp', ['ngRoute', 'ngReactGrid'])

  .config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html'
      }).
      when('/small', {
        templateUrl: 'views/mainTemplate.html',
        controller: 'SmallDataCtrl'
      }).
      when('/large', {
        templateUrl: 'views/mainTemplate.html',
        controller: 'LargeDataCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  })

  .controller('SmallDataCtrl', function($scope, KDStatsService, ngReactGrid) {

    $scope.grid = {
      data: KDStatsService.getSmallStats(),
      columnDefs: columnDefs,
      pageSize : 1000,
      pageSizes : [1000]
    };

    new ngReactGrid($scope, angular.element(document.getElementById('gridContainer')));
  })

  .controller('LargeDataCtrl', function($scope, KDStatsService, ngReactGrid) {

    $scope.grid = {
      data: KDStatsService.getLargeStats(),
      columnDefs: columnDefs,
      pageSize : 1000,
      pageSizes : [1000]
    };

    new ngReactGrid($scope, angular.element(document.getElementById('gridContainer')));
  })

  .service('KDStatsService', function() {
    return {
      getSmallStats : function() {
        var toReturn = [];
        stats.forEach(function(stat) {
          if (stat.date.split('/')[2] == '2014') {
            toReturn.push(stat);
          }
        });
        return toReturn;
      },
      getLargeStats : function() {
        return stats;
      }
    };
  });