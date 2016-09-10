'use strict';

function placeNavDirective(ResourceSettings, $rootScope, Notification) {
    return {
        templateUrl: window.COMPONENTS + '/place/place-nav.directive.html',
        restrict: 'E',
        scope: {},
        link: function ($scope) {
            var getPlaces = function () {
                ResourceSettings('Place').server.getList().then(function (data) { // Let's get the places
                    $scope.places = data;
                    $scope.selected_id = null;
                    $rootScope.$broadcast('get@placeNav', data);
                });
            };
            getPlaces();
            $scope.broadcastSelectedPlace = function (place_id) {
                if ($scope.isSelected(place_id)) {
                    $rootScope.$broadcast('unselectedPlace@placeNavWidget');
                    $scope.selected_id = null;
                }
                else {
                    $rootScope.$broadcast('selectedPlace@placeNavWidget', place_id);
                    $scope.selected_id = place_id;
                }
            };
            $scope.$on('refresh@place', getPlaces);
            $scope.$on('refresh@deviceHub', getPlaces);
            $scope.$on('selectedDevices@deviceList', function (event, devices) {
                $scope.devices = devices;
            });

            $scope.moveDevices = function (place, newDevices) {
                var ids = angular.copy(place.devices) || [];
                var error = false;
                newDevices.forEach(function (device) {
                    if (device['@type'] != 'Computer') {
                        Notification.error('For now, you can just move computers. Deselect any other device.');
                        error = true;
                    }
                });
                ids = _.union(ids, _.map(newDevices, '_id'));
                if (_.isEqual(place.devices, ids)) {
                    Notification.warning('All the devices are already in the place, so we are not moving them.');
                    error = true;
                }
                if (error) return;
                var dataToSend = {
                    '@type': 'Place',
                    'devices': ids,
                    '_id': place._id
                };
                place.patch(dataToSend).then(function () {
                    $rootScope.$broadcast('refresh@deviceList');
                    place.devices = ids; //We update the local copy of place with the new devices
                    Notification.success('Devices moved to place ' + place.label + '.')
                }, function (data) {
                    console.log(data);
                    Notification.error('We could not move the computers.');
                });
            };

            //$scope.$watchCollection($scope.places)


            $scope.isSelected = function (place_id) {
                return place_id == $scope.selected_id;
            };
        }
    }
}

module.exports = placeNavDirective;