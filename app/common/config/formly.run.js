function formlyRun (formlyValidationMessages) {
  var f = formlyValidationMessages
  f.addStringMessage('required', 'This field is required.')
  f.addStringMessage('or', 'This field is required.')
  f.addStringMessage('email', 'The e-mail is not correct.')
  f.addStringMessage('incorrectUser', 'The e-mail or password are incorrect.')
  f.addTemplateOptionValueMessage('minlength', 'minlength', '', 'is the minimum length', 'Too short')
  f.addStringMessage('number', 'Write a correct number.')
}

module.exports = formlyRun
