/**
 * Created by busta on 10/8/2015.
 */
angular.module('Device', ['Config','ui.router','ui.bootstrap'])
    .directive('devicePageWidget',['Restangular',function(Restangular){
        var id; //Si queremos que el binding funcione al asignar valores debemos asignar objetos para hacerlo por referencia
        var actualTab = {device: null}; //no se puede hacer {{x()}} en una directiva siendo x = f(){return {} };
        // Cuando Angular detecta un nuevo objeto en una directiva llama a digest y la recarga, volviendo a llamar x()
        // y causando un bucle infinito. Usa las propiedades de los objetos.
        var tabs = [
            {uiClass: 'glyphicon glyphicon-info-sign', heading: 'Show'},
            {uiClass: 'glyphicon glyphicon-edit', heading: 'Edit'},
            {uiClass: 'glyphicon glyphicon-map-marker', heading: 'Events'}
        ];
        return {
            templateUrl: 'app/devices/device/devicePage.html',
            restrict: 'E',
            scope: {
                id: '='
            },
            link: function($scope, $element, $attrs){
                id = $scope.id;
                $scope.actualTab = actualTab;
                $scope.tabs = tabs;
            }
        }
    }])
    .directive('deviceViewFullWidget',['Restangular', function(Restangular){
        //if needed, this can be splitted into view (which gets the device) and theme (which just outputs the html given a device)
        return{
            templateUrl: 'app/devices/device/deviceViewFull.html',
            restrict: 'E',
            scope:{
                id: '='
            },
            link: function($scope, $element, $attrs){
                $scope.$watch(function(){return $scope.id._id;},function(newValue, oldValue){
                    $scope.device = Restangular.one('devices',$scope.id._id).get().$object;
                });
            }
        }
    }]);