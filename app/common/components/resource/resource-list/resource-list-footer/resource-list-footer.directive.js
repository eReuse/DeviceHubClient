/**
 * Number of resources in the list and similar information.
 *
 * undefined evaluates to true.
 * @param {ResourceListGetterBig} ResourceListGetterBig
 * @param {ResourceListSelectorBig} ResourceListSelectorBig
 */
function resourceListFooter (ResourceListGetterBig, ResourceListSelectorBig) {
  return {
    template: require('./resource-list-footer.directive.html'),
    restrict: 'E',
    scope: {},
    link: $scope => {
      $scope.UIB_TOOLTIP_TEMPLATE = require('./__init__').PATH + '/selected-resources.uib-tooltip-template.html'

      ResourceListGetterBig.callbackOnGetting((__, ___, pag) => { $scope.totalResources = pag.totalPages })

      ResourceListSelectorBig.callbackOnSelection((total, inList) => {
        $scope.selectedResources = total
        $scope.numberSelectedResourcesInList = inList.length
      })
    }
  }
}

module.exports = resourceListFooter
