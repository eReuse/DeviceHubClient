/**
 * Represents the main devices view
 */
module.exports = angular.module('views.workbench',
  [
    require('./../../common/components/workbench').name
  ])
  .controller('workbenchComputerCtl', require('./workbench-computer.controller'))
  .controller('workbenchMobileCtl', require('./workbench-mobile.controller'))
  .controller('workbenchSettingsCtl', require('./workbench-settings.controller'))
