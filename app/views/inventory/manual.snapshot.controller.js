/**
 *
 * @param $scope
 * @param {module:fields} fields
 * @param {module:android} android
 */
function snapshotManualCtrl ($scope, android, fields, $state, enums, resources) {
  class ManualSnapshot extends fields.Form {
    constructor () {
      const tag = new android.Tag($scope, 'device.tags[0].id')
      const ns = 'snapshot.manual'
      super(
        {
          device: {
            type: 'Device',
            tags: [],
            events: [
              {
                type: 'ManualRate'
              }
            ]
          }
        },
        new fields.Select('device.type', {
          namespace: ns,
          keyText: 'type',
          required: true,
          options: resources.Device.options(fields.Option)
        }),
        new fields.String('device.tags[0].id', {
          namespace: ns,
          keyText: 'tag0',
          addonRight: tag.addonRightScan('device.tags[0].id')
        }),
        new fields.String('device.serialNumber', {
          namespace: ns,
          keyText: 'serialNumber',
          addonRight: tag.addonRightScan('device.serialNumber')
        }),
        new fields.String('device.model', {
          namespace: ns,
          keyText: 'model',
          addonRight: tag.addonRightScan('device.model')
        }),
        new fields.String('device.manufacturer', {
          namespace: ns,
          keyText: 'manufacturer',
          addonRight: tag.addonRightScan('device.manufacturer')
        }),
        new fields.Radio('device.events[0].appearanceRange', {
          namespace: ns,
          keyText: 'appearance',
          options: enums.AppearanceRange.options(fields),
          required: true
        }),
        new fields.Radio('device.events[0].functionalityRange', {
          namespace: ns,
          keyText: 'functionality',
          options: enums.FunctionalityRange.options(fields),
          required: true
        }))
    }

    _submit () {
      this.model._useCache = false
      this.model.software = 'Web'
      this.model.version = '11.0'
      if (!_.isEmpty(this.model.tags)) this.model.tags[0].type = 'Tag'
      const snapshot = new resources.Snapshot(this.model)
      return snapshot.post()
    }

    _success (...args) {
      super._success(...args)
      this.reset()
    }

    cancel () {
      $state.go('^')
    }
  }

  $scope.form = new ManualSnapshot()
}

module.exports = snapshotManualCtrl

