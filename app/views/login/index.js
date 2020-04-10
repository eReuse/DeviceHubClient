/**
 * Represents the main devices view
 */
module.exports = angular.module('views.login',
  [
    require('@uirouter/angularjs').default,
    require('./../../common/components/authentication').name,
    require('./../../common/config').name,
    require('./../../common/constants').name,
    require('./../../common/components/utilities').name
  ])
  .controller('loginCtrl', require('./login.controller.js'))

