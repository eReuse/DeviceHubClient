'use strict';

require('angular-google-maps');

module.exports = angular.module('deviceHubClient.DeviceMaps',
    [
        'uiGmapgoogle-maps'
    ])
    .directive('deviceMaps', require('./device-maps.directive.js'));