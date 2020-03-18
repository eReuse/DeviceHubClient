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
  const receiver_address = deliverynote.receiver.ethereum_address
  const supplier_address = deliverynote.supplier.ethereum_address

  function leave () {
    return $state.go('auth.inventory')
  }

  class ShareDeliveryNoteForm extends fields.Form {
    constructor () {
      super(
        {}
      )
    }


    _submit () {
      const dataWEB3 = {
        sender: supplier_address,
        devices: devices,
        receiver_address: receiver_address
      }

      return web3
      .initTransfer(dataWEB3)
      .then(function (response) {
        const deliverynote_address = response.deliverynote_address
        const deviceIDToAddressHash = response.device_addresses
        
        // parallel PATCH
        let promises = devices.map((device) => {
          device.ethereumAddress = deviceIDToAddressHash[device.id]
          return device.patch('ethereumAddress')
        })
        
        deliverynote.transfer_state = 'Initiated'
        deliverynote.ethereum_address = deliverynote_address
        promises.push(deliverynote.patch('transfer_state', 'ethereum_address'))

        return Promise.all(promises)
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

