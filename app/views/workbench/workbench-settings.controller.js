/**
 *
 * @param $scope
 * @param {module:workbenchGetter} workbenchGetter
 * @param {module:fields} fields
 * @param {module:enums} enums
 * @param {module:resources}
 */
function workbenchSettings ($scope, fields, workbenchGetter, enums, resources, Notification, $translate) {
  const namespace = 'workbench.settings'

  class WorkbenchSettingsForm extends fields.Form {
    submit () {
      console.log('yeah')
      Notification.success($translate.instant(`${namespace}.notification.ok`))
      window.history.back()
    }
  }

  const defaultModel = {
    stress: 1,
    smart: 'short',
    _erase: null,
    erase: resources.EraseSectors.type,
    erase_steps: 1,
    erase_leading_zeros: false,
    install: null
  }

  function defineForm (model) {
    const nObj = {namespace: namespace}
    const erasureHideExpression = `model._erase !== 'custom'`
    $scope.form = new WorkbenchSettingsForm(
      _.defaults(model, defaultModel),
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
        namespace: namespace
      }),
      new fields.Radio('erase', {
        options: [
          new fields.Option(resources.EraseBasic.type, nObj),
          new fields.Option(resources.EraseSectors.type, nObj)
        ],
        hide: erasureHideExpression,
        namespace: namespace
      }),
      new fields.Number('erase_steps', {
        min: 1,
        max: 100,
        step: 1,
        addonRight: fields.Number.ADDON_RIGHT.Text,
        hide: erasureHideExpression,
        namespace: namespace
      }),
      new fields.Radio('erase_leading_zeros', {
        options: [fields.Yes, fields.No],
        hide: erasureHideExpression,
        namespace: namespace
      }),
      new fields.Radio('install', nObj)
    )
  }

  const settingsGetter = new workbenchGetter.WorkbenchGetter('config')
  const imagesGetter = new workbenchGetter.WorkbenchGetter('config/images')
  settingsGetter.get().then(response => {
    defineForm(response.data)
    imagesGetter.start().then(null, null, response => {
      // It seems poller reuses response.data and push gets multiplied over time
      _.last($scope.form.fields).templateOptions.options = [{
        value: null,
        name: 'Do not install an OS.'
      }].concat(response.data)
    })
  })

  $scope.$on('$destroy', () => {
    imagesGetter.stop()
  })

}

module.exports = workbenchSettings
