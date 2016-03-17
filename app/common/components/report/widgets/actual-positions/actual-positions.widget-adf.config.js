'use strict';

var PATH = window.COMPONENTS + '/report/widgets/actual-positions/';

function actualPositionsWidgetAdf(dashboardProvider){
    var widget = {
        controller: 'actualPositionsWidgetCtl',
        templateUrl: PATH + 'actual-positions.widget-adf.config.html'
    };

    dashboardProvider
        .widget('actualPositions', angular.extend({
            title: 'Actual positions of the devices',
            description: '',
            edit: {
                //templateUrl: PATH + 'actual-positions.edit.widget-adf.config.html'
            }
        }, widget))
}

module.exports = actualPositionsWidgetAdf;