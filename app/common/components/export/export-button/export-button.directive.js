const FileSaver = require('file-saver')

function exportButton (Notification, clipboard, $translate, CONSTANTS, $http, session, Notification) {
  return {
    template: require('./export-button.directive.html'),
    restrict: 'AE',
    scope: {
      devices: '='
    },
    /**
     * @param $scope
     * @param {module:resources.Device[]} $scope.devices
     */
    link: $scope => {
      function saveFile (path, format, mimeType, textPath) {
        return $http({
          method: 'GET',
          url: `${CONSTANTS.url}/documents/${path}`,
          params: {
            filter: {id: _.map($scope.devices, 'id')},
            format: format.toUpperCase()
          },
          headers: {Accept: mimeType, Authorization: `Basic ${session.user.token}`},
          responseType: 'arraybuffer'
        }).then(response => {
          const file = new File([response.data],
            `${$translate.instant(`export.${textPath}.fileName`)}.${format}`,
            {type: mimeType})
          FileSaver.saveAs(file)
          return file
        }).catch(response => {
          Notification.error($translate.instant('export.error'))
        })
      }

      $scope.saveSpreadsheet = () => saveFile('devices/', 'csv', 'text/csv', 'spreadsheet')
      $scope.saveErasure = () => saveFile('erasures/', 'pdf', 'application/pdf', 'erasure')

      class Clipboard {
        constructor () {
          this.canCopy = clipboard.supported
        }

        copy () {
          const urls = _($scope.devices).map('url').join()
          clipboard.copyText(urls)
          Notification.primary($translate.instant('export.success'))
        }
      }

      $scope.clipboard = new Clipboard()
    }
  }

}

module.exports = exportButton
