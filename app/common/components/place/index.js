'use strict';
require('angular-ui-bootstrap');
require('angular-animate');
require('angular-simple-logger'); //Required by angular-google-maps
require('angular-google-maps');
require('bower_components/ngGeolocation/ngGeolocation.js');
require('angular-ui-notification');

module.exports = angular.module('common.components.placeNav',
        [
            'ui.bootstrap',
            'ngAnimate',
            'uiGmapgoogle-maps',
            'ngGeolocation',
            require('./../forms').name,
            'ui-notification'
        ]
    )
    .directive('placeIcon', require('./place-icon.directive.js'))
    .directive('createPlace', require('./create-place/create-place.directive.js'))
    .directive('placeNav', require('./place-nav.directive.js'));
