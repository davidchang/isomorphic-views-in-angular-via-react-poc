var app = angular.module('myApp', ['ngRoute', 'ngGrid'])

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

  .controller('SmallDataCtrl', function($scope, KDStatsService) {

    $scope.gridData = KDStatsService.getSmallStats();

    $scope.gridOptions = {
      data: 'gridData',
      columnDefs: columnDefs
    };
  })

  .controller('LargeDataCtrl', function($scope, KDStatsService) {

    $scope.gridData = KDStatsService.getLargeStats();

    $scope.gridOptions = {
      data: 'gridData',
      columnDefs: columnDefs
    };
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