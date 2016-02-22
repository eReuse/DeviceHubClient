'use strict';

require('angular-chart.js');

module.exports = angular.module('common.components.report',
    [
        'adf',
        'chart.js'
    ])
    .directive('aggregationGraph', require('./aggregation-graph/aggregation-graph.directive.js'))
    .config(require('./widgets/aggregation-graph/aggregation-graph.widget-adf.config.js'))
    .controller('aggregationGraphWidgetCtl', require('./widgets/aggregation-graph/aggregation-graph.widget-adf.controller.js'));