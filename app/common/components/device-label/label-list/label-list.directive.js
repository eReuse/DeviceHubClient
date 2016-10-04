var labelsToPdf = require('./labels-to-pdf.js')
var setImageGetter = require('../../utils').setImageGetter

function labelList (CONSTANTS) {
  return {
    templateUrl: window.COMPONENTS + '/device-label/label-list/label-list.directive.html',
    restrict: 'E',
    scope: {
      devices: '='
    },
    link: function ($scope, $element, $attrs) {
      $scope.set = {
        width: 97,
        height: 59,
        useLogo: true
      }
      var oldHeight = $scope.set.height
      $scope.logo = CONSTANTS.siteLogo
      setImageGetter($scope, '#logoUpload', 'logo')
      $scope.print = labelsToPdf
      $scope.$watch('set.useLogo', function (newV) {
        if (newV === false) {
          oldHeight = $scope.set.height
          $scope.set.height = 32
        } else {
          $scope.set.height = oldHeight
        }
      })
    }
  }
}

module.exports = labelList
