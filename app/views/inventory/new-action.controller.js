/**
 *
 * @param $scope
 * @param $stateParams
 * @param {module:resourceFields} resourceFields
 * @param {module:resources.Action} $stateParams.action
 */
function newActionCtrl ($scope, $stateParams, resourceFields, $state) {
  const action = $scope.action = $stateParams.action
  const type = action.proofType || action.type // TODO hacky: proofs should have their own controller

  function leave () {
    $state.go('^')
  }

  class NewActionForm extends resourceFields[type] {
    _submit (op) {
      return super._submit(op).then(leave)
    }

    cancel () {
      leave()
    }
  }

  $scope.form = new NewActionForm(action)
}

module.exports = newActionCtrl

