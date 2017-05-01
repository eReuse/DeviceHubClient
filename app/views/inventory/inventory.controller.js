function inventoryCtrl ($scope, $stateParams, progressBar) {
  const utils = require('./../../common/components/utils')
  let resourceName = $scope.resourceName = $stateParams.resourceName
  let id = $scope.id = $stateParams.id
  if (resourceName && id) $scope.resource = {'@type': utils.Naming.type(resourceName), '_id': id}
  window.progressSetVal(3)
  progressBar.complete()
}

module.exports = inventoryCtrl

