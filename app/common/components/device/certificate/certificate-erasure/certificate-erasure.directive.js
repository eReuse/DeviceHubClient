var setImageGetter = require('./../../../utils').setImageGetter
function labelList (certificateErasureFactory) {
  return {
    templateUrl: window.COMPONENTS + '/device/certificate/certificate-erasure/certificate-erasure.directive.html',
    restrict: 'E',
    scope: {
      devices: '='
    },
    link: function ($scope) {
      $scope.languages = {
        ES: 'Español',
        EN: 'English'
      }
      $scope.model = {
        lan: 'EN'
      }
      $scope.print = function (device, model, logo) {
        (new certificateErasureFactory(device, model, logo)).generatePdf()
      }
      setImageGetter($scope, '#logoUpload', 'logo')
    }
  }
}

module.exports = labelList
