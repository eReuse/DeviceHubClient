function formlyConfig (formlyConfigProvider) {
  // from http://jsbin.com/xugizaxuya/
  formlyConfigProvider.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.triedSubmission'

  formlyConfigProvider.setWrapper({
    name: 'tooltip-validation',
    template: require('./error-messages.formly.config.html'),
    // theoretically I should be able to remove 'types' and make it general but it does not work
    types: ['input', 'textarea', 'datepicker', 'upload', 'select', 'checkbox', 'multiCheckbox', 'radio', 'typeahead']
  })

  formlyConfigProvider.setWrapper({
    name: 'panel',
    template: require('./panel.wrapper.formly.html')
  })
}

module.exports = formlyConfig
