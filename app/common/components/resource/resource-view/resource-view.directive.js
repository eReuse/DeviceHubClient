// TODO Deprecated
function resourceView () {
  /**
   *
   * Represents a resource. Selects the appropriate view to show the resource, depending of its type.
   * @param {object} resource - The resource to represent.
   * @param {string} type - The type of the resource.
   */
  return {
    template: require('./resource-view.directive.html'),
    restrict: 'E',
    scope: {
      resource: '=?',
      type: '@'
    }
  }
}

module.exports = resourceView
