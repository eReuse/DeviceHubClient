'use strict';


function aggregationGraphWidgetAdfController($scope, config){
    if(!('event' in config)){
        angular.copy({
            subject: 'receiverOrganization',
            event: 'Receive',
            receiverType: 'CollectionPoint'
        }, config);
    }
    $scope.params = window.cg = config;
    $scope.method = 'number_devices_events';
    window.sco = $scope;
    $scope.resourceName = 'events';
}

module.exports = aggregationGraphWidgetAdfController;