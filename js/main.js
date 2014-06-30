var app = angular.module('myApp', ['ngRoute', 'ngReactGrid'])
  .config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html'
      }).
      when('/small', {
        templateUrl: 'views/smallTemplate.html',
        controller: 'SmallDataCtrl'
      }).
      when('/large', {
        templateUrl: 'views/largeTemplate.html',
        controller: 'LargeDataCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  })

  .run(function($templateCache) {

    var getGrid = function(small) {
      // all of these are a little lame, but we're basically doing manual calculations/settings
      // to ensure the below properties will match the initial set of properties sent to the
      // React component on the server
      var grid = new ngReactGridDefaults();
      grid.columnDefs = columnDefs;
      grid.pageSize = 1000;
      grid.pageSizes = [1000];

      if (!small) {
        grid.data = stats;
        grid.totalCount = 640;
        grid.react.showingRecords = 640;
      } else {
        grid.totalCount = 103;
        grid.react.showingRecords = 103;
        var toUse = [];
        stats.forEach(function(stat) {
          if (stat.date.split('/')[2] == '2014') {
            toUse.push(stat);
          }
        });
        grid.data = toUse;
      }

      grid.react.startIndex = 0;
      grid.react.endIndex = 1000;
      grid.totalPages = 1;

      return grid;
    };

    var smallViewMarkup = React.renderComponentToString(
      ngReactGridComponent({ grid : getGrid(true) })
    );

    var largeViewMarkup = React.renderComponentToString(
      ngReactGridComponent({ grid : getGrid(false) })
    );

    $templateCache.put('views/smallTemplate.html', '<div id="gridContainer">' + smallViewMarkup + '</div>');
    $templateCache.put('views/largeTemplate.html', '<div id="gridContainer">' + largeViewMarkup + '</div>');
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