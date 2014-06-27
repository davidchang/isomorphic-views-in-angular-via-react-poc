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

  .controller('MainCtrl', function($scope, $location, KDStatsService) {

    $scope.grid = {
      data: KDStatsService.getStats(),
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
      getStats : function() {
        return stats;
      }
    };
  });