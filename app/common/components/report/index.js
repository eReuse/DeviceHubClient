require('angular-chart.js')
require('angular-google-maps')

module.exports = angular.module('common.components.report',
  [
    'chart.js',
    'uiGmapgoogle-maps'
  ])
  .factory('resourceServerAggregations', require('./resource-server-aggregations'))
  .directive('deviceMaps', require('./widgets/device-maps/device-maps.directive'))
  .directive('quickview', require('./widgets/quickview/quickview.directive'))
  .directive('inventoryDashboard', require('./inventory-dashboard/inventory-dashboard.directive'))
