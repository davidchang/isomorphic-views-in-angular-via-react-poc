// Generate the Isomorphic view
var React = require('react');
var ngReactGrid = require('./js/ngReactGrid-server-0.5.0');
var stats = require('./js/stats');
var columnDefs = require('./js/columnDefs');

var grid = ngReactGrid.gridDefaults();
grid.data = stats;
grid.columnDefs = columnDefs;
grid.pageSize = 1000;
grid.pageSizes = [1000];

var viewMarkup = React.renderComponentToString(
  ngReactGrid.component({ grid : grid })
);

viewMarkup = '<div id="gridContainer">' + viewMarkup + '</div>';
// End of : Generate the Isomorphic view

// Server Setup
var express = require('express');
var app = express();

app.get('/views/mainTemplate.html', function(req, res) {
  res.send(viewMarkup);
});

app.use(express.static(__dirname));

app.listen('8081')
console.log('Running on port 8081');