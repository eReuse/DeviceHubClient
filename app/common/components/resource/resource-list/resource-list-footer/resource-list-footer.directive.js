/**
 * A small button that, on clicked, shows a modal with the most relevant information of a resource.
 *
 * @param {object|undefined} resource
 * undefined evaluates to true.
 */
function resourceListFooter (ResourceSettings) {
  return {
    templateUrl: require('./__init__').PATH + '/resource-list-footer.directive.html',
    restrict: 'E',
    scope: {},
    link: function ($scope) {
      $scope.UIB_TOOLTIP_TEMPLATE = require('./__init__').PATH + '/selected-resources.uib-tooltip-template.html'
      $scope.$on('returnedResources@resourceList', function (_, resources, meta) {
        $scope.totalResources = meta.total
      })
      $scope.$on('selectedDevices@deviceList', function (_, selectedResources, numberSelectedResourcesInList) {
        $scope.selectedResources = selectedResources
        $scope.numberSelectedResourcesInList = numberSelectedResourcesInList
      })
    }
  }
}

module.exports = resourceListFooter
