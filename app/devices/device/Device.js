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
            {uiClass: 'glyphicon glyphicon-info-sign', heading: 'Show',
                getContent: function(){
                    actualTab.device = Restangular.one('devices',id._id).get().$object;
                    actualTab.reGetContent = tabs[0].getContent;
                }},
            {uiClass: 'glyphicon glyphicon-edit', heading: 'Edit',
                getContent: function(){
                    actualTab.device = 'Editing...';
                    actualTab.reGetContent = tabs[1].getContent;
                }},
            {uiClass: 'glyphicon glyphicon-map-marker', heading: 'Workflow',
                getContent: function(){
                    actualTab.content = 'removing...';
                    actualTab.reGetContent = tabs[2].getContent;
                }}
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

                //If hid changes we need to reload the tab.
                $scope.$watch(function(){return $scope.id._id;},function(newValue, oldValue){
                    if(oldValue._id !== null) actualTab.reGetContent();
                })
            }
        }
    }])
    .directive('deviceViewFullWidget',['Restangular', function(Restangular){
        return{
            templateUrl: 'app/devices/device/deviceViewFull.html',
            restrict: 'AE',
            scope:{
                device: '='
            },
            link: function($scope, $element, $attrs){

            }
        }
    }]);