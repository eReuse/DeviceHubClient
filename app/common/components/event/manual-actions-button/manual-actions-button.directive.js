/**
 *
 * @param {module:dh-modal-provider} dhModal
 * @param {module:resources} resources
 */
function manualActionsButton (dhModal, resources, $state, session, resourceFields) {
  return {
    template: require('./manual-actions-button.directive.html'),
    restrict: 'E',
    scope: {
      lot: '=',
      devices: '='
    },
    /**
     * @param {$scope} $scope
     * @param {module:resources.Device[]} $scope.devices
     */
    link: $scope => {
      $scope.elements = [
        'newaction.button.using',
        resources.allocate,
        resources.deallocate,
        'newaction.button.physical',
        resources.toprepare,
        resources.prepare,
        resources.torepair,
        resources.ready,
        /** todo new-trade: add new device actions here */
        'newaction.button.trade',
	resources.trade,
	resources.confirm,
	resources.revoke,
	resources.confirmrevoke,
        /*
        'newAction.button.political',
        resources.MakeAvailable,
        resources.Rent,
        'newAction.button.other',
        resources.Receive
        */
      ]
      $scope.open = Action => {
        const action = new Action({devices: $scope.devices, lot: $scope.lot})
        $state.go('.newAction', {action: action})
      }
    }
  }
}

module.exports = manualActionsButton
