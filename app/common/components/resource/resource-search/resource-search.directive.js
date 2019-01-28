/**
 *
 * @param {module:android} android
 */
function resourceSearch (android, $translate) {
  return {
    template: require('./resource-search.directive.html'),
    restrict: 'E',
    scope: {
      onUpdate: '&'
    },
    link: $scope => {
      $scope.placeholder = $translate.instant(
        android.app.exists
          ? 'resourceSearch.placeholder.android'
          : 'resourceSearch.placeholder.default'
      )

      class Scanner {
        constructor () {
          this.isAndroid = android.app.exists
          android.app.startNFC(tag => this.constructor._processScan(tag))
          $scope.$on('$destroy', () => {
            android.app.stopNFC()
          })
        }

        static _processScan (tag) {
          const id = android.app.constructor.parseTag(tag)
          $scope.searchQuery = ($scope.searchQuery || '') + ' ' + id
          $scope.onUpdate({text: $scope.searchQuery})
          $scope.$apply()
        }

        scanQR () {
          android.app.scanBarcode(tag => this.constructor._processScan(tag))
        }
      }

      if (android.app.exists) $scope.scanner = new Scanner()
    }
  }
}

module.exports = resourceSearch
