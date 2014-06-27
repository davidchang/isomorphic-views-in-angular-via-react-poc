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

  .run(function($templateCache) {

    var grid = new ngReactGridDefaults();
    grid.data = stats;
    grid.columnDefs = columnDefs;
    grid.pageSize = 1000;
    grid.pageSizes = [1000];
    grid.totalCount = 640;
    grid.react.showingRecords = 640;
    grid.react.startIndex = 0;
    grid.react.endIndex = 1000;
    grid.totalPages = 1;

    console.log('grid', grid);

    var viewMarkup = React.renderComponentToString(
      ngReactGridComponent({ grid : grid })
    );

    viewMarkup = '<div id="gridContainer">' + viewMarkup + '</div>';

    console.log('viewMarkup', viewMarkup);

    $templateCache.put('views/mainTemplate.html', viewMarkup);
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