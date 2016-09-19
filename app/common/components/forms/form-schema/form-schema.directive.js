var CannotSubmit = require('./cannot-submit.exception')
var FormUtils = require('./../form-utils')

function formSchema (FormSchema) {
  return {
    templateUrl: window.COMPONENTS + '/forms/form-schema/form-schema.directive.html',
    restrict: 'E',
    scope: {
      model: '=',
      options: '=',
      status: '=' // list
    },
    link: function ($scope) {
      $scope.form
      window.fss = $scope
      var formSchema = FormSchema($scope.model, $scope.form, $scope.status, $scope.options.doNotUse, $scope)
      $scope.fields = formSchema.fields
      $scope.submit = function (model) {
        try {
          $scope.form.triedSubmission = false
          formSchema.submit(model)
        } catch (err) {
          $scope.form.triedSubmission = true
          if (err instanceof CannotSubmit) FormUtils.scrollToFormlyError($scope.form)
          else throw err
        }
      }
      $scope.options.canDelete = 'remove' in $scope.model
      $scope.options.delete = function (model) {
        formSchema.delete(model)
      }
    }
  }
}

module.exports = formSchema
