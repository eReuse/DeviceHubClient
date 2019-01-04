/**
 *
 * @param $scope
 * @param $stateParams
 * @param {module:resourceFields} resourceFields
 * @param {module:resources.Event} $stateParams.event
 */
function newEventCtrl ($scope, $stateParams, resourceFields, $state) {
  const model = $stateParams.event
  $scope.form = new resourceFields[model.type](model)

  $scope.post = () => {
    $scope.form.post().then(() => {
      $state.go('^')
    })
  }
}

module.exports = newEventCtrl

