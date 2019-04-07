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
function workbenchComputerCtl ($scope, workbenchResources, resources, table, enums, server, session, $translate, Notification) {
  $scope.session = session
  $scope.WorkbenchComputerPhase = enums.WorkbenchComputerPhase

  workbenchResources.WorkbenchComputerInfo.server.start().then(null, null, info => {
    $scope.info = info
  })

  // Table

  class Phase extends table.Field {
  }

  class Tags extends table.Tags {
    constructor (resource) {
      super(resource, _.get(resource, 'device.tags', []))
      if (!this.content) {
        this.content = $translate.instant('workbench.computer.notLinked')
      }
    }
  }

  $scope.table = {
    fields: [table.Icon, table.Title, Phase, Tags]
  }

  $scope.$on('$destroy', () => {
    workbenchResources.WorkbenchComputerInfo.server.stop()
  })

  const wb = new server.Workbench('snapshots/computer/')
  $scope.clean = () => {
    wb.delete().then(() => {
      Notification.success($translate.instant('forms.notification.success'))
    }).catch(() => {
      Notification.error($translate.instant('forms.notification.error'))
    })
  }
}

module.exports = workbenchComputerCtl

