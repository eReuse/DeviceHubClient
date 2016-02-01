'use strict';
var sjv = require('simple-js-validator');

function maps(geolocation, geoParsers, $q){
    return {
        templateUrl: window.COMPONENTS + '/geo/maps.directive.html',
        restrict: 'E',
        scope: {
            geoJSON: '@', //todo use actually the value. Now we suppose is true always.
            getUserPosition: '@',
            coordinates: '=' //In geoJSON
        },
        link: function ($scope, $element, $attrs) {
            $scope.mapConfig = null; //Map will take some time to load
            var useUserPosition = $scope.getUserPosition == "true";
            if(sjv.isNotEmpty($scope.coordinates.coordinates)){
                var center = getCenter(coords.maps);
                $scope.mapConfig = getMapConfig({latitude: center.lat(), longitude: center.lng()}, $scope.coordinates, false);
            }
            else {
                $scope.newPlace = {};
                if(useUserPosition){
                    getUserPosition(true, geolocation).then(function(){
                        angular.copy(geoParsers.mapPolygonToGeoJSON(geolocation.path), $scope.coordinates);
                        $scope.mapConfig = getMapConfig(geolocation.center, $scope.coordinates, true);
                    });
                }
            }
        }
    }
}

function getUserPosition(highAccuracy, geolocation){
    return geolocation.getUserPosition(highAccuracy).then(function(){
    }, function(){
        geolocation.getDummyPosition();
        return true;
    });
}

function getMapConfig(center, path, st){
    return {
        map: {
            center: center,
            zoom: 19
        },
        op:
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

    }
}

function getCenter(geo){
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i<geo.length; i++)
        bounds.extend(new google.maps.LatLng(geo[i].latitude, geo[i].longitude));
    return bounds.getCenter();
}



module.exports = maps;