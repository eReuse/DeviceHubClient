function loginController ($scope, $state, authService, CONSTANTS, SubmitForm, progressBar, $timeout) {
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
        progressBar.start()
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
    progressBar.complete()
    const $input = $('.formly-field:not(.formly-field:last)')
    $scope.submissionError = true
    $input.addClass('has-error')
    $scope.status = error.status
    $input.focusin(function () {
      $input.removeClass('has-error')
      $scope.submissionError = false
      $scope.$apply()
    })
  }

  window.progressSetVal(3)
  $scope.isCollapsed = true
  $timeout(() => { $scope.isCollapsed = false }, 50)
}

module.exports = loginController

