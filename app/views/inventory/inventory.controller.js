function inventoryCtrl ($scope, progressBar, ResourceBreadcrumb) {
  const entry = _.last(ResourceBreadcrumb.log) // This resource might only be @type and _id
  if (!_.isEmpty(entry)) $scope.resource = entry
  console.log('entry', entry)
  window.progressSetVal(3)
  progressBar.complete()
}

module.exports = inventoryCtrl

