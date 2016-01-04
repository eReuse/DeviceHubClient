'use strict';


module.exports = angular.module('common',
    [
        require('./constants').name,
        require('./config').name,
        require('./components').name
    ]);