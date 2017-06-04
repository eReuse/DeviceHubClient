/**
 * A small button that, on clicked, shows a modal with the most relevant information of a resource.
 *
 * undefined evaluates to true.
 * @param {session} session
 * @param {object} CONSTANTS
 * @param $http
 * @param {ResourceListGetterBig} ResourceListGetterBig
 * @param {ResourceListSelectorBig} ResourceListSelectorBig
 * @param {ResourceSettings} ResourceSettings
 * @param {SubmitForm} SubmitForm
 */
function resourceListFooter (session, CONSTANTS, $http, ResourceListGetterBig, ResourceListSelectorBig,
                             ResourceSettings, SubmitForm) {
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

      // Export popover
      $scope.isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
      $scope.popover = {
        templateUrl: require('./__init__').PATH + '/export.popover.template.html',
        title: 'Export as spreadsheets',
        isOpen: false
      }
      // Export Form in the popover
      const MIME_TYPES = {
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ods: 'application/vnd.oasis.opendocument.spreadsheet'
      }
      $scope.form = {
        fields: [
          {
            key: 'type',
            type: 'radio',
            templateOptions: {
              label: 'Type of export',
              options: [
                {
                  name: 'Brief – only most important info.',
                  value: 'brief'
                },
                {
                  name: 'Detailed.',
                  value: 'detailed'
                }
              ],
              required: true
            }
          },
          {
            key: 'format',
            type: 'radio',
            templateOptions: {
              label: 'Format of the file',
              options: [
                {
                  name: 'ODS – Libreoffice',
                  value: 'ods'
                },
                {
                  name: 'XLSX – MS Excel',
                  value: 'xlsx'
                }
              ],
              required: true
            }
          }
        ],
        model: {type: 'brief', format: 'ods'},
        submit: model => {
          if (submitForm.isValid()) {
            submitForm.prepare()
            const saveAs = require('file-saver').saveAs
            const mimeType = MIME_TYPES[model.format]
            const rSettings = ResourceSettings($scope.selectedResources[0]['@type'])
            const resource = rSettings.resourceName
            const promise = $http({
              method: 'GET',
              url: CONSTANTS.url + '/' + session.activeDatabase + '/export/' + resource,
              params: {
                ids: _.map($scope.selectedResources, '_id'),
                type: model.type
              },
              headers: {Accept: mimeType, Authorization: 'Basic ' + session.getAccount().token},
              responseType: 'arraybuffer'
            }).success(data => {
              const file = new File([data], resource + '.' + model.format, {type: mimeType})
              saveAs(file)
              $scope.popover.isOpen = false // Close popover
            })
            submitForm.after(promise)
          }
        }
      }
      const submitForm = new SubmitForm($scope.form, $scope)
    }
  }
}

module.exports = resourceListFooter
