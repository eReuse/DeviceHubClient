/**
 *
 * @param {module:dh-modal-provider} dhModal
 * @param {module:resources} resources
 */
function manualActionsButton (dhModal, resources, $state) {
  return {
    template: require('./manual-actions-button.directive.html'),
    restrict: 'E',
    scope: {
      devices: '='
    },
    /**
     * @param {$scope} $scope
     * @param {module:resources.Device[]} $scope.devices
     */
    link: $scope => {
      $scope.actions = [
        resources.ToPrepare,
        resources.Prepare,
        resources.ToRepair,
        resources.Available,
        resources.ToDisposeProduct,
        resources.Receive
      ]
      $scope.open = Action => {
        const action = new Action({devices: $scope.devices})
        $state.go('.newAction', {action: action})
      }
    }
  }
}

module.exports = manualActionsButton
