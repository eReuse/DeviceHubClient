'use strict';

function device(Restangular) {
    var embedding = JSON.stringify({components: 0, tests: 1});
    var actualTab = {device: null}; //no se puede hacer {{x()}} en una directiva siendo x = f(){return {} };
    // Cuando Angular detecta un nuevo objeto en una directiva llama a digest y la recarga, volviendo a llamar x()
    // y causando un bucle infinito. Usa las propiedades de los objetos.
    var tabs = [
        {uiClass: 'glyphicon glyphicon-info-sign', heading: 'Show'},
        //{uiClass: 'glyphicon glyphicon-edit', heading: 'Edit'},
        {uiClass: 'glyphicon glyphicon-map-marker', heading: 'Events'}
    ];
    return {
        templateUrl: window.COMPONENTS + '/device/device/device.directive.html',
        restrict: 'E',
        scope: {
            id: '='
        },
        link: function ($scope, $element, $attrs) {
            $scope.actualTab = actualTab;
            $scope.tabs = tabs;
            $scope.$watch(function () {
                return $scope.id._id;
            }, function (newValue, oldValue) {
                Restangular.one('devices', $scope.id._id).get({embedded: embedding}).then(function (device) {
                    $scope.device = device;
                    if('components' in $scope.device)
                        for (var i = 0; i < $scope.device.components.length; i++)
                            $scope.device.components[i] = Restangular.one('devices', $scope.device.components[i]).get({embedded: embedding}).$object;
                });

            });
        }
    }
}

module.exports = device;