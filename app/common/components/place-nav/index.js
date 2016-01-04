'use strict';
require('angular-ui-bootstrap');
require('angular-animate');
require('angular-simple-logger'); //Required by angular-google-maps
require('angular-google-maps');
require('bower_components/ngGeolocation/ngGeolocation.js');

module.exports = angular.module('common.components.placeNav',
        [
            'ui.bootstrap',
            'ngAnimate',
            'uiGmapgoogle-maps',
            'ngGeolocation'
        ]
    )
    .directive('placeNav', require('./place-nav.directive.js'))
    .controller('placeModalCtrl', require('./place-modal.controller.js'));
