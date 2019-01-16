/**
 *
 * @param $scope
 * @param {module:workbenchResources} workbenchResources
 * @param {module:resources} resources
 * @param {module:table} table
 * @param {module:enums} enums

 */
function workbenchComputerCtl ($scope, workbenchResources, resources, table, enums, CONSTANTS, server, session) {
  $scope.session = session
  $scope.appName = CONSTANTS.appName

  workbenchResources.WorkbenchComputerInfo.server.start().then(null, null, info => {
    $scope.info = info
  })

  // Table

  class Phase extends table.Field {
  }

  class Title extends table.Title {

  }

  Title.hide = true

  $scope.table = {
    fields: [table.Icon, table.Title, Phase]
  }

  $scope.$on('$destroy', () => {
    workbenchResources.WorkbenchComputerInfo.server.stop()
  })
}

module.exports = workbenchComputerCtl

