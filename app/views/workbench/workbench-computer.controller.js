/**
 *
 * @param $scope
 * @param {module:workbenchResources} workbenchResources
 * @param {module:resources} resources
 * @param {module:table} table
 * @param {module:enums} enums
 * @param server
 * @param session
 */
function workbenchComputerCtl ($scope, workbenchResources, resources, table, enums, server, session) {
  $scope.session = session
  $scope.WorkbenchComputerPhase = enums.WorkbenchComputerPhase

  workbenchResources.WorkbenchComputerInfo.server.start().then(null, null, info => {
    $scope.info = info
  })

  // Table

  class Phase extends table.Field {
  }

  class Title extends table.Title {

  }

  class Linked extends table.Bool {
  }

  Title.hide = true

  $scope.table = {
    fields: [table.Icon, table.Title, Phase, Linked]
  }

  $scope.$on('$destroy', () => {
    workbenchResources.WorkbenchComputerInfo.server.stop()
  })
}

module.exports = workbenchComputerCtl

