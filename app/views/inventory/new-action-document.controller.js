/**
 *
 * @param $scope
 * @param $stateParams
 * @param {module:resourceFields} resourceFields
 * @param {module:resources.Action} $stateParams.action
 */
function revokeDocumentCtrl ($scope, $stateParams, resourceFields, $state) {
  const doc = $scope.doc = $stateParams.doc
  const type = 'ConfirmDocument'

  function leave () {
    $state.go('^')
  }

  class RevokeDocumentForm extends resourceFields[type] {
    _submit (op) {
      return super._submit(op).then(leave)
    }

    cancel () {
      leave()
    }
  }

  $scope.form = new RevokeDocumentForm(doc)
}

module.exports = revokeDocumentCtrl

