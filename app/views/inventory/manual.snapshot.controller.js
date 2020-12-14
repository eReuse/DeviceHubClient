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
      const showIfSubclassFactory = (...keyResources) => {
        return () => {
          const r = resources[this.model.device.type]
          return _.some(keyResources,
            keyResource => !(keyResource.isPrototypeOf(r) || r === keyResource)
          )
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
          options: resources.Device.options(fields.Option, true, false),
          required: true
        }),
        new fields.String('device.tags[0].id', {
          namespace: ns,
          keyText: 'tag0',
          addonRight: tag.addonRightScan('device.tags[0].id')
        }),
        new fields.String('device.serialNumber', {
          namespace: 'r',
          addonRight: tag.addonRightScan('device.serialNumber'),
          required: true
        }),
        new fields.String('device.model', {
          namespace: 'r',
          addonRight: tag.addonRightScan('device.model'),
          required: true
        }),
        new fields.String('device.manufacturer', {
          namespace: 'r',
          addonRight: tag.addonRightScan('device.manufacturer'),
          required: true
        }),
        new fields.Radio('device.actions[0].appearanceRange', {
          namespace: 'workbench.link',
          keyText: 'appearance',
          options: enums.AppearanceRange.options(fields)
        }),
        new fields.Radio('device.actions[0].functionalityRange', {
          namespace: 'workbench.link',
          keyText: 'functionality',
          options: enums.FunctionalityRange.options(fields)
        }),
        new fields.String('device.brand', {
          namespace: 'r'
        }),
        new fields.Number('device.generation', {
          namespace: 'r'
        }),
        new fields.String('device.version', {
          namespace: 'r'
        }),
        new fields.Number('device.weight', {
          namespace: 'r',
          addonRight: fields.Field.ADDON_RIGHT.Text
        }),
        new fields.Number('device.width', {
          namespace: 'r',
          addonRight: fields.Field.ADDON_RIGHT.Text
        }),
        new fields.Number('device.height', {
          namespace: 'r',
          addonRight: fields.Field.ADDON_RIGHT.Text
        }),
        new fields.String('device.depth', {
          namespace: 'r',
          addonRight: fields.Field.ADDON_RIGHT.Text
        }),
        new fields.String('device.variant', {
          namespace: 'r'
        }),
        new fields.String('device.sku', {
          namespace: 'r'
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
        new fields.Number('device.resolutionHeight', {
          namespace: 'r',
          hide: showIfSubclassFactory(resources.ComputerMonitor)
        }),
        new fields.Number('device.resolutionWidth', {
          namespace: 'r',
          hide: showIfSubclassFactory(resources.ComputerMonitor)
        }),
        new fields.Number('device.screensize', {
          namespace: 'r',
          hide: showIfSubclassFactory(resources.ComputerMonitor)
        }),
        new fields.String('device.meid', {
          namespace: 'r',
          hide: showIfSubclassFactory(resources.Mobile)
        }),
        new fields.Select('device.layout', {
          namespace: 'r',
          options: enums.Layouts.options(fields),
          hide: showIfSubclassFactory(resources.Keyboard)
        }),
        new fields.String('device.maxDrillBitSize', {
          namespace: 'r',
          hide: showIfSubclassFactory(resources.Drill)
        }),
        new fields.Number('device.size', {
          namespace: 'r',
          hide: showIfSubclassFactory(resources.PackOfScrewdrivers, resources.Drill),
          min: 0.1
        }),
        new fields.Number('device.maxAllowedWeight', {
          namespace: 'r',
          hide: showIfSubclassFactory(resources.Stairs),
          min: 1,
          addonRight: fields.Field.ADDON_RIGHT.Text
        }),
        new fields.Number('device.wheelSize', {
          namespace: 'r',
          hide: showIfSubclassFactory(resources.Bike),
          addonRight: fields.Field.ADDON_RIGHT.Text,
          min: 0.1
        }),
        new fields.Number('device.gears', {
          namespace: 'r',
          hide: showIfSubclassFactory(resources.Bike),
          min: 1
        }),
        new fields.URL('device.image', {
          namespace: 'r'
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

