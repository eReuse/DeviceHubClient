/**
 * Created by busta on 10/8/2015.
 */
angular.module('Events', ['Config','ui.router','ui.bootstrap'])
    .directive('eventsPerDeviceViewFullWidget',['Restangular',function(Restangular){
        return {
            templateUrl: 'app/events/eventsPerDeviceViewFull.html',
            restrict: 'E',
            scope: {
                id: '='
            },
            link: function($scope, $element, $attrs){
                $scope.$watch(function(){return $scope.id._id;},function(newValue, oldValue){
                    var data = {where: JSON.stringify({'$or':[{device: newValue}, {components:{'$in': [newValue]}}]})};
                    $scope.events = Restangular.all('events').getList(data).$object;
                    // $scope.events = Restangular.one('devices',newValue).getList('events').$object;
                });
            }
        }
    }]);