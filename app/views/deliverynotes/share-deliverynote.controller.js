/**
 *
 * @param $scope
 * @param {module:fields} fields
 * @param {module:android} android
 */
function shareDeliveryCtrl ($scope, $window, fields, $state, enums, resources) {
  const XLSX = $window.XLSX
  
  class ShareDeliveryNoteForm extends fields.Form {
    constructor () {
      super(
        {
          id: "" //TODO set ID of deliveryNote
        },
        new fields.String('shareDeliveryNote.Email', {
          namespace: 'r',
        })
      )
    }

    _submit () {
      const devices = $scope.uploadedDevices && $scope.uploadedDevices.map((device) => {
        return new resources.Device(device)
      })
      const model = _.assign({ devices : devices }, this.model.deliveryNote)
      const deliveryNote = new resources.DeliveryNote(model, {_useCache: false})
      return deliveryNote.post()
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

