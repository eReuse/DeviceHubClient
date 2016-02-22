'use strict';

var PATH = window.COMPONENTS + '/report/widgets/aggregation-graph/';

function aggregationGraphWidgetAdf(dashboardProvider){
    dashboardProvider.widget('aggregationGraphWidget', {
        title: 'Graph',
        description: 'Generate a dynamic graph.',
        templateUrl: PATH + 'aggregation-graph.widget-adf.config.html',
        edit: {
            templateUrl: PATH + 'aggregation-graph.edit.widget-adf.config.html'
        },
        controller: 'aggregationGraphWidgetCtl'
    })
}

module.exports = aggregationGraphWidgetAdf;