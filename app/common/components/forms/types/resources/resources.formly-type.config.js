function resources (formlyConfigProvider) {
  /**
   * The Formly type resources is only a preview in a field-esque way of resource buttons, so users can
   * double check the resources they are submitting. This type only transforms the data introduced by 'resources'
   * to fit it into its two possible configurations, and it does not let the user to change anything –we could say it
   * is a *readonly* field.
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
      $scope.to._resources = $scope.model[key]
      $scope.model[key] = _.map($scope.model[key], $scope.to.key)
    }
  })
}

module.exports = resources
