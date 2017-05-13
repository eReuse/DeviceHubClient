require('angular-chart.js')
require('angular-google-maps')

module.exports = angular.module('common.components.report',
  [
    'chart.js',
    'uiGmapgoogle-maps'
  ])
  .factory('resourceServerAggregations', require('./resource-server-aggregations'))
  .directive('quickview', require('./widgets/quickview/quickview.directive'))
  .directive('inventoryDashboard', require('./inventory-dashboard/inventory-dashboard.directive'))
  .directive('typeDevices', require('./widgets/type-devices/type-devices.directive'))
  .directive('resourceMapsLocations', require('./widgets/resource-maps-locations/resource-maps-locations.directive'))
