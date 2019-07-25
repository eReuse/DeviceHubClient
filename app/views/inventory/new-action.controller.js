/**
 *
 * @param $scope
 * @param $stateParams
 * @param {module:resourceFields} resourceFields
 * @param {module:resources.Action} $stateParams.action
 */
function newActionCtrl ($scope, $stateParams, resourceFields, $state) {
  const model = $scope.action = $stateParams.action

  function leave () {
    $state.go('^')
  }

  class NewActionForm extends resourceFields[model.type] {
    _submit (op) {
      return super._submit(op).then(leave)
    }

    cancel () {
      leave()
    }
  }

  $scope.form = new NewActionForm(model)
}

module.exports = newActionCtrl

