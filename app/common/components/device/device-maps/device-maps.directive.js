var CLUSTER_OPTIONS = {
  'title': 'Click to see more devices.',
  'gridSize': 60,
  'ignoreHidden': true,
  'minimumClusterSize': 2
}

function DeviceMaps () {
  return {
    templateUrl: require('./__init__').PATH + '/device-maps.directive.html',
    restrict: 'E',
    scope: {
      devices: '='
    },
    link: function ($scope, $element, $attrs) {
      $scope.models = $scope.devices
      $scope.clusterOptions = CLUSTER_OPTIONS
      $scope.center = {latitude: 47.61, longitude: -122.35}
      $scope.zoom = 4
      //var getModel = getModelFactory($scope)
      //$scope.$watchCollection(function () { return $scope.devices}, getModel)
      //getModel($scope.devices)
      /*ensureMapIsDisplayed($scope)*/
    }
  }
}

function getModelFactory ($scope) {
  return function getModel (newDevices) {
    $scope.models.length = 0
    _.forEach(newDevices, function (device) {
      var model = _.cloneDeep(device)
      var point = _.find(model['events'], function (event) {
        return 'geo' in event
      })
      try {
        model['geo'] = point['geo']
        $scope.models.push(model)
      } catch (error) {}
    })
  }
}

/**
 * Ensures, when displaying the map for second time, that this is showed, as there is a bug that prevents so.
 */
function ensureMapIsDisplayed ($scope) {
  $scope.control = {} //angular-google-maps populates this
  setTimeout(function () {
    window.google.maps.event.trigger($scope.control.getGMap(), 'resize')
  }, 300)
}

module.exports = DeviceMaps
