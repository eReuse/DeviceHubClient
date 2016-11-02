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
      var CannotSubmit = require('./cannot-submit.exception')
      var FormUtils = require('./../form-utils')
      $scope.form
      var FS = $scope.options.FormSchema || FormSchema // We let people pass us extended FormSchema
      var formSchema = new FS($scope.model, $scope.form, $scope.status, $scope.options, $scope)
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
