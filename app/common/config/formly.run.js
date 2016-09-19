function formlyRun (formlyValidationMessages) {
  formlyValidationMessages.addStringMessage('required', 'This field is required.')
  formlyValidationMessages.addStringMessage('or', 'This field is required.')
  formlyValidationMessages.addStringMessage('email', 'The e-mail is not correct.')
  formlyValidationMessages.addStringMessage('incorrectUser', 'The e-mail or password are incorrect.')
  formlyValidationMessages.addTemplateOptionValueMessage('minlength', 'minlength', '', 'is the minimum length', 'Too short');
}

module.exports = formlyRun
