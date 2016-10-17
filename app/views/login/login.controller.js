function loginController ($scope, $state, authService, CONSTANTS) {
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
      var credentials = _.pick(model, ['email', 'password'])
      $scope.form.form.triedSubmission = false
      if ($scope.form.form.$valid) {
        $scope.loading = true
        authService.login(credentials, model.saveInBrowser).then(function () {
          $state.go('index.devices.show')
        }, setSubmissionError)
      } else {
        $scope.form.form.triedSubmission = true
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
  function setSubmissionError () {
    var $input = $('.formly-field:not(.formly-field:last)')
    $scope.submissionError = true
    $scope.loading = false
    $input.addClass('has-error')
    $input.focusin(function () {
      $input.removeClass('has-error')
      $scope.submissionError = false
      $scope.$apply()
    })
  }
}

module.exports = loginController

