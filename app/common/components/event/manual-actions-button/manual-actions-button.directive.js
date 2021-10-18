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
        'newAction.button.status',
	resources.Recycling,
        resources.Use,
	resources.Refurbish,
	resources.Management,
        'newAction.button.allocate',
        resources.Allocate,
        resources.Deallocate,
        'newAction.button.physical',
        resources.ToPrepare,
        resources.Prepare,
	resources.DataWipe,
        resources.ToRepair,
        resources.Ready,
        /** todo new-trade: add new device actions here */
        /*
        'newAction.button.political',
        resources.MakeAvailable,
        resources.Rent,
        'newAction.button.other',
        resources.Receive
        */
      ]
      const ids_revoke = new Set($scope.devices.map(d => {
	return d.revoke
      }))

      const state_trade = new Set($scope.devices.map(d => {
	return d.trading
      }))

      if ($scope.trade != null && state_trade.size == 1) {
        $scope.elements.push('newAction.button.trade')

        if (state_trade.has('NeedConfirmation')) {
          $scope.elements.push(resources.Confirm)
	}

        if (state_trade.has('Confirm') | state_trade.has('TradeConfirmed')) {
          $scope.elements.push(resources.Revoke)
	}

        if (state_trade.has('Revoke') && !ids_revoke.has(null) && ids_revoke.size == 1) {
          $scope.elements.push(resources.ConfirmRevoke)
  	  $scope.open = Action => {
	    const action = new Action({
		devices: $scope.devices, 
		action: $scope.devices[0].revoke
	    })
	    $state.go('.newAction', {action: action})
 	  }
 	}
        $scope.open = Action => {
          const action = new Action({
	        devices: $scope.devices,
		action: $scope.trade.id
	  })
          $state.go('.newAction', {action: action})
	}

      } else {
	$scope.open = Action => {
	  const action = new Action({devices: $scope.devices})
	  $state.go('.newAction', {action: action})
        }
      }
    }
  }
}

module.exports = manualActionsButton
