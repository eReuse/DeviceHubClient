/**
 *
 * @param $scope
 * @param $state
 * @param CONSTANTS
 * @param SubmitForm
 * @param $timeout
 * @param {module:session} session
 * @param {module:fields} fields
 */
function loginController ($scope, $state, CONSTANTS, SubmitForm, $timeout, session, fields) {
  class LoginForm extends fields.Form {
    constructor (...args) {
      super(...args)
      try {
        // Tries if can save the user in the browser
        localStorage.setItem('___test', '1')
      } catch (err) {
        this.cannotSave = true
      }
    }

    _submit () {
      const credentials = _.pick(this.model, 'email', 'password')
      return session.login(credentials, this.model.saveInBrowser)
    }

    _success () {

    }

    _error (op, response) {
      // Shows an error at the whole form after being Unauthorized by the server
      const $input = $('.formly-field:not(.formly-field:last)')
      $scope.submissionError = true
      $input.addClass('has-error')
      $scope.status = response.status
      $input.focusin(function () {
        $input.removeClass('has-error')
        $scope.submissionError = false
        $scope.$apply()
      })
    }
  }

  const ns = 'login'
  $scope.form = new LoginForm(
    {email: '', password: '', saveInBrowser: false},
    new fields.Email('email', {
      namespace: ns,
      required: true,
      description: false
    }),
    new fields.Password('password', {
      namespace: ns,
      minLength: 4,
      required: true,
      description: false
    }),
    new fields.Checkbox('saveInBrowser', {
      namespace: ns,
      hideExpression: 'form.cannotSave',
      description: false
    })
  )

  $('#login').css({'background-image': 'url("' + CONSTANTS.loginBackgroundImage + '")'})

  $scope.isCollapsed = true
  $timeout(() => {
    $scope.isCollapsed = false
  }, 5)
}

module.exports = loginController

