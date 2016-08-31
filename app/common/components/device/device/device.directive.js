'use strict';
var embedding = JSON.stringify({tests: 1, erasures: 1});
var PATH = window.COMPONENTS + '/device/device/';
function device(Restangular) {
    var actualTab = {device: null}; //no se puede hacer {{x()}} en una directiva siendo x = f(){return {} };
    // Cuando Angular detecta un nuevo objeto en una directiva llama a digest y la recarga, volviendo a llamar x()
    // y causando un bucle infinito. Usa las propiedades de los objetos.
    var tabs = [
        {
            uiClass: 'glyphicon glyphicon-map-marker', heading: 'Events',
            templateUrl: PATH + 'events-per-device.template.directive.html'
        },
        {
            uiClass: 'glyphicon glyphicon-info-sign', heading: 'Characteristics',
            templateUrl: PATH + 'device-view.template.directive.html'
        }
        //{uiClass: 'glyphicon glyphicon-edit', heading: 'Edit'},

    ];
    return {
        templateUrl: PATH + 'device.directive.html',
        restrict: 'E',
        scope: {
            api: '='
        },
        link: function ($scope, $element, $attrs) {
            $scope.setActive = function(tab){
                _.forEach(tabs, function(tab){tab.isActive = false});
                tab.isActive = true;
            };

            $scope.actualTab = actualTab;
            $scope.tabs = tabs;
            $scope.device = {};
            $scope.api.showDevice = getFullDeviceFactory(Restangular, $scope);
        }
    }
}

function getFullDeviceFactory(Restangular, $scope){
    return function (device){
        $scope.device = device;
 /*       if ('components' in device)
            for (var i = 0; i < device.components.length; i++)
                device.components[i] = Restangular.one('devices', device.components[i]).get({embedded: embedding}).$object;*/

    }
}

module.exports = device;