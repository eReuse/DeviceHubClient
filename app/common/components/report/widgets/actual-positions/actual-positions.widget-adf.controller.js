function actualPositionsWidgetAdfController ($scope, Restangular) {
  $scope.response = Restangular.all('aggregations').all('events').one('actual_positions').get().$object
  $scope.clusterOptions = {
    'title': 'Click to see more devices.',
    'gridSize': 60,
    'ignoreHidden': true,
    'minimumClusterSize': 2
  }
  $scope.center = {latitude: 53.5206, longitude: 11.4232}
  $scope.zoom = 4
}

module.exports = actualPositionsWidgetAdfController
