/**
 *
 * @param $scope
 * @param $stateParams
 * @param {module:resourceFields} resourceFields
 * @param {module:resources.Event} $stateParams.event
 */
function newEventCtrl ($scope, $stateParams, resourceFields, $state) {
  const model = $stateParams.event

  function leave () {
    $state.go('^')
  }

  class NewEventForm extends resourceFields[model.type] {
    _submit (op) {
      return super._submit(op).then(leave)
    }

    cancel () {
      leave()
    }
  }

  $scope.form = new NewEventForm(model)
}

module.exports = newEventCtrl

