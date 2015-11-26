/**
 * Created by busta on 3/11/2015.
 */


angular.module('Places',['ui.bootstrap','Device','ngAnimate','uiGmapgoogle-maps', 'ngGeolocation'] )
    .directive('placeNavWidget', ['Restangular','$rootScope','$modal', function (Restangular, $rootScope,$modal) {
        return {
            templateUrl: 'app/places/placeNavWidget.html',
            restrict: 'E',
            scope:{},
            css: 'app/places/places.css',
            link: function ($scope, $element, $attrs) {
                var getPlaces = function(){
                    Restangular.all('places').getList().then(function(data){
                        $scope.places = data;
                        $rootScope.$broadcast('get@placeNavWidget', data);
                    });
                };
                getPlaces();
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
                    getPlaces();
                });

                //$scope.$watchCollection($scope.places)





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
        var configMap = function(center, path, st){

            $scope.map = {
                center: center,
                zoom: 19
            };

            $scope.polygons = [
                {
                    id: 1,
                    path: path,
                    stroke: {
                        color: '#6060FB',
                        weight: 3
                    },
                    editable: st,
                    draggable: st,
                    geodesic: false,
                    visible: true,
                    fill: {
                        color: '#ff0000',
                        opacity: 0.8
                    }
                }
            ];
        };

        var getPosition = function(){
            $geolocation.getCurrentPosition({
                timeout: 60000,
                maximumAge: 250,
                enableHighAccuracy: true
            }).then(function(position) {
                var margin = 0.0002;
                var path = [
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
                ];
                var center = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                configMap(center, path, true);
            });


        };

        var getCenter = function(geo){
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i<geo.length; i++) {
                bounds.extend(new google.maps.LatLng(geo[i].latitude, geo[i].longitude));
            }
            return bounds.getCenter();
        };

        var useArea = false;
        if(place && place._id){
            $scope.newPlace = $.extend({}, place);
            $scope.title = 'Place ' + $scope.newPlace.label;
            var center = getCenter($scope.newPlace.geo);
            configMap({latitude: center.lat(), longitude: center.lng()}, $scope.newPlace.geo, false);
            useArea = true;
        }else{
            $scope.title = 'Create a new place';
            $scope.map = null;  //Map will take some time to load
            $scope.newPlace = {};
            getPosition(); //Configures map with user position and predefined polygon
        }

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
            var promise = place && place._id? place.patch(data) : Restangular.all('places').post(data);
            promise.then(function(data){
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