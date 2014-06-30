// Generate the Isomorphic view
var React = require('react');
var ngReactGrid = require('./js/ngReactGrid-server-compatible-0.6.0');
var stats = require('./js/stats');
var columnDefs = require('./js/columnDefs');

var getGrid = function(small) {
  // all of these are a little lame, but we're basically doing manual calculations/settings
  // to ensure the below properties will match the initial set of properties sent to the
  // React component on the server
  var grid = ngReactGrid.gridDefault();
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
  ngReactGrid.component({ grid : getGrid(true) })
);

var largeViewMarkup = React.renderComponentToString(
  ngReactGrid.component({ grid : getGrid(false) })
);

// End of : Generate the Isomorphic view

// Server Setup
var express = require('express');
var app = express();

app.get('/views/smallTemplate.html', function(req, res) {
  res.send('<div id="gridContainer">' + smallViewMarkup + '</div>');
});

app.get('/views/largeTemplate.html', function(req, res) {
  res.send('<div id="gridContainer">' + largeViewMarkup + '</div>');
});

app.use(express.static(__dirname));

app.listen('8081')
console.log('Running on port 8081');