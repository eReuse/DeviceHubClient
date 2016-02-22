'use strict';


function aggregationGraphWidgetAdfController($scope, config){
    $scope.params = {method: config.method || 'number_devices_events'};
    $scope.resourceName = 'events';
}

module.exports = aggregationGraphWidgetAdfController;