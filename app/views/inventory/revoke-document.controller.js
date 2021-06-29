/**
 *
 * @param $scope
 * @param $stateParams
 * @param {module:resourceFields} resourceFields
 * @param {module:resources.Action} $stateParams.action
 */
function revokeDocumentCtrl ($scope, $stateParams, resourceFields, $state) {
  const documents = $scope.docs = $stateParams.doc
  const type = 'RevokeDocument'

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

  $scope.form = new RevokeDocumentForm(documents)
}

module.exports = revokeDocumentCtrl

