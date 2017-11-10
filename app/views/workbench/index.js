/**
 * Represents the main devices view
 */
module.exports = angular.module('views.workbench',
  [
    require('./../../common/components/workbench').name,

  ])
  .controller('workbenchCtl', require('./workbench.controller.js'))
