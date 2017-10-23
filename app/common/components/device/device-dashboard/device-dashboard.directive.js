
function deviceDashboard (ResourceSettings, UNIT_CODES, CONSTANTS) {
  return {
    template: require('./device-dashboard.directive.html'),
    restrict: 'E',
    scope: {
      resource: '=',
      type: '@'
    },
    link: $scope => {
      const manufacturerSettings = ResourceSettings('Manufacturer')
      const deviceSettings = ResourceSettings('Device')
      $scope.currencyOptions = {
        currency: CONSTANTS.currency,
        val: 'standard',
        roles: ['retailer', 'platform', 'refurbisher']
      }
      $scope.hardDriveSizeUnit = UNIT_CODES[deviceSettings.schema.totalHardDriveSize.unitCode]
      $scope.ramSizeUnit = UNIT_CODES[deviceSettings.schema.totalRamSize.unitCode]
      $scope.appearance = deviceSettings.schema.condition.schema.appearance.schema.general.allowed_description
      $scope.functionality = deviceSettings.schema.condition.schema.functionality.schema.general.allowed_description
      const where = {parent: $scope.resource._id, '@type': {'$in': ['GraphicCard', 'Processor']}}
      deviceSettings.server.getList({where: where}).then(components => {
        $scope.graphicCard = _.find(components, {'@type': 'GraphicCard'})
        const cpu = _.find(components, {'@type': 'Processor'})
        if (cpu) {
          manufacturerSettings.server.findText(['label'], cpu.manufacturer.split(' ')[0], true, 1).then(manu => {
            if (manu.length) {
              $scope.processorManufacturer = manu[0]
            }
          })
        }
      })
    }
  }
}

module.exports = deviceDashboard
