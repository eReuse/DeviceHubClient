const addonsTemplate = require('./addons.formly.html')

function formlyRun (formlyConfig) {
  formlyConfig.templateManipulators.preWrapper.push((template, options) => {
    if (!options.templateOptions.addons) {
      return template
    }
    return addonsTemplate.replace('<formly-transclude></formly-transclude>', template)
  })
}

module.exports = formlyRun
