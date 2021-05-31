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
      devices: '='
    },
    /**
     * @param {$scope} $scope
     * @param {module:resources.Device[]} $scope.devices
     */
    link: $scope => {
      $scope.elements = [
        'newAction.button.using',
        resources.Allocate,
        resources.Deallocate,
        'newAction.button.physical',
        resources.ToPrepare,
        resources.Prepare,
        resources.ToRepair,
        resources.Ready,
        /** TODO new-trade: add new device Actions here */
	resources.Trade,
        
        /*
        'newAction.button.political',
        resources.MakeAvailable,
        resources.Rent,
        resources.CancelTrade,
        'newAction.button.other',
        resources.Receive
        */
      ]
      $scope.open = Action => {
        const action = new Action({devices: $scope.devices})
        $state.go('.newAction', {action: action})
      }
    }
  }
}

module.exports = manualActionsButton
