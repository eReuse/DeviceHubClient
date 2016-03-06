'use strict';
require('angular-ui-bootstrap');
require('angular-animate');
require('angular-simple-logger'); //Required by angular-google-maps
require('angular-google-maps');
require('bower_components/ngGeolocation/ngGeolocation.js');
require('angular-ui-notification');
require('angular-recursion');

module.exports = angular.module('common.components.placeNav',
        [
            'ui.bootstrap',
            'ngAnimate',
            'uiGmapgoogle-maps',
            'ngGeolocation',
            require('./../forms').name,
            'ui-notification',
            'RecursionHelper'
        ]
    )
    .directive('placeIcon', require('./place-icon.directive.js'))
    .directive('createPlace', require('./create-place/create-place.directive.js'))
    .directive('editPlace', require('./edit-place/edit-place.directive.js'))
    .directive('placeView', require('./place-view/place-view.directive.js'))
    .directive('placeNav', require('./place-nav.directive.js'));
