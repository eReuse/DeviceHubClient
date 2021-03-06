/**
 *
 * @param {module:fields} fields
 * @param {module:android} android
 * @param {module:enums} enums
 * @param {module:server} server
 */
function workbenchLinkCtl (fields, $scope, android, enums, server, $stateParams) {
  /** @type {module:resources.Snapshot} */
  const uuid = $scope.uuid = $stateParams.uuid

  const androidTag = new android.Tag($scope, 'tags[0].id')

  /**
   * @class
   * @extends module:fields.Form
   */
  class WLForm extends fields.Form {
    constructor (...params) {
      super(...params)
      // We patch without passing auth header
      this.workbench = new server.Workbench(`snapshots/${uuid}/form/`)
    }

    _submit () {
      this.model.tags.forEach(tag => (tag.type = 'Tag'))
      if (_.isPresent(this.model.rate)) {
        this.model.rate.type = 'VisualTest'
      }
      return this.workbench.post(this.model)
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
      tags: []
    },
    new fields.String('tags[0].id', {
      namespace: ns,
      keyText: 'tag0',
      addonRight: androidTag.addonRightScan('tags[0].id')
    }),
    new fields.String('tags[1].id', {
      namespace: ns,
      keyText: 'tag1',
      addonRight: androidTag.addonRightScan('tags[1].id')
    }),
    new fields.Radio('rate.appearanceRange', {
      namespace: ns,
      keyText: 'appearance',
      options: enums.AppearanceRange.options(fields),
      required: true
    }),
    new fields.Radio('rate.functionalityRange', {
      namespace: ns,
      keyText: 'functionality',
      options: enums.FunctionalityRange.options(fields),
      required: true
    }),
    new fields.Radio('rate.biosRange', {
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
