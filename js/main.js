var app = angular.module('myApp', ['ngRoute', 'ngGrid'])

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

  .controller('MainCtrl', function($scope, $location, KDStatsService) {

    $scope.gridData = KDStatsService.getStats($location.hash());

    $scope.gridOptions = {
      data: 'gridData',
      columnDefs: columnDefs
    };
  })

  .service('KDStatsService', function() {
    return {
      getStats : function() {
        return stats;
      }
    };
  });