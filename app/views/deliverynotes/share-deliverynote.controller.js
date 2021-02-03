/**
 *
 * @param $scope
 * @param {module:fields} fields
 * @param {module:android} android
 */
function shareDeliveryCtrl (Notification, $scope, fields, $state, $stateParams) {
  const devices = $scope.devices = $stateParams.devices
  const lot = $scope.lot = $stateParams.lot
  const deliverynote = lot.deliverynote

  function leave () {
    return $state.go('auth.inventory')
  }

  class ShareDeliveryNoteForm extends fields.Form {
    constructor () {
      super({})
    }

    _submit () {  
      deliverynote.transfer_state = 'Initiated'
      return deliverynote.patch('transfer_state')
    }

    _success (...args) {
      super._success(...args)
      return leave()
    }

    cancel () {
      return leave()
    }
  }

  $scope.form = new ShareDeliveryNoteForm()
}

module.exports = shareDeliveryCtrl

