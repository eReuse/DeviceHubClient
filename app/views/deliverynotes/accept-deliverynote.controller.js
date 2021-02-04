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
 
  class AcceptDeliveryNoteForm extends fields.Form {
    constructor () {
      super({})
    }

    _submit () {
      // TODO here Trade Action should be POSTed for all registered devices in the lot of the deliverynote
      // example:
      // devices = deliverynote.lot.devices
      // new Trade({ devices: devices, supplier: deliverynote.supplier, receiver: deliverynote.receiver).post()

      deliverynote.transfer_state = 'Accepted '
      return deliverynote.patch('transfer_state').then(function () {
        return Notification.success('Successfully accepted transfer')
      })
      .catch(function (error) {
        Notification.error('Transfer could not be accepted' + error.message)
        throw error
      })
    }

    _success (...args) {
      super._success(...args)
      return leave()
    }

    cancel () {
      return leave()
    }
  }

  $scope.form = new AcceptDeliveryNoteForm()
}

module.exports = shareDeliveryCtrl

