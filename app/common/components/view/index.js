'use strict';

require('jsonformatter');

module.exports = angular.module('common.components.view',
    [
        require('./../../config').name,
        'jsonFormatter'
    ])
    .factory('cerberusToView', require('./cerberus-to-view.factory.js'))
    .directive('tableView', require('./table-view/table-view.directive.js'));