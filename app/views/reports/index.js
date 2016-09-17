require('angular-ui-bootstrap')
require('bower_components/angular-dashboard-framework/dist/angular-dashboard-framework.js')
require('bower_components/adf-structures-base/dist/adf-structures-base.js')
/**
 * Represents the main devices view
 */
module.exports = angular.module('views.reports',
  [
    'adf',
    'adf.structures.base'
  ])
.controller('reportsCtrl', require('./reports.controller.js'))

