'use strict';

require('angular-ui-bootstrap');
require('angular-animate');
require('angular-fill-height-directive');
require('angular-sanitize');
require('angular-recursion');

module.exports = angular.module('common.components.device',
    [
        require('app/common/config').name,
        'ui.bootstrap',
        require('./../event').name,
        'ngAnimate',
        'fillHeight',
        'ngSanitize',
        require('./../device-list').name,
        'RecursionHelper',
        'restangular'
    ])
    /**
     * @ngdoc directive
     * @name device
     * @description
     * Main device method. Given an identifier, retrieves and shows a full device, with its events and other info.
     * @param obj identifier Object with one property: _id, which is a string identifying the device. We use an object
     * to be able to watch over it, and load a new device when the _id changes.
     */
    .directive('device', require('./device/device.directive.js'))
    /**
     * @ngdoc directive
     * @name deviceView
     * @description
     * Shows all the hardware and related information (not events) of a device, and its components.
     * @param obj identifier Object with one property: _id, which is a string identifying the device. We use an object
     * to be able to watch over it, and load a new device when the _id changes.
     */
    .directive('deviceView', require('./device-view/device-view.directive.js'))
    /**
     * @ngdoc directive
     * @name computerView
     * @description
     * Specific method for deviceView, intended for use with devices of @type == "Computer".
     * @param obj computer full computer object.
     */
    .directive('computerView', require('./computer-view/computer-view.directive.js'))
    /**
     * @ngdoc directive
     * @name componentView
     * @description
     * Specific method for components.
     * @param obj computer full component object.
     */
    .directive('componentView', require('./component-view/component-view.directive.js'))
    /**
     * @ngdoc directive
     * @name hardDriveView
     * @description
     * Specific method for hard drives. Appends the certificates.
     * @param obj hardDrive full computer object.
     */
    .directive('hardDriveView', require('./hard-drive-view/hard-drive-view.directive.js'))
    /**
     * @ngdoc directive
     * @name placeIcon
     * @description
     * Gets and shows the icon that represents a device.
     * @param str icon Name of the icon to show. This is the @type of the device.
     */
    .directive('deviceIcon', require('./device-icon/device-icon.directive.js'))
    /**
     * @ngdoc directive
     * @name registerErrorProcessor
     * @description
     * Shows a button that lets the user to register a device. This directive calls registerModalCtrl.
     */
    .directive('registerButton', require('./register-button/register-button.directive.js'))
    /**
     * @ngdoc controller
     * @name registerModalCtrl
     * @description
     * Lets users upload snapshots in json (from DeviceInventory) to the server, helping with the process and
     * showing the results.
     */
    .controller('registerModalCtrl', require('./register-modal/register-modal.controller.js'))
    /**
     * @ngdoc directive
     * @name registerErrorProcessor
     * @description
     * Shows a button that lets the user to register a device. This directive calls registerModalCtrl.
     */
    .directive('registerErrorProcessor', require('./register-error-processor/register-error-processor.directive.js'));