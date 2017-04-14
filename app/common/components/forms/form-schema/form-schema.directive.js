function formSchema (FormSchema) {
  /**
   * Generates a form for a resource parsing the information form the schema from the server.
   * @name formSchema
   * @ngdoc directive
   * @param {object} model - The resource to be submitted.
   * @param {object} options - Options for formSchema directive
   * @param {FormSchema} options.FormSchema - A FormSchema subclass to be used instead of regular one.
   * @param {string} options.deviceType - The type of the device in the Snapshot.
   * @param {boolean} options.canDelete - Automatically set.
   * @param {boolean} options.delete - API to delete the model, if possible.
   * @param {object} status - Status object as FormSchema requires. See it there.
   */
  return {
    templateUrl: window.COMPONENTS + '/forms/form-schema/form-schema.directive.html',
    restrict: 'E',
    scope: {
      model: '=',
      options: '=',
      status: '='
    },
    link: {
      pre: $scope => {
        let form = {
          model: $scope.model,
          form: null
        }
        window.a = $scope
        const FS = $scope.options.FormSchema || FormSchema // We let people pass us extended FormSchema
        let formSchema = new FS($scope.model, form, $scope.status, {}, $scope.options.deviceType)
        $scope.submit = model => formSchema.submit(model)
        $scope.options.canDelete = 'remove' in $scope.model
        $scope.options.delete = model => formSchema.delete(model)
        $scope.form = form
      }
    }
  }
}

module.exports = formSchema
