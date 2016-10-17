function maps (geolocation, geoParsers, uiGmapGoogleMapApi) {
  return {
    templateUrl: window.COMPONENTS + '/geo/maps.directive.html',
    restrict: 'E',
    scope: {
      getUserPosition: '@',
      coordinates: '=', // In geoJSON
      disabled: '='
    },
    link: function ($scope, $element, $attrs) {
      $scope.disabled = $scope.disabled || false
      $scope.mapConfig = null // Map will take some time to load
      var useUserPosition = $scope.getUserPosition === 'true'
      if (!_.isEmpty($scope.coordinates.coordinates)) {
        uiGmapGoogleMapApi.then(function () { // Once the api is loaded
          var center = getCenter($scope.coordinates.coordinates)
          $scope.mapConfig = getMapConfig({
            latitude: center.lat(),
            longitude: center.lng()
          }, $scope.coordinates, !$scope.disabled)
        })
      } else {
        $scope.newPlace = {}
        if (useUserPosition) {
          getUserPosition(true, geolocation).then(function () {
            angular.copy(geoParsers.mapPolygonToGeoJSON(geolocation.path), $scope.coordinates)
            uiGmapGoogleMapApi.then(function () {
              $scope.mapConfig = getMapConfig(geolocation.center, $scope.coordinates, !$scope.disabled)
            })
          })
        }
      }
    }
  }
}

function getUserPosition (highAccuracy, geolocation) {
  return geolocation.getUserPosition(highAccuracy).then(function () {
  }, function () {
    geolocation.getDummyPosition()
    return true
  })
}

function getMapConfig (center, path, st) {
  return {
    map: {
      center: center,
      zoom: 19
    },
    op: {
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

function getCenter (geoJsonPolygon) {
  var bounds = new window.google.maps.LatLngBounds()
  var firstRing = geoJsonPolygon[0]
  firstRing.forEach(function (coords) {
    bounds.extend(new window.google.maps.LatLng(coords[1], coords[0]))
  })
  return bounds.getCenter()
}

module.exports = maps
