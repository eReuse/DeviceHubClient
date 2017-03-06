function labelButton (dhModal) {
  return {
    templateUrl: require('./__init__').PATH + '/label-button.directive.html',
    restrict: 'E',
    scope: {
      devices: '='
    },
    link: $scope => {
      $scope.openModal = _.bind(dhModal.open, null, 'label', {devices: () => $scope.devices})
    }
  }
}

module.exports = labelButton
