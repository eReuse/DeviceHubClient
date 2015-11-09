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
                $scope.preposition = $scope.name == 'Removed'? 'from' : 'to'
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
    }])
    .directive('eventEditFullscreenWidget', ['Restangular','$rootScope', function(Restangular,$rootScope) {
        /**
         * eventEditFullscreenWidget. Form to create and edit an event.
         * params:
         * event. The event object to act on.
         * - If we are creating the event, event just needs '@type'.
         * - If we are editing the event, it has to be the Restangularized version with _id.
         */
        return{
            templateUrl: 'app/events/event/eventEditFullScreenWidget.html',
            restrict: 'E',
            scope:{
                event: '='
            },
            link: function($scope, $element, $attrs){
                $scope.newEvent = $.extend({}, ('_id' in $scope.event)? $scope.event.plain() : event);  //Duplicate object.
                $scope.upload = function(newEvent){
                    var promise = ('_id' in $scope.event)? $scope.event.patch(newEvent) : Restangular.all($scope.event['@type']).post(newEvent);
                    promise.then(function(data){
                        $rootScope.$broadcast('successful@eventEditFullscreenWidget');
                    }, function(data){
                        alert(data._error.message);
                    });
                };
            }
        }
    }]);