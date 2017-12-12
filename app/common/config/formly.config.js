function formlyConfig (formlyConfigProvider, CONSTANTS) {
  const apiCheck = require('api-check')
  // Remove apiCheck in production. See https://github.com/kentcdodds/api-check#disable-apicheck
  apiCheck.globalConfig.disabled = !CONSTANTS.debug
  // from http://jsbin.com/xugizaxuya/
  formlyConfigProvider.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.triedSubmission'

  formlyConfigProvider.setWrapper({
    name: 'tooltip-validation',
    // todo theoretically I should be able to remove 'types' and make it general
    // but it does not work...
    types: ['input', 'checkbox', 'email', 'number', 'datepicker', 'typeahead', 'upload'],
    templateUrl: window.COMMON + '/config/error-messages.formly.config.html'
  })

  formlyConfigProvider.setWrapper({
    name: 'panel',
    template: require('./panel.wrapper.formly.html')
  })
}

module.exports = formlyConfig
