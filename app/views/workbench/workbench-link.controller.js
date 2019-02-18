/**
 *
 * @param {module:fields} fields
 * @param {module:android} android
 * @param {module:enums} enums
 * @param {module:server} server
 */
function workbenchLinkCtl (fields, $scope, android, enums, server, $stateParams) {
  /** @type {module:resources.Snapshot} */
  const usb = $scope.usb = $stateParams.usb

  const androidTag = new android.Tag($scope, 'device.tags[0].id')

  /**
   * @class
   * @extends module:fields.Form
   */
  class WLForm extends fields.Form {
    constructor (...params) {
      super(...params)
      // We patch without passing auth header
      this.workbench = new server.Workbench('snapshots/')
    }

    _submit () {
      this.model.device.tags.forEach(tag => (tag.type = 'Tag'))
      return this.workbench.patch(this.model, usb.uuid)
    }

    _success (...args) {
      $scope.back()
      return super._success(...args)
    }

    cancel () {
      window.history.back()
    }
  }

  const ns = 'workbench.link'
  const nsObj = {namespace: ns}

  $scope.form = new WLForm(
    {
      device: {
        tags: [],
        events: [
          {
            type: 'WorkbenchRate'
          }
        ]
      }
    },
    new fields.String('device.tags[0].id', {
      namespace: ns,
      keyText: 'tag0',
      addonRight: androidTag.addonRightScan('device.tags[0].id')
    }),
    new fields.String('device.tags[1].id', {
      namespace: ns,
      keyText: 'tag1',
      addonRight: androidTag.addonRightScan('device.tags[1].id')
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
    }),
    new fields.Radio('device.events[0].biosRange', {
      namespace: ns,
      keyText: 'bios',
      options: enums.BiosRange.options(fields)
    }),
    new fields.Textarea('description', nsObj)
  )

  $scope.back = () => {
    window.history.back()
  }
}

module.exports = workbenchLinkCtl
