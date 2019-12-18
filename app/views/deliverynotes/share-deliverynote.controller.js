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
        new fields.String('ethereumAddress', {
          namespace: 'r',
        })
      )
    }

    _submit () {
      let receiver = this.model.ethereumAddress
      let dataWEB3 = {
        sender: session.user.ethereum_address,
        devices: devices,
        receiver: receiver
      }
      web3
      .initTransfer(dataWEB3)
      .then(function (deliverynote_address) {
        lot.author_id = session.user.id
        lot.transfer_state = 'Initiated'
        lot.receiver = receiver
        lot.deliverynote_address = deliverynote_address

        return lot.patch('transfer_state', 'receiver', 'author_id', 'deliverynote_address')
      })
      .catch(function (error) {
        Notification.error('Transfer could not be initiated '+ JSON.stringify(error))
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

