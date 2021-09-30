/**
 *
 * @param $scope
 * @param $stateParams
 * @param {module:resourceFields} resourceFields
 * @param {module:resources.Action} $stateParams.action
 */
function confirmDocumentCtrl ($scope, $stateParams, resourceFields, $state) {
  const documents = $scope.doc = $stateParams.doc
  const type = 'ConfirmDocument'

  function leave () {
    $state.go('^')
  }

  class ConfirmDocumentForm extends resourceFields[type] {
    _submit (op) {
      return super._submit(op).then(leave)
    }

    cancel () {
      leave()
    }
  }

  $scope.form = new ConfirmDocumentForm(documents)
}

module.exports = confirmDocumentCtrl

