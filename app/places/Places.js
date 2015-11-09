/**
 * Created by busta on 3/11/2015.
 */


angular.module('Places',['ui.bootstrap','Device','ngAnimate','uiGmapgoogle-maps', 'ngGeolocation'] )
    .directive('placeNavWidget', ['Restangular','$rootScope','$modal', function (Restangular, $rootScope,$modal) {
        var getPlaces = function(){
          return Restangular.all('places').getList().$object;
        };
        return {
            templateUrl: 'app/places/placeNavWidget.html',
            restrict: 'E',
            scope:{},
            css: 'app/places/places.css',
            link: function ($scope, $element, $attrs) {
                $scope.places = getPlaces();
                $scope.broadcastSelectedPlace = function(place_id){
                    if ($scope.isSelected(place_id)){
                        $rootScope.$broadcast('unselectedPlace@placeNavWidget');
                        $scope.selected_id = null;
                    }
                    else {
                        $rootScope.$broadcast('selectedPlace@placeNavWidget', place_id);
                        $scope.selected_id = place_id;
                    }
                };
                $scope.$on('refresh@placeNavWidget', function(){
                    $scope.places = getPlaces();
                });

                $scope.isSelected = function(place_id){
                    return place_id == $scope.selected_id;
                };
                $scope.openModal = function(place){
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'app/places/placeModal.html',
                        controller: 'placeModalCtrl',
                        size: 'lg',
                        keyboard: true,
                        windowClass: 'modal-xl',
                        backdrop : 'static',
                        resolve: {
                            place: function(){return place}
                        }
                    });
                    modalInstance.result.then(function (selectedItem) {
                        $scope.selected = selectedItem;
                    }, function () {
                        // $log.info('Modal dismissed at: ' + new Date());
                    });
                };
            }
        }
    }])
    .controller('placeModalCtrl', ['$scope','$modalInstance','Restangular','place','$rootScope','$geolocation', function($scope,$modalInstance,Restangular,place,$rootScope,$geolocation) {
        $scope.place = place;
        try{$scope.title = 'Place ' + $scope.place['_id']}
        catch(err){$scope.title = 'Create a new place'}
        $scope.map = null;
        $scope.newPlace = {};
        var useArea = false;


        /*$scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };*/



        $geolocation.getCurrentPosition({
            timeout: 60000,
            maximumAge: 250,
            enableHighAccuracy: true
        }).then(function(position) {
            $scope.map = {
                center: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                zoom: 19
            };
            var margin = 0.0002;
            $scope.polygons = [
                {
                    id: 1,
                    path: [
                        {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        },
                        {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude+margin
                        },
                        {
                            latitude: position.coords.latitude+margin,
                            longitude: position.coords.longitude+margin
                        },
                        {
                            latitude: position.coords.latitude+margin,
                            longitude: position.coords.longitude
                        }
                    ],
                    stroke: {
                        color: '#6060FB',
                        weight: 3
                    },
                    editable: true,
                    draggable: true,
                    geodesic: false,
                    visible: true,
                    fill: {
                        color: '#ff0000',
                        opacity: 0.8
                    }
                }
            ];
        });
        $scope.upload = function(newPlace, polygons){
            console.log(newPlace);
            console.log(polygons[0].path);
            console.log(parseGMapCoordinatesToGeoJson(polygons[0].path));
            console.log($scope.useArea);
            var data = { //byUser is set by default
                label: newPlace.label,
                '@type': 'Place',
                type: newPlace.type
            };
            if(useArea){
                data.geo = {
                    type: 'Polygon',
                        coordinates: parseGMapCoordinatesToGeoJson(polygons[0].path)
                }
            }
            Restangular.all('places').post(data).then(function(data){
                $rootScope.$broadcast('refresh@placeNavWidget');
                $scope.cancel();
            }, function(error){
                alert(error._error.message);
            })
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.area = function(value){
            useArea = value;
        };
        var parseGMapCoordinatesToGeoJson = function(coords){
            var geojson = [];
            coords.forEach(function(coord, index, array){
                geojson.push([coord.longitude, coord.latitude])
            });
            geojson.push([coords[0].longitude, coords[0].latitude]); //GeoJSON needs the 1st and last coordinate to be the same
            return [geojson];  //GeoJSON holds a double list, for multipolygon (which we do not use)
        }
    }]);