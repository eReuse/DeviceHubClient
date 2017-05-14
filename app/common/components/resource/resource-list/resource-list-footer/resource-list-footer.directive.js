/**
 * A small button that, on clicked, shows a modal with the most relevant information of a resource.
 *
 * @param {object|undefined} resource
 * undefined evaluates to true.
 */
function resourceListFooter (session, CONSTANTS, $http, ResourceListGetterBig, ResourceListSelectorBig,
                             ResourceSettings) {
  return {
    templateUrl: require('./__init__').PATH + '/resource-list-footer.directive.html',
    restrict: 'E',
    scope: {},
    link: $scope => {
      $scope.UIB_TOOLTIP_TEMPLATE = require('./__init__').PATH + '/selected-resources.uib-tooltip-template.html'

      ResourceListGetterBig.callbackOnGetting((__, ___, pag) => { $scope.totalResources = pag.totalPages })

      ResourceListSelectorBig.callbackOnSelection((total, inList) => {
        $scope.selectedResources = total
        $scope.numberSelectedResourcesInList = inList.length
      })

      const MIME_TYPES = {
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ods: 'application/vnd.oasis.opendocument.spreadsheet'
      }
      $scope.isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
      $scope.exportSpreadsheet = format => {
        const saveAs = require('file-saver').saveAs
        const mimeType = MIME_TYPES[format]
        const rSettings = ResourceSettings($scope.selectedResources[0]['@type'])
        const resource = rSettings.resourceName
        $http({
          method: 'GET',
          url: CONSTANTS.url + '/' + session.activeDatabase + '/export/' + resource,
          params: {'ids': _.map($scope.selectedResources, rSettings.isSubResource('Group') ? 'label' : '_id')},
          headers: {'Accept': mimeType, 'Authorization': 'Basic ' + session.getAccount().token},
          responseType: 'arraybuffer'
        }).success(data => {
          const file = new File([data], resource + '.' + format, {type: mimeType})
          saveAs(file)
        })
      }
    }

  }
}

module.exports = resourceListFooter
