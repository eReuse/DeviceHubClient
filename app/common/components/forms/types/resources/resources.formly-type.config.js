function resources (formlyConfigProvider) {
  /**
   * The Formly type resources is only a preview in a field-esque way of resource buttons, so users can
   * double check the resources they are submitting  –we could say it is a *readonly* field.
   *
   *  @param {string} key - The name of the key, in *normal* mode.
   *  @param {object[]} resources - A list of resources to show, transform and submit.
   */
  formlyConfigProvider.setType({
    name: 'resources',
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    template: require('./resources.formly-type.config.html'),
    defaultOptions: {
      templateOptions: {
        key: null
      }
    },
    link: $scope => {
      const key = $scope.options.key
      if (key == 'documents') {
	$scope.to._resources = $scope.model[key].map((x) => x.filename)
      } else {
        $scope.to._resources = $scope.model[key]
      }
    }
  })
}

module.exports = resources
