require('angular-ui-bootstrap')
require('angular-simple-logger') // Required by angular-google-maps
require('angular-google-maps')
require('bower_components/ngGeolocation/ngGeolocation.js')

module.exports = angular.module('common.components.maps',
  [
    'ui.bootstrap',
    'uiGmapgoogle-maps',
    'ngGeolocation'
  ]
)
.factory('geolocation', require('./geolocation.factory.js'))
.factory('geoParsers', require('./geo-parsers.factory.js'))
.directive('maps', require('./maps.directive.js'))
