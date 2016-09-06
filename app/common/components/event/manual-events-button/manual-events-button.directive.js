'use strict';

function manualEventsButton(resourceSettings, $uibModal){
    return {
        templateUrl: window.COMPONENTS + '/event/manual-events-button/manual-events-button.directive.html',
        restrict: 'E',
        scope: {
            devices: "="
        },
        link: function ($scope) {
            var rS = new resourceSettings('devices:DeviceEvent');
            rS.loaded.then(function(){
                $scope.events = rS.getSubResources()
            });
            $scope.openModal = openModalFactory($uibModal)
        }
    }
}

function openModalFactory($uibModal){
    return function (type, devices){
        $uibModal.open({
            templateUrl: window.COMPONENTS + '/forms/form-modal/form-modal.controller.html',
            controller: 'formModalCtrl',
            resolve: {
                model: function(){ return {'@type': type, devices: devices}},
                options: function(){ return {}}
            }
        })
    }
}

module.exports = manualEventsButton;