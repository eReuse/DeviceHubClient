/**
 *
 * @param $scope
 * @param {module:fields} fields
 * @param {module:android} android
 */
function importCtrl ($scope, android, fields, $state) {
  class Import extends fields.Form {
    constructor () {
      super(
        {},
        new fields.Upload('file', {
          accept: 'application/vnd.ms-excel',
          namespace: 'import'
        })
      )
    }

    cancel () {
      $state.go('^')
    }
  }

  $scope.form = new Import()
}

module.exports = importCtrl

