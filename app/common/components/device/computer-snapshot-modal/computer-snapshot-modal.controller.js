function computerSnapshotModalCtrl ($scope, $uibModalInstance, type, ComputerSnapshotFormSchema) {
  const EXIT_QUESTION = 'Some devices could not be uploaded and need review. Are you sure you want to exit?'
  let form = {
    model: {},
    form: null,
    options: {}
  }
  $scope.done = false
  $scope.status = {}
  let formSchema = new ComputerSnapshotFormSchema(form.model, form, $scope.status)
  form.fields = formSchema.fields
  $scope.submit = model => formSchema.submit(model)
  $scope.type = type
  $scope.title = type

  $scope.$watch('status.unsolved', numberOfErrorsUnsolved => {
    $scope.status.atLeastOneError = numberOfErrorsUnsolved > 0
    window.onbeforeunload = $scope.status.atLeastOneError ? _.identity(EXIT_QUESTION) : _.noop
  })
  $scope.done = () => { $uibModalInstance.dismiss('cancel') }
  $scope.restartIfConfirms = () => {
    if (!confirmToStay()) {
      $scope.form.options.resetModel()
      formSchema = new ComputerSnapshotFormSchema(form.model, form, $scope.status)
    }
  }

  $scope.$on('modal.closing', event => { if (confirmToStay()) event.preventDefault() })

  function confirmToStay () {
    return $scope.status.atLeastOneError && !confirm(EXIT_QUESTION)
  }

  $scope.form = form
}

module.exports = computerSnapshotModalCtrl
