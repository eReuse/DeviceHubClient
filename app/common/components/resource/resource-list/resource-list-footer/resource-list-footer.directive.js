/**
 * A small button that, on clicked, shows a modal with the most relevant information of a resource.
 *
 * @param {object|undefined} resource
 * undefined evaluates to true.
 */
function resourceListFooter (session, CONSTANTS, $http) {
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
      var MIME_TYPES = {
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ods: 'application/vnd.oasis.opendocument.spreadsheet'
      }
      $scope.isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
      $scope.exportSpreadsheet = function (format) {
        var Naming = require('./../../../utils').Naming
        var saveAs = require('file-saver').saveAs
        var mimeType = MIME_TYPES[format]
        var resource = Naming.resource('Device')
        $http({
          method: 'GET',
          url: CONSTANTS.url + '/' + session.activeDatabase + '/export/' + resource,
          params: {'ids': _.map($scope.selectedResources, '_id'), 'groupBy': 'Actual place'},
          headers: {'Accept': mimeType, 'Authorization': 'Basic ' + session.getAccount().token},
          responseType: 'arraybuffer'
        }).success(function (data) {
          var file = new File([data], resource + '.' + format, {type: mimeType})
          saveAs(file)
        })
      }
    }

  }
}

module.exports = resourceListFooter
