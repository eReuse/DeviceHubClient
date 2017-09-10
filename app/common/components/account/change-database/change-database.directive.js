function changeDatabase (session) {
  const utils = require('./../../utils')
  return {
    template: require('./change-database.directive.html'),
    restrict: 'E',
    replace: true,
    scope: false, // It should be {} but it doesn't work with replace
    link: $scope => {
      $scope.session = session
      session.loaded.then(
        function generateDatabaseArray (account) {
          const PERMS = utils.perms.EXPLICIT_DB_PERMS
          $scope.dbs = {
            full: Object.keys(_.pickBy(account.databases, p => PERMS.has(p))),
            shared: Object.keys(_.pickBy(account.databases, p => !PERMS.has(p)))
          }
        }
      )
    }
  }
}

module.exports = changeDatabase
