const utils = require('./../../utils')

function formModal ($scope, $uibModalInstance, options, model, parserOptions, ResourceSettings) {
  $scope.model = model
  $scope.options = options
  $scope.status = {}
  $scope.humanize = utils.Naming
  $scope.parserOptions = parserOptions
  $scope.cancel = () => $uibModalInstance.dismiss('cancel')
  $scope.$watch('status.succeeded', newV => { if (newV) $uibModalInstance.close('success') })
  $scope.title = $scope.options.title || ResourceSettings(model['@type']).humanName
}

module.exports = formModal
