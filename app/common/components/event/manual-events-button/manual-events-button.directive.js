'use strict';

function manualEventsButton(event, $uibModal){
    return {
        templateUrl: window.COMPONENTS + '/event/manual-events-button/manual-events-button.directive.html',
        restrict: 'E',
        scope: {
            devices: "="
        },
        link: function ($scope) {
            $scope.events = event.EVENTS;
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