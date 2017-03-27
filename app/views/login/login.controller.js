function loginController ($scope, $state, authService, CONSTANTS, SubmitForm) {
  // note that we do not define form.form or form.options as it needs to be undefined for formly
  $scope.form = {
    fields: [
      {
        key: 'email',
        templateOptions: {
          label: 'Email',
          type: 'email',
          required: true
        },
        type: 'input'
      },
      {
        key: 'password',
        templateOptions: {
          label: 'Password',
          type: 'password',
          minlength: 4,
          required: true
        },
        type: 'input'
      },
      {
        key: 'saveInBrowser',
        type: 'checkbox',
        templateOptions: {
          label: 'Remember me'
        },
        hideExpression: 'form.cannotSave'
      }
    ],
    model: {
      email: '',
      password: '',
      saveInBrowser: false
    },
    login: function (model) {
      let submitForm = new SubmitForm($scope.form, $scope)
      let credentials = _.pick(model, ['email', 'password'])
      if (submitForm.isValid()) {
        submitForm.prepare()
        let promise = authService.login(credentials, model.saveInBrowser).then(function () {
          $state.go('index.inventory')
        }, setSubmissionError)
        submitForm.after(promise)
      }
    }
  }
  $scope.APP_NAME = CONSTANTS.appName
  $scope.siteLogo = CONSTANTS.siteLogo
  $scope.eReuseLogo = CONSTANTS.eReuseLogo
  $scope.showSiteLogo = CONSTANTS.showSiteLogo
  $('#login').css({'background-image': 'url("' + CONSTANTS.loginBackgroundImage + '")'})

  try {
    // Tries if can save the user in the browser
    localStorage.setItem('___test', '1')
  } catch (err) {
    $scope.form.form.cannotSave = true
  }

  /**
   * Shows an error at the whole form after being Unauthorized by the server
   */
  function setSubmissionError (error) {
    var $input = $('.formly-field:not(.formly-field:last)')
    $scope.submissionError = true
    $input.addClass('has-error')
    $scope.status = error.status
    $input.focusin(function () {
      $input.removeClass('has-error')
      $scope.submissionError = false
      $scope.$apply()
    })
  }
}

module.exports = loginController

