'use strict';

require('angular-ui-bootstrap');

module.exports = angular.module('common.components.accounts',
    [
        require('./../authentication').name,
        'ui.bootstrap',
        require('./../../constants/').name
    ])
    .directive('userButton', require('./user-button/user-button.directive.js'))
    .controller('userModalCtrl', require('./user-modal/user-modal.controller.js'))
    .directive('accountRole', require('./account-role/account-role.directive.js'))
    .directive('changeDatabase', require('./change-database/change-database.directive.js'));