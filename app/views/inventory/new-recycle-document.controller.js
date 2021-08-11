/**
 *
 * @param $scope
 * @param $stateParams
 * @param {module:resourceFields} resourceFields
 * @param {module:resources.Action} $stateParams.action
 */

function newRecycleDocumentCtrl ($scope, $stateParams, resourceFields, $state) {
  const recycleDocument = $scope.recycleDocument = $stateParams.doc
  //console.log('creating recycle for lot', resourceFields['RecycleDocument'])

  function leave () {
    $state.go('^')
  }

  class NewRecycleDocumentForm extends resourceFields['RecycleDocument'] {
    _submit (op) {
      return super._submit(op).then(leave)
    }

    cancel () {
      leave()
    }
  }

  $scope.form = new NewRecycleDocumentForm(recycleDocument)
}

module.exports = newRecycleDocumentCtrl

