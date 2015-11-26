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
        var acceptedKeys = ['message', 'incidence', 'geo', 'receiver', 'receiverEmail', 'receiverName', 'acceptedConditions'
        , 'type', '@type', 'devices'];
        var removeUnacceptedKeys = function(event){
            Object.keys(event).forEach(function(key, index, array){
                if(acceptedKeys.indexOf(key) <= -1) delete event[key];
            });
        };
        return{
            templateUrl: 'app/events/event/eventEditFullScreenWidget.html',
            restrict: 'E',
            scope:{
                event: '='
            },
            link: function($scope, $element, $attrs){
                $scope.newEvent = $.extend({}, ('_id' in $scope.event)? $scope.event.plain() : $scope.event);  //Duplicate object.
                $scope.newEvent.devices.forEach(function(device, index, array){
                    $scope.newEvent.devices[index] = device._id;
                });
               // $scope.newEvent = $.extend({},$scope.event.plain());

                removeUnacceptedKeys($scope.newEvent);
                $scope.checkDependency = function(){
                    if ((!$scope.newEvent.receiverName && !$scope.newEvent.receiverEmail)
                    || ($scope.newEvent.receiverName && $scope.newEvent.receiverEmail))
                        document.getElementById('receiverName').setCustomValidity('');
                    else document.getElementById('receiverName').setCustomValidity('You need to add a name and an e-mail, or select an user.');
                };
                $scope.oneOrAnother = function(){
                    var message = 'You need to select a receiver, or write the email and name.';
                    if($scope.newEvent.receiver
                        || $scope.newEvent.receiverEmail
                        || $scope.newEvent.receiverName) document.getElementById('receiver').setCustomValidity('');
                    else document.getElementById('receiver').setCustomValidity(message);
                };
                setTimeout($scope.oneOrAnother, 100);
                $scope.upload = function(newEvent){
                    var promise = ('_id' in $scope.event)? $scope.event.patch(newEvent) : Restangular.all('events/'+$scope.event['@type'].toLowerCase()).post(newEvent);
                    promise.then(function(data){
                        $rootScope.$broadcast('successful@eventEditFullscreenWidget');
                    }, function(data){
                        try{
                            var message = data.data._error.message + ': ';
                            for(var key in data.data._issues) {
                                if (data.data._issues.hasOwnProperty(key) && key != 'type') {
                                    message += data.data._issues[key];
                                }
                            }
                            alert(message);
                        }
                        catch(err){alert(data.data._error.message)}
                    });
                };
            }
        }
    }]);