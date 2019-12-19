/**
 *
 * @param $scope
 * @param {module:fields} fields
 * @param {module:android} android
 */
function shareDeliveryCtrl (Notification, $scope, fields, $state, web3, $stateParams, session) {
  const devices = $scope.devices = $stateParams.devices
  const lot = $scope.lot = $stateParams.lot
 
  class ShareDeliveryNoteForm extends fields.Form {
    constructor () {
      super(
        {},
        new fields.String('deposit', {
          namespace: 'r',
        })
      )
    }

    _submit () {
      const deposit = this.model.deposit

      const dataWEB3 = {
        deliverynote_address: lot.deliverynote_address,
        devices: devices,
        deposit: deposit,
        receiver_address: session.user.ethereum_address
      }
      
      return web3
      .acceptTransfer(dataWEB3)
      .then(function () {
        lot.deposit = deposit
        lot.transfer_state = 'Accepted'
        lot.owner_address = session.user.ethereum_address

        return lot.patch('transfer_state', 'deposit', 'owner_address')
      })
      .then(function () {
        const action = new resources.Trade({devices: $scope.devices})
        return action.post()      
      })
      .then(function () {
        return Notification.success('Successfully accepted transfer')
      })
      .catch(function (error) {
        Notification.error('Transfer could not be accepted' + error.message)
        throw error
      })
    }

    _success (...args) {
      super._success(...args)
      this.reset()
    }

    cancel () {
      $state.go('^')
    }
  }

  $scope.form = new ShareDeliveryNoteForm()
}

module.exports = shareDeliveryCtrl

