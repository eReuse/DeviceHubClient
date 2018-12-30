/**
 *
 * @param $scope
 * @param $state
 * @param CONSTANTS
 * @param SubmitForm
 * @param progressBar
 * @param $timeout
 * @param {module:session} session
 */
function loginController ($scope, $state, CONSTANTS, SubmitForm, progressBar, $timeout, session) {
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
    login: model => {
      const submitForm = new SubmitForm($scope.form, $scope)
      const credentials = _.pick(model, ['email', 'password'])
      if (submitForm.isValid()) {
        progressBar.start()
        submitForm.prepare()
        const promise = session.login(credentials, model.saveInBrowser).catch(setSubmissionError)
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
  $timeout(() => {
    $scope.isCollapsed = false
  }, 50)
  window.document.title = CONSTANTS.appName + ' login'
}

module.exports = loginController

