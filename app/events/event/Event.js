/**
 * Created by busta on 29/9/2015.
 */


angular.module('Event', ['Config','ui.bootstrap','door3.css'])
    .directive('eventViewTeaserWidget',[function(){
        return{
            templateUrl: 'app/events/event/eventViewTeaser.html',
            restrict: 'E',
            css: 'app/events/event/eventViewTeaser.css',
            scope:{
                event: '=',
                id: '='  //Optional. The id of the actual device. Stylish purposes.
            },
            link: function($scope, $element, $attrs){
                console.log('event view teaser widget');
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
    .directive('snapshotViewTeaserContentWidget',[function($templateCache){
        return{
            templateUrl: 'app/events/event/snapshotViewTeaserContentWidget.html',
            restrict: 'E',
            scope:{
                snapshot: '=',
                events: '=',
                id: '='
            },
            link: function($scope, $element, $attrs){
            //    $scope.template = $templateCache.get('app/events/event/eventViewTeaser.html');
            }
        }
    }]);