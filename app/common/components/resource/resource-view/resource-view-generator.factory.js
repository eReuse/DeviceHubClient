function ResourceViewGeneratorFactory (RESOURCE_CONFIG, ResourceSettings, $compile) {
  class ResourceViewGenerator {

    static generate (resourceType, $scope) {
      return this.compile({viewName: this.getSetting(resourceType, 'view')}, $scope)
    }

    static getSetting (resourceType, settingName) {
      return ResourceSettings(resourceType).getSetting(settingName)
    }

    /**
     *
     * @param options
     * @param $scope
     * @returns {*} The $scope.
     */
    static compile (options, $scope) {
      let view = angular.element(this._template(options, $scope))
      $compile(view)($scope)
      return view
    }

    static _template (options) {
      return `<${options.viewName} resource="resource" />`
    }

  }
  return ResourceViewGenerator
}

module.exports = ResourceViewGeneratorFactory
