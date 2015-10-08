/**
 * Created by busta on 10/8/2015.
 */
angular.module('Device', ['Config','ui.router','ui.bootstrap','Events'])
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
            css: 'app/devices/device/device.css',
            scope:{
                id: '=',
                teaser: '=' //Optional. Defaults to false (Full view)
            },
            link: function($scope, $element, $attrs){
                $scope.teaser = $scope.teaser || false;
                $scope.$watch(function(){return $scope.id._id;},function(newValue, oldValue){
                    $scope.device = Restangular.one('devices',$scope.id._id).get({embedded:JSON.stringify({components: 1})}).$object;
                });
            }
        }
    }])
    .directive('computerViewFullContentWidget',[function(Restangular){
        //if needed, this can be splitted into view (which gets the device) and theme (which just outputs the html given a device)
        return{
            templateUrl: 'app/devices/device/computerViewFullContentWidget.html',
            restrict: 'E',
            scope:{
                computer: '='
            },
            link: function($scope, $element, $attrs){
                $scope.teaser = true;
            }
        }
    }])
    .directive('componentViewFullContentWidget',[function(Restangular){
        //if needed, this can be splitted into view (which gets the device) and theme (which just outputs the html given a device)
        return{
            templateUrl: 'app/devices/device/componentViewFullContentWidget.html',
            restrict: 'E',
            scope:{
                component: '='
            },
            link: function($scope, $element, $attrs){
            }
        }
    }]).directive('deviceIcon',[function(Restangular){
        return{
            template: '<img src="app/devices/device/icons/{{type}}-{{subtype}}.png" onerror="this.src=\'app/devices/device/icons/default.png\'"/>',
            css: 'app/devices/device/icons/icons.css',
            restrict: 'E',
            scope:{
                type: '@',
                subtype: '@'
            }
        }
    }]);