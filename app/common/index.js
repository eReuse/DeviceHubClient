module.exports = angular.module('common',
  [
    require('./constants').name,
    require('./config').name,
    require('./components').name,
    require('./../../dist/templates.js').name // Needed for tests that depend only of components
  ])
