'use strict';

function eventsPerDevice(Restangular, event) {
    return {
        templateUrl: window.COMPONENTS + '/events-per-device/events-per-device.directive.html',
        restrict: 'E',
        scope: {
            device: '='
        },
        link: function ($scope, $element, $attrs) {
            $scope.EVENTS = event.EVENTS;
            $scope.$watch(function () {
                return $scope.device._id;
            }, function (newValue, oldValue) {
                var data = {
                    where: JSON.stringify({'$or': [{devices: {'$in': [newValue]}}, {device: newValue}, {components: {'$in': [newValue]}}]}),
                    embedded: JSON.stringify({events: 1})
                };
                Restangular.all('events').getList(data).then(function (events) {
                    $scope.events = subsanizeEvents(events);
                    //$scope.events = events;
                });
                // $scope.events = Restangular.one('devices',newValue).getList('events').$object;
            });
        }
    }
}

var subsanizeEvents = function (events) {
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

module.exports = eventsPerDevice;