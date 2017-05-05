function DeviceMaps () {
  const CLUSTER_OPTIONS = {
    'title': 'Click to see more devices.',
    'gridSize': 60,
    'ignoreHidden': true,
    'minimumClusterSize': 2
  }
  return {
    templateUrl: require('./__init__').PATH + '/device-maps.directive.html',
    restrict: 'AE',
    scope: {
      resources: '='
    },
    link: $scope => {
      $scope.models = []
      $scope.clusterOptions = CLUSTER_OPTIONS
      $scope.center = {latitude: 53.5206, longitude: 11.4232}
      $scope.zoom = 4

      function getModel (resources) {
        $scope.models = _(resources).map(resource => {
          try {
            const point = _.find(resource['events'], 'geo')
            const geo = {geo: point['geo']}
            return _.assign({}, resource, geo)
          } catch (e) {}
        }).compact().value()
      }

      $scope.$watchCollection('resources', getModel)
      getModel($scope.resources)

      // Ensures, when displaying the map for second time, that this is showed, as there is a bug that prevents so.
      $scope.control = {} // angular-google-maps populates this
      setTimeout(() => { window.google.maps.event.trigger($scope.control.getGMap(), 'resize') }, 300)
    }
  }
}

module.exports = DeviceMaps
