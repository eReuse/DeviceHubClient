/**
 *
 * @param $scope
 * @param {module:fields} fields
 * @param {module:android} android
 */
function shareDeliveryCtrl (Notification, $scope, fields, $state, web3, $stateParams, session) {
  const devices = $scope.devices = $stateParams.devices
  const lot = $scope.lot = $stateParams.lot
  const deliverynote = lot.deliverynote

  function leave () {
    return $state.go('auth.inventory')
  }

  class ShareDeliveryNoteForm extends fields.Form {
    constructor () {
      super(
        {},
        new fields.String('ethereumAddress', {
          namespace: 'shareLot.form',
        })
      )
    }


    _submit () {
      let receiver_address = this.model.ethereumAddress
      let dataWEB3 = {
        sender: session.user.ethereum_address,
        devices: devices,
        receiver_address: receiver_address
      }

      return web3
      .initTransfer(dataWEB3)
      .then(function (deliverynote_address) {
        deliverynote.owner_address = session.user.ethereum_address // TODO this should already be set when POSTing the deliverynote
        deliverynote.transfer_state = 'Initiated'
        deliverynote.receiver_address = receiver_address // TODO this should already be set when POSTing the deliverynote
        deliverynote.ethereum_address = deliverynote_address

        return deliverynote.patch('transfer_state', 'receiver_address', 'owner_address', 'ethereum_address')
      })
      .catch(function (error) {
        Notification.error('Transfer could not be initiated '+ JSON.stringify(error))
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

  $scope.form = new ShareDeliveryNoteForm()
}

module.exports = shareDeliveryCtrl

