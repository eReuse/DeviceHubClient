/**
 *
 * @param $scope
 * @param {module:fields} fields
 * @param {module:android} android
 */
function shareDeliveryCtrl (Notification, $scope, fields, $state, $stateParams) {
  const devices = $scope.devices = $stateParams.devices
  const lot = $scope.lot = $stateParams.lot
  const trade = lot.trade

  function leave () {
    return $state.go('auth.inventory')
  }

  class ShareTradeForm extends fields.Form {
    constructor () {
      super({})
    }

    _submit () {  
      trade.transfer_state = 'Initiated'
      return trade.patch('transfer_state')
    }

    _success (...args) {
      super._success(...args)
      return leave()
    }

    cancel () {
      return leave()
    }
  }

  $scope.form = new ShareTradeForm()
}

module.exports = shareTradeCtrl

