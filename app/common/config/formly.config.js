function formlyConfig (formlyConfigProvider) {
  // from http://jsbin.com/xugizaxuya/
  formlyConfigProvider.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.triedSubmission'

  formlyConfigProvider.setWrapper({
    name: 'tooltip-validation',
    // todo theoretically I should be able to remove 'types' and make it general
    // but it does not work...
    types: ['input', 'checkbox', 'email', 'number', 'datepicker', 'typeahead'],
    templateUrl: window.COMMON + '/config/error-messages.formly.config.html'
  })
}

module.exports = formlyConfig
