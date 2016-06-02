'use strict';

require('angular-ui-router');
require('bower_components/angular-timeline/dist/angular-timeline.js');
require('angular-ui-bootstrap');

module.exports = angular.module('common.components.eventsPerDevice',
    [
        require('app/common/config').name,
        'ui.bootstrap',
        require('./../event').name,
        'ui.router',
        'angular-timeline'

    ])
    /**
     * @ngdoc directive
     * @name eventsPerDevice
     * @description Shows a chronology of events for a given device.
     * @param {Object} id Object with one property: _id, which is a string identifying the device. We use an object
     * to be able to watch over it, and load a new device when the _id changes.
     */
    .directive('eventsPerDevice', require('./events-per-device.directive.js'));