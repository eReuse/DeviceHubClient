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
        new fields.String('deposit', {
          namespace: 'r',
        })
      )
    }

    _submit () {
      let deposit = this.model.deposit

      let dataWEB3 = {
        devices: devices,
        deposit: deposit
      }
      web3.post(dataWEB3).then(function () {
        Notification.success('Info shared with web3')
      }).catch(function (error) {
        Notification.error('We could not share info with web')
        throw error
      })

      lot.transfer_state = 'Accepted'
      lot.deposit = deposit

      return lot.patch('transfer_state', 'deposit').then(function () {
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

