function typeDevices (resourceServerAggregations) {
  const Naming = require('./../../../utils').Naming
  const server = resourceServerAggregations('devices', 'types')
  return {
    templateUrl: require('./__init__').PATH + '/type-devices.directive.html',
    restrict: 'E',
    scope: {},
    link: {
      pre: $scope => {
        $scope.state = {
          labels: [],
          data: [],
          options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {display: true, position: 'right', fullWidth: false}
          }
        }
        server.getList().then(items => {
          $scope.state.labels = _.map(items, x => Naming.humanize(x['@type']))
          $scope.state.data = _.map(items, 'count')
        })
      }
    }
  }
}

module.exports = typeDevices
