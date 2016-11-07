function computerSnapshotModalCtrl ($scope, $uibModalInstance, type, ComputerSnapshotFormSchema) {
  var CannotSubmit = require('./../../forms/form-schema/cannot-submit.exception')
  var FormUtils = require('./../../forms/form-utils')

  var EXIT_QUESTION = 'Some devices could not be uploaded and need review. Are you sure you want to exit?'
  $scope.form
  $scope.done = false
  $scope.status = {}
  $scope.model = {}
  $scope.options = {}
  var formSchema = new ComputerSnapshotFormSchema($scope.model, $scope.form, $scope.status, $scope.options, $scope)
  $scope.fields = formSchema.fields
  $scope.submit = function (model) {
    formSchema.form = $scope.form
    try {
      $scope.form.triedSubmission = false
      formSchema.submit(model)
    } catch (err) {
      $scope.form.triedSubmission = true
      if (err instanceof CannotSubmit) {
        FormUtils.scrollToFormlyError($scope.form)
      } else {
        throw err
      }
    }
  }
  window.a = $scope
  $scope.type = type
  $scope.title = type

  $scope.$watch('status.done', function (done) {
    if (done) {
      if ($scope.status.results.error.length > 0) {
        $scope.progressBarType = _.isEmpty($scope.status.results.success) ? 'danger' : 'warning'
      } else {
        $scope.progressBarType = 'success'
      }
    }
  })
  $scope.$watch('status.unsolved', function (numberOfErrorsUnsolved) {
    $scope.status.atLeastOneError = numberOfErrorsUnsolved > 0
    window.onbeforeunload = $scope.status.atLeastOneError ? _.identity(EXIT_QUESTION) : _.noop
  })
  $scope.done = function () {
    $uibModalInstance.dismiss('cancel')
  }
  $scope.restartIfConfirms = function () {
    if (!confirmToStay()) {
      $scope.options.resetModel()
      formSchema = new ComputerSnapshotFormSchema($scope.model, $scope.form, $scope.status, $scope.options, $scope)
    }
  }

  $scope.$on('modal.closing', function (event) {
    if (confirmToStay()) event.preventDefault()
  })

  function confirmToStay () {
    return $scope.status.atLeastOneError && !confirm(EXIT_QUESTION)
  }
}

module.exports = computerSnapshotModalCtrl
