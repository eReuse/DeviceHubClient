function reserveButton (ResourceSettings, dhModal) {
  return {
    template: require('./reserve-button.directive.html'),
    restrict: 'E',
    scope: {
      resources: '='
    },
    link: $scope => {
      $scope.ReserveSettings = ResourceSettings('devices:Reserve')

      $scope.openModal = require('./../open-event-modal')(ResourceSettings, dhModal)
    }
  }
}

module.exports = reserveButton
