/**
 * Created by busta on 10/8/2015.
 */
angular.module('Events', ['Config', 'ui.router', 'ui.bootstrap', 'Event', 'angular-timeline'])
    .directive('eventsPerDeviceViewFullWidget', ['Restangular', function (Restangular) {
        var self = this;
        this.subsanizeEvents = function (events) {
            events.forEach(function (event) {
                if (event['@type'] == 'Snapshot'){  //for every snapshot
                    event.events.forEach(function (subEvent) {  //we get its full events
                        for (var i = 0; i < events.length; i++) //and we remove them from the general event list
                            if (events[i]['_id'] == subEvent['_id']) events.splice(i,1);
                    });
                }
            });
            return events;
        };
        return {
            templateUrl: 'app/events/eventsPerDeviceViewFull.html',
            restrict: 'E',
            scope: {
                id: '='
            },
            link: function ($scope, $element, $attrs) {
                $scope.$watch(function () {
                    return $scope.id._id;
                }, function (newValue, oldValue) {
                    var data = {
                        where: JSON.stringify({'$or': [{device: newValue}, {components: {'$in': [newValue]}}]}),
                        embedded: JSON.stringify({events: 1}) //todo , device: 1, components: 1
                    };
                    Restangular.all('events').getList(data).then(function (events) {
                        $scope.events = self.subsanizeEvents(events);
                        //$scope.events = events;
                    });
                    // $scope.events = Restangular.one('devices',newValue).getList('events').$object;

                });
            }
        }
    }]);