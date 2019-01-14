/**
 *
 * @param {module:fields} fields
 * @param {module:android} android
 * @param {module:enums} enums
 * @param {module:workbenchGetter} workbenchGetter
 */
function workbenchLinkCtl (fields, $scope, android, enums, workbenchGetter, $stateParams) {
  /** @type {module:resources.Snapshot} */
  const usb = $scope.usb = $stateParams.usb

  /**
   * Integrates the Android tag scanning with the Workbench
   * Link form.
   */
  class AndroidTag {
    constructor () {
      try {
        android.app.startNFC(this.setTagFactory(0))
        $scope.$on('$destroy', () => {
          android.app.stopNFC()
        })
      } catch (e) {
        if (!(e instanceof android.NoAndroidApp)) throw e
      }
    }

    addonRightScan (tagNum) {
      return android.app.exists ? {
        onClick: () => {
          // Code tagNum as the last char of the event name
          android.app.scanBarcode(this.setTagFactory(tagNum))
        },
        class: 'fa fa-camera'
      } : null
    }

    /**
     * @param {number} tagNum
     */
    setTagFactory (tagNum) {
      return tag => {
        let id
        try {
          const url = new URL(tag)
          id = url.pathname.substring(1) // Remove initial slash
        } catch (e) {
          id = tag
        }
        $scope.form.model.device.tags[tagNum] = {id: id}
      }
    }
  }

  const androidTag = new AndroidTag()

  class WLForm extends fields.Form {
    constructor (...params) {
      super(...params)
      this.patcher = new workbenchGetter.WorkbenchGetter('snapshots/')
    }
    submit () {
      // todo is valid and prepare...
      this.model.device.tags.forEach(tag => (tag.type = 'Tag'))
      this.patcher.patch(this.model, usb.uuid).then($scope.back)
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
      addonRight: androidTag.addonRightScan(0)
    }),
    new fields.String('device.tags[1].id', {
      namespace: ns,
      keyText: 'tag1',
      addonRight: androidTag.addonRightScan(1)
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
