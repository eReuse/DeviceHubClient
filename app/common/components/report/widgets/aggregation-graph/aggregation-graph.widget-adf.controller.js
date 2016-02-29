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
    $scope.method = 'devices_per_event_subject_month';
    window.sco = $scope;
    $scope.resourceName = 'events';
}

module.exports = aggregationGraphWidgetAdfController;