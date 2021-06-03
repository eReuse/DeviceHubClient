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
      trade: '=',
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
        'newAction.button.trade',
        /*
        'newAction.button.political',
        resources.MakeAvailable,
        resources.Rent,
        'newAction.button.other',
        resources.Receive
        */
      ]
      
      /** TODO new-trade: add new device actions here 
       *  note that this logic should probably be on the server instead, so that here we only check "showTradeButton", etc.
        */
      if(!$scope.elements.unconfirmedTrade) {
        $scope.elements.push(resources.Trade)
      }
      if($scope.elements.unconfirmedTrade) {
        $scope.elements.push(resources.Confirm)
      }
      /* TODO new-trade: do like above for 
      confirmedTrade && unrevokedConfirm => resources.Revoke
      unconfirmedRevoke => resources.ConfirmRevoke
      */
      
      $scope.open = Action => {
        const action = new Action({
          devices: $scope.devices, 
          tradeOfCurrentLot: $scope.trade
        })
        /* TODO new-trade: 
          instead of action pass 
          unconfirmedTrade, confirmedTrade, unrevokedConfirm, unconfirmedRevoke */
        $state.go('.newAction', {action: action})
      }
    }
  }
}

module.exports = manualActionsButton
