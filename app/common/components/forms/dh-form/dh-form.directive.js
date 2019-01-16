/**
 * @ngdoc directive
 * @name dhForm
 * @restrict E
 * @element dh-form
 *
 * @description
 * A DH Form.
 *
 * @param {expression} form - A `module:fields.Form` or null.
 * @param {?string} formId - Optional ID to link the form to.
 * @param {boolean|string} submit - Show the 'submit' button if
 * the attribute is set. If the attribute has, moreover, text,
 * use the text as a keyPath for translation.
 * @param {boolean|string} cancel - As `submit` but for cancel.
 * @param {boolean|string} reset - As `submit` but for reset.
 *
 */

/** */
function dhForm () {
  function define (value, keyPath) {
    return value === '' ? keyPath : value
  }

  return {
    template: require('./dh-form.directive.html'),
    restrict: 'E',
    scope: {
      form: '=',
      formId: '@?',
      submit: '@?',
      cancel: '@?',
      reset: '@?'
    },
    /**
     * @param {$rootScope.Scope} $scope
     * @param {module:fields.Form} $scope.form
     * @param {string} $scope.id
     */
    link: ($scope) => {
      $scope._submit = define($scope.submit, 'forms.submit')
      $scope._cancel = define($scope.cancel, 'forms.cancel')
      $scope._reset = define($scope.reset, 'forms.reset')
    }
  }
}

module.exports = dhForm
