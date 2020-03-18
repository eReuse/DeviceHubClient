/**
 *
 * @param {module:dh-modal-provider} dhModal
 * @param {module:resources} resources
 */
function manualActionsButton (dhModal, resources, $state, session) {
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
        'newAction.button.physical',
        resources.ToPrepare,
        resources.Prepare,
        resources.ToRepair,
        resources.Ready,
        
        /*
        'newAction.button.political',
        resources.MakeAvailable,
        resources.Rent,
        resources.CancelTrade,
        'newAction.button.other',
        resources.Receive
        */
      ]
      $scope.proofs = [
        'newAction.button.proofs',
        resources.ProofDataWipe,
        resources.ProofFunction,
        resources.ProofReuse,
        resources.ProofRecycling,
      ]
      $scope.open = Action => {
        const action = new Action({devices: $scope.devices})
        $state.go('.newAction', {action: action})
      }

      $scope.openProof = Proof => {
        const proofs = []
        
        const devices = $scope.devices.filter((device) => {
          const proof = Proof.createFromDevice(device, session.user.ethereum_address)
          if (proof) {
            proofs.push(proof)
            return true
          } else {
            return false
          }
        })

        const batch = new resources.BatchProof({ devices: devices, proofs: proofs })
        $state.go('.newAction', {action: batch})
      }
    }
  }
}

module.exports = manualActionsButton
