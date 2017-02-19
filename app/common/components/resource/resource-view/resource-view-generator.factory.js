function ResourceViewGeneratorFactory (RESOURCE_CONFIG, ResourceSettings, $compile) {
  class ResourceViewGenerator {

    static generate (resourceType, $scope) {
      let rSettings = ResourceSettings(resourceType)
      let viewName = this.getAppropiateViewName(rSettings, 'view')
      return this.compile({viewName: viewName}, $scope)
    }

    static getAppropiateViewName (rSettings, viewKeyInConfig) {
      let viewName
      if (viewKeyInConfig in rSettings.settings) {
        viewName = rSettings.resourceName
      } else {
        _.forEach(RESOURCE_CONFIG.resources, function (settings, resourceName) {
          if (viewKeyInConfig in settings && rSettings.isSubResource(resourceName)) {
            viewName = resourceName
            return false // break the loop
          }
        })
      }
      return viewName
    }

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
