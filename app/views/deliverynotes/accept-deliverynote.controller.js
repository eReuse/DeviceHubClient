/**
 *
 * @param $scope
 * @param {module:fields} fields
 * @param {module:android} android
 */
function shareDeliveryCtrl (Notification, $scope, fields, $state, web3, $stateParams, session, resources) {
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
        new fields.String('deposit', {
          namespace: 'acceptTransfer.form',
        })
      )
    }

    _submit () {
      const deposit = this.model.deposit

      console.log('lot.id', lot.id, 'lot.deliverynote_address', lot.deliverynote_address)

      const dataWEB3 = {
        deliverynote_address: lot.deliverynote_address,
        devices: devices,
        deposit: deposit,
        receiver_address: session.user.ethereum_address
      }
    
      return web3
      .acceptTransfer(dataWEB3)
      .then(function () {
        deliverynote.deposit = deposit // TODO this should already be set when POSTing the deliverynote
        deliverynote.transfer_state = 'Accepted'
        deliverynote.owner_address = session.user.ethereum_address // TODO this should be done on the server

        return deliverynote.patch('transfer_state', 'deposit', 'owner_address')
      })
      .then(function () {
        const proofData = {
          devices: devices,
          supplier: deliverynote.supplier,
          receiver: deliverynote.receiver,
          deposit: deliverynote.deposit
        }
        const action = new resources.ProofTransfer(proofData)
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
      return leave()
    }

    cancel () {
      return leave()
    }
  }

  $scope.form = new ShareDeliveryNoteForm()
}

module.exports = shareDeliveryCtrl

