const FileSaver = require('file-saver')

function exportButton (Notification, clipboard, $translate, CONSTANTS, session, server) {
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
      $scope.loading = false
      const docsEndpoint = new server.Devicehub('/documents/')

      function saveFile (path, format, mimeType, textPath) {
        $scope.loading = true
        return docsEndpoint.get(path, {
          params: {
            filter: {id: _.map($scope.devices, 'id')},
            format: format.toUpperCase()
          },
          headers: {Accept: mimeType},
          responseType: docsEndpoint.constructor.RESPONSE_TYPE.ARRAY_BUFFER
        }).then(response => {
          const file = new File([response.data],
            `${$translate.instant(`export.${textPath}.fileName`)}.${format}`,
            {type: mimeType})
          FileSaver.saveAs(file)
          return file
        }).catch(() => {
          Notification.error($translate.instant('export.error'))
        }).finally(() => {
          $scope.loading = false
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
          Notification.primary($translate.instant('export.clipboard.success'))
        }
      }

      $scope.clipboard = new Clipboard()
    }
  }
}

module.exports = exportButton
