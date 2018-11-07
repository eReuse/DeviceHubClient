function formSchema (FormSchema, Notification) {
  /**
   * @name formSchema
   * @description Generates a form for a resource parsing the information form the schema from the server.
   * @ngdoc directive
   * @param {object} model - The resource to be submitted.
   * @param {object} options - Options for formSchema directive
   * @param {FormSchema} options.FormSchema - A FormSchema subclass to be used instead of regular one.
   * @param {string} options.deviceType - The type of the device in the Snapshot.
   * @param {boolean} options.canDelete - Automatically set.
   * @param {boolean} options.delete - API to delete the model, if possible.
   * @param {object} status - Status object as FormSchema requires. See it there.
   * @param {object} parserOptions - options for the parser in FormSchema. See it in FormSchema.options.
   */
  return {
    templateUrl: require('./__init__').PATH + '/form-schema.directive.html',
    restrict: 'E',
    scope: {
      model: '=',
      options: '=',
      status: '=',
      parserOptions: '=?'
    },
    link: {
      pre: $scope => {
        let form = {
          model: $scope.model,
          form: null
        }
        const FS = $scope.options.FormSchema || FormSchema // We let people pass us extended FormSchema
        let formSchema = new FS($scope.model, form, $scope.status, $scope.parserOptions || {}, $scope.options.deviceType)
        $scope.submit = model => formSchema.submit(model)
        $scope.options.canDelete = 'remove' in $scope.model
        $scope.options.delete = model => formSchema.delete(model)

        if (['devices:Snapshot', 'devices:NewTag'].indexOf(form.model['@type']) !== -1) {
          if (window.AndroidApp) {
            Notification.success('NFC active')
            window.AndroidApp.startNFC('tagScanDone')
            $scope.$on('$destroy', () => {
              window.AndroidApp.stopNFC()
            })
          }

          // set value to
          // TODO listen to NFC events only or both NFC+QR events?
          $scope.$on('tagScanDone', (_, tag) => {
            let id
            try {
              const url = new URL(tag)
              id = url.pathname.substring(1) // Remove initial slash
            } catch (e) {
              id = tag
            }
            let device = $scope.model.device
            device.tags[0].id = id
            $scope.$apply()
          })
        }

        $scope.form = form
      }
    }
  }
}

module.exports = formSchema
