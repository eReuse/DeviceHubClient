function resourceSearch () {
  return {
    template: require('./resource-search.directive.html'),
    restrict: 'E',
    scope: {
      onUpdate: '&'
    },
    link: $scope => {
      class Scanner {
        constructor () {
          this.isAndroid = 'AndroidApp' in window
          if (this.isAndroid) {
            // Receive tag from App in here
            $scope.$on(this.constructor.EVENT_NAME, (_, tag) => this.constructor._processScan(tag))

            // Start NFC
            window.AndroidApp.startNFC(this.constructor.EVENT_NAME)
            $scope.$on('$destroy', () => {
              window.AndroidApp.stopNFC()
            })
          }
        }

        static _processScan (tag) {
          let id
          try {
            const url = new URL(tag)
            id = url.pathname.substring(1) // Remove initial slash
          } catch (e) {
            id = tag
          }
          $scope.searchQuery += id + ' '
          $scope.onUpdate({text: $scope.searchQuery})
          $scope.$apply()
        }

        scanQR () {
          window.AndroidApp.scanBarcode(this.constructor.EVENT_NAME)
        }
      }

      Scanner.EVENT_NAME = 'tagScanDoneSearch'
      $scope.scanner = new Scanner()
    }
  }
}

module.exports = resourceSearch
