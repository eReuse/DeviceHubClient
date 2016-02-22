'use strict';

var PATH = window.COMPONENTS + '/report/widgets/aggregation-graph/';

function aggregationGraphWidgetAdf(dashboardProvider){
    var widget = {
        controller: 'aggregationGraphWidgetCtl',
        templateUrl: PATH + 'aggregation-graph.widget-adf.config.html'
    };

    dashboardProvider
        .widget('numberDevicesEvents', angular.extend({
            title: 'Number of devices per event, subject and month',
            description: 'You can customize the event and the subject. Per example: "' +
            'Number of devices every organization has received for collecting, by month.',
            edit: {
                templateUrl: PATH + 'aggregation-graph.number-devices-events.edit.widget-adf.config.html'
            }
        }, widget))
}

module.exports = aggregationGraphWidgetAdf;