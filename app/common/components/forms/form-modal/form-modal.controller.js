var utils = require('./../../utils')

function formModal ($scope, $uibModalInstance, options, model, ResourceSettings) {
  $scope.model = model
  $scope.options = options
  $scope.status = {}
  $scope.humanize = utils.Naming
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel')
  }
  $scope.$watch(function () {
    return $scope.status.done
  }, function (newV) {
    if (newV) $uibModalInstance.close('success')
  })
  $scope.title = $scope.options.title || ResourceSettings(model['@type']).humanName
}

module.exports = formModal
