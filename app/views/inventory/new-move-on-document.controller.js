/**
 *
 * @param $scope
 * @param $stateParams
 * @param {module:resourceFields} resourceFields
 * @param {module:resources.Action} $stateParams.action
 */

function newMoveOnDocumentCtrl ($scope, $stateParams, resourceFields, $state) {
  const moveOnDocument = $scope.moveOnDocument = $stateParams.doc

  function leave () {
    $state.go('^')
  }

  class NewMoveOnDocumentForm extends resourceFields['MoveOnDocument'] {
    _submit (op) {
      return super._submit(op).then(leave)
    }

    cancel () {
      leave()
    }
  }

  $scope.form = new NewMoveOnDocumentForm(moveOnDocument)
}

module.exports = newMoveOnDocumentCtrl

