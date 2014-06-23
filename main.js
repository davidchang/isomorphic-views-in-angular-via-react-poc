var app = angular.module('myApp', ['ngGrid'])

  .controller('MainCtrl', function($scope, KDStatsService) {
    $scope.gridData = KDStatsService.getStats();
    $scope.gridOptions = { data: 'gridData' };
  })

  .service('KDStatsService', function() {
    return {
      getStats : function() {
        return stats;
      }
    };
  });