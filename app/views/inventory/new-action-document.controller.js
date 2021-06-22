/**
 *
 * @param $scope
 * @param $stateParams
 * @param {module:resourceFields} resourceFields
 * @param {module:resources.Action} $stateParams.action
 */
function newActionDocumentCtrl ($scope, $stateParams, resourceFields, $state) {
  console.log($stateParams)
/**
  const action = $scope.action = $stateParams.action
  const type = action.type

  function leave () {
    $state.go('^')
  }

  class NewActionDocumentForm extends resourceFields[type] {
    _submit (op) {
      return super._submit(op).then(leave)
    }

    cancel () {
      leave()
    }
  }

  $scope.form = new NewActionDocumentForm(action)
 */
}

module.exports = newActionDocumentCtrl

