require('angular-ui-bootstrap')
/**
 * Represents the main devices view
 */
module.exports = angular.module('views.reports',
  [
    'adf',
    'adf.structures.base'
  ])
.controller('reportsCtrl', require('./reports.controller.js'))

