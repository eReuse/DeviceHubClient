/**
 *
 * @param $scope
 * @param $stateParams
 * @param {module:resourceFields} resourceFields
 * @param {module:resources.Action} $stateParams.action
 */
function confirmRevokeDocumentCtrl ($scope, $stateParams, resourceFields, $state) {
  const documents = $scope.doc = $stateParams.doc
  const type = 'ConfirmRevokeDocument'

  function leave () {
    $state.go('^')
  }

  class ConfirmRevokeDocumentForm extends resourceFields[type] {
    _submit (op) {
      return super._submit(op).then(leave)
    }

    cancel () {
      leave()
    }
  }

  $scope.form = new ConfirmRevokeDocumentForm(documents)
}

module.exports = confirmRevokeDocumentCtrl

