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

  .controller('SmallDataCtrl', function($scope, KDStatsService) {

    $scope.grid = {
      data: KDStatsService.getSmallStats(),
      columnDefs: [
        {field:'date', displayName:'Date'},
        {field:'opponent', displayName:'Opponent'},
        {field:'location', displayName:'Location'},
        {field:'score', displayName:'Score'},
        {field:'min', displayName:'Minutes'},
        {field:'fgm_fga', displayName:'FGM-FGA'},
        {field:'fg_percentage', displayName:'FG%'},
        {field:'_3pm_3pa', displayName:'3PM-3PA'},
        {field:'_3p_percentage', displayName:'3P%'},
        {field:'ftm_fta', displayName:'FTM-FTA'},
        {field:'ft_percentage', displayName:'FT%'},
        {field:'rebounds', displayName:'Rebounds'},
        {field:'assists', displayName:'Assists'},
        {field:'blocks', displayName:'Blocks'},
        {field:'steals', displayName:'Steals'},
        {field:'pf', displayName:'Fouls'},
        {field:'to', displayName:'Turnovers'},
        {field:'pts', displayName:'Points'},
      ],
      pageSize : 1000,
      pageSizes : [1000]
    };
  })

  .controller('LargeDataCtrl', function($scope, KDStatsService) {

    $scope.grid = {
      data: KDStatsService.getLargeStats(),
      columnDefs: [
        {field:'date', displayName:'Date'},
        {field:'opponent', displayName:'Opponent'},
        {field:'location', displayName:'Location'},
        {field:'score', displayName:'Score'},
        {field:'min', displayName:'Minutes'},
        {field:'fgm_fga', displayName:'FGM-FGA'},
        {field:'fg_percentage', displayName:'FG%'},
        {field:'_3pm_3pa', displayName:'3PM-3PA'},
        {field:'_3p_percentage', displayName:'3P%'},
        {field:'ftm_fta', displayName:'FTM-FTA'},
        {field:'ft_percentage', displayName:'FT%'},
        {field:'rebounds', displayName:'Rebounds'},
        {field:'assists', displayName:'Assists'},
        {field:'blocks', displayName:'Blocks'},
        {field:'steals', displayName:'Steals'},
        {field:'pf', displayName:'Fouls'},
        {field:'to', displayName:'Turnovers'},
        {field:'pts', displayName:'Points'},
      ],
      pageSize : 1000,
      pageSizes : [1000]
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