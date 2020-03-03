/**
 *
 * @param $scope
 * @param $stateParams
 * @param {module:resourceFields} resourceFields
 * @param {module:resources.Action} $stateParams.action
 */
function newActionCtrl ($scope, $stateParams, resourceFields, $state) {
  const action = $scope.action = $stateParams.action

  function leave () {
    $state.go('^')
  }

  class NewActionForm extends resourceFields[action.type] {
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

