function inventoryCtrl ($scope, $stateParams) {
  const utils = require('./../../common/components/utils')
  let resourceName = $scope.resourceName = $stateParams.resourceName
  let id = $scope.id = $stateParams.id
  if (resourceName && id) $scope.resource = {'@type': utils.Naming.type(resourceName), '_id': id}
}

module.exports = inventoryCtrl

