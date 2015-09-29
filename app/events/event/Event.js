/**
 * Created by busta on 29/9/2015.
 */


angular.module('Event', ['Config','ui.bootstrap'])
    .directive('eventViewTeaserWidget',[function(){
        return{
            templateUrl: 'app/events/event/eventViewTeaser.html',
            restrict: 'E',
            scope:{
                event: '=',
                id: '='  //Optional. The id of the actual device. Stylish purposes.
            },
            link: function($scope, $element, $attrs){

            }
        }
    }])
    .directive('eventWithComponentsViewTeaserContentWidget',[function(){
        return{
            templateUrl: 'app/events/event/eventWithComponentsViewTeaserContentWidget.html',
            restrict: 'E',
            scope:{
                event: '=',
                id: '=' //The id of the actual device, to know if is a component or a computer.
            },
            link: function($scope, $element, $attrs){
                $scope.name = $scope.event['@type'] == 'Remove'? 'Removed' : $scope.event['@type'] + 'ed';
            }
        }
    }])
    .directive('snapshotViewTeaserContentWidget',[function(){
        return{
            templateUrl: 'app/events/event/snapshotViewTeaserContentWidget.html',
            restrict: 'E',
            scope:{
                snapshot: '=',
                events: '=',
                id: '='
            },
            link: function($scope, $element, $attrs){

            }
        }
    }]);