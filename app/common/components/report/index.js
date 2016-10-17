require('angular-chart.js')
require('angular-google-maps')

module.exports = angular.module('common.components.report',
  [
    'adf',
    'chart.js',
    'uiGmapgoogle-maps'
  ])
.directive('aggregationGraph', require('./aggregation-graph/aggregation-graph.directive.js'))
.config(require('./widgets/aggregation-graph/aggregation-graph.widget-adf.config.js'))
.controller('aggregationGraphWidgetCtl', require('./widgets/aggregation-graph/aggregation-graph.widget-adf.controller.js'))
.config(require('./widgets/actual-positions/actual-positions.widget-adf.config.js'))
.controller('actualPositionsWidgetCtl', require('./widgets/actual-positions/actual-positions.widget-adf.controller.js'))
