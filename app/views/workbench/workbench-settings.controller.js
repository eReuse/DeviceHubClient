/**
 *
 * @param $scope
 * @param {module:fields} fields
 * @param {module:enums} enums
 * @param {module:resources}
 * @param {$http} $http
 * @param {module:server} server
 */
function workbenchSettings ($scope, fields, enums, resources, Notification, $translate, server) {
  const namespace = 'workbench.settings'

  class WorkbenchSettingsForm extends fields.Form {
    constructor (model, ...args) {
      const defaultModel = {
        stress: 1,
        smart: 'short',
        _erase: null,
        erase: resources.EraseSectors.type,
        erase_steps: 1,
        erase_leading_zeros: false,
        install: null
      }
      model = _.defaults(model, defaultModel)
      const nObj = {namespace: namespace}
      const erasureHideExpression = `model._erase !== 'custom'`
      super(model,
        new fields.Radio('link', {
          options: [
            new fields.Option(true, {keyText: 'link.t', namespace: namespace}),
            new fields.Option(false, {keyText: 'link.f', namespace: namespace})
          ],
          namespace: namespace
        }),
        new fields.Number('stress', {
          min: 0,
          max: 100,
          step: 1,
          addonRight: fields.Number.ADDON_RIGHT.Text,
          namespace: namespace
        }),
        new fields.Radio('smart', {
          options: [
            new fields.Option(null, {keyText: 'smartNull', namespace: namespace}),
            new fields.Option('short', nObj),
            new fields.Option('long', nObj)
          ],
          namespace: namespace
        }),
        new fields.Radio('_erase', {
          options: [
            new fields.Option(null, {keyText: 'eraseNull', namespace: namespace}),
            new fields.Option('custom', {keyText: 'eraseCustom', namespace: namespace})
          ].concat(enums.ErasureStandard.options(fields)),
          namespace: namespace,
          onChange: function setErasureOptions () {
            const model = $scope.form.model
            if (!model._erase) {
              model.erase = null
            } else if (model._erase !== 'custom') {
              /** @type {module:enums.ErasureStandard} */
              const standard = enums.ErasureStandard[model._erase]
              model.erase = standard.mode
              model.erase_steps = standard.steps
              model.erase_leading_zeros = standard.leadingZeros
            }
          }
        }),
        new fields.Radio('erase', {
          options: [
            new fields.Option(resources.EraseBasic.type, nObj),
            new fields.Option(resources.EraseSectors.type, nObj)
          ],
          hide: erasureHideExpression,
          namespace: namespace
        }),
        new fields.Number('eraseSteps', {
          min: 1,
          max: 100,
          step: 1,
          addonRight: fields.Number.ADDON_RIGHT.Text,
          hide: erasureHideExpression,
          namespace: namespace
        }),
        new fields.Radio('eraseLeadingZeros', {
          options: [fields.Yes, fields.No],
          hide: erasureHideExpression,
          namespace: namespace
        }),
        new fields.Radio('install', nObj),
        ...args
      )
    }

    _submit (op) {
      return workbenchSettings.post(this.model)
    }

    _success (...args) {
      super._success(...args)
      window.history.back()
    }

    cancel () {
      window.history.back()
    }
  }

  $scope.form = new WorkbenchSettingsForm({})
  const workbenchSettings = new server.Workbench('settings/')
  const workbenchImages = new server.Workbench('settings/images/')
  workbenchSettings.get().then(response => {
    const model = $scope.form.model = response.data
    const ES = enums.ErasureStandard
    if (ES.find(model.erase, model.eraseSteps, model.eraseLeadingZeros) === ES.HMG_IS5) {
      model._erase = enums.ErasureStandard.HMG_IS5.value
    } else if (model.erase) {
      model._erase = 'custom'
    }

    workbenchImages.start().then(null, null, response => {
      // It seems poller reuses response.data and push gets multiplied over time
      _.last($scope.form.fields).templateOptions.options = [{
        value: null,
        name: 'Do not install an OS.'
      }].concat(response.data)
    })
  })

  $scope.$on('$destroy', () => {
    workbenchImages.stop()
  })
}

module.exports = workbenchSettings
