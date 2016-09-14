'use strict';
/**
 * Represents the main devices view
 */
module.exports = angular.module('views.fullDevice',
    [
        require('angular-ui-bootstrap'),
        require('./../../common/components/device').name,
        require('./../../common/config').name,
        require('./../../common/components/resource').name,
        require('./../../common/components/authentication').name
    ])
    .controller('fullDeviceCtrl', require('./full-device.controller.js'));