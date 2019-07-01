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
      /**
       * A factory for formly hide that shows the resource if it is
       * a subclass of 'type'.
       * @param {typeof module:resources.Thing} keyResource
       * @return {function(): boolean}
       */
      const showIfSubclassFactory = keyResource => {
        return () => {
          const r = resources[this.model.device.type]
          return !(keyResource.isPrototypeOf(r) || r === keyResource)
        }
      }

      super(
        {
          device: {
            type: 'Device',
            tags: [],
            actions: [
              {
                type: 'VisualTest'
              }
            ]
          }
        },
        new fields.Select('device.type', {
          namespace: ns,
          keyText: 'type',
          required: true,
          options: resources.Device.options(fields.Option, true, false)
        }),
        new fields.String('device.tags[0].id', {
          namespace: ns,
          keyText: 'tag0',
          addonRight: tag.addonRightScan('device.tags[0].id')
        }),
        new fields.String('device.serialNumber', {
          required: true,
          namespace: ns,
          keyText: 'serialNumber',
          addonRight: tag.addonRightScan('device.serialNumber')
        }),
        new fields.String('device.model', {
          required: true,
          namespace: ns,
          keyText: 'model',
          addonRight: tag.addonRightScan('device.model')
        }),
        new fields.String('device.manufacturer', {
          required: true,
          namespace: ns,
          keyText: 'manufacturer',
          addonRight: tag.addonRightScan('device.manufacturer')
        }),
        new fields.Radio('device.actions[0].appearanceRange', {
          namespace: ns,
          keyText: 'appearance',
          options: enums.AppearanceRange.options(fields),
          required: true
        }),
        new fields.Radio('device.actions[0].functionalityRange', {
          namespace: ns,
          keyText: 'appearance',
          options: enums.FunctionalityRange.options(fields),
          required: true
        }),
        new fields.Select('device.chassis', {
          namespace: ns,
          options: enums.Chassis.options(fields),
          required: true,
          hide: showIfSubclassFactory(resources.Computer)
        }),
        new fields.Number('device.imei', {
          namespace: 'r',
          hide: showIfSubclassFactory(resources.Mobile)
        }),
        new fields.String('device.meid', {
          namespace: 'r',
          hide: showIfSubclassFactory(resources.Mobile)
        }),
        new fields.Select('device.layout', {
          namespace: 'r',
          options: enums.Layouts.options(fields),
          hide: showIfSubclassFactory(resources.Keyboard)
        })
      )
    }

    _submit () {
      this.model._useCache = false
      this.model.software = 'Web'
      this.model.version = '11.0'
      if (!_.isEmpty(this.model.tags)) this.model.tags[0].type = 'Tag'
      const snapshot = new resources.Snapshot(this.model, {_useCache: false})
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

