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
function workbenchMobileCtl ($scope, workbenchResources, resources, table, enums, server, session, $filter, $translate, Notification) {
  $scope.session = session
  $scope.WorkbenchComputerPhase = enums.WorkbenchComputerPhase

  workbenchResources.WorkbenchMobileInfo.server.start().then(null, null, info => {
    $scope.info = info
  })

  // Table

  class Phase extends table.Field {
  }

  class SerialNumber extends table.Field {
    constructor (resource) {
      super(resource, resource.device.serialNumber)
    }

    static get name () {
      return 'S/N'
    }
  }

  class RAM extends table.Field {
    constructor (resource) {
      super(resource, $filter('number')(resource.device.ramSize / 1000))
    }

    static get name () {
      return 'RAM (GB)'
    }
  }

  class Disk extends table.Field {
    constructor (resource) {
      super(resource, $filter('number')(resource.device.dataStorageSize / 1024))
    }

    static get name () {
      return 'Disk (GB)'
    }
  }

  $scope.table = {
    fields: [table.Icon, table.Title, SerialNumber, RAM, Disk, Phase]
  }

  $scope.$on('$destroy', () => {
    workbenchResources.WorkbenchMobileInfo.server.stop()
  })

  const wb = new server.Workbench('snapshots/mobile/')
  $scope.clean = () => {
    wb.delete().then(() => {
      Notification.success($translate.instant('forms.notification.success'))
    }).catch(() => {
      Notification.error($translate.instant('forms.notification.error'))
    })
  }
}

module.exports = workbenchMobileCtl

