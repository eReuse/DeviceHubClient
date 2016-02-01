'use strict';
function placeNavDirective (Restangular, $rootScope, $uibModal) {
    return {
        templateUrl: window.COMPONENTS + '/place/place-nav.directive.html',
        restrict: 'E',
        scope: {},
        link: function ($scope) {
            var getPlaces = function () {
                Restangular.all('places').getList().then(function (data) {
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
            $scope.$on('refresh@places', getPlaces);
            $scope.$on('refresh@deviceHub', getPlaces);
            $scope.$on('selectedDevices@deviceList', function(event, devices){
               $scope.devices = devices;
            });

            $scope.moveDevices = function(place, newDevices){
                var oldDevices = place.devices || [];
                var ids = [];
                var error=false; //todo fix this. Use devices in places without embedding
                oldDevices.concat(newDevices).forEach(function(device){
                    if(device['@type'] != 'Computer'){
                        alert('For now, you can just move computers. Deselect any other device.');
                        error=true;
                    }
                    ids.push(device._id)
                });
                if(error) return;
                var dataToSend = {
                    '@type': 'Place',
                    'devices': ids,
                    '_id': place._id
                };

                place.patch(dataToSend).then(function(){
                    $rootScope.$broadcast('refresh@deviceList');
                }, function(data){
                    console.log(data);
                    alert('We could not move the computers');
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