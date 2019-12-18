/**
 *
 * @param $scope
 * @param {module:fields} fields
 * @param {module:android} android
 */
function shareDeliveryCtrl (Notification, $scope, fields, $state, web3, $stateParams) {
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
        devices: devices,
        receiver: receiver
      }
      web3.post(dataWEB3).then(function () {
        Notification.success('Info shared with web3')
      }).catch(function (error) {
        Notification.error('We could not share info with web')
        throw error
      })

      lot.transfer_state = 'Initiated'
      lot.receiver_id = receiver

      return lot.patch('transfer_state', 'receiver_id').then(function () {
        Notification.success('Lot  patched')
      }).catch(function (error) {
        Notification.error('We could not patch lot. Error:' + JSON.stringify(error))
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

