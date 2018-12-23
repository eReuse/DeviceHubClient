/**
 * @param {ResourceForm} ResourceForm
 * @returns {{template: string, scope: {model: string}, link: link, restrict: string}}
 */
function resourceForm (ResourceForm) {
  return {
    template: `
    <form ng-submit="post()" id="resource-form" novalidate>
      <formly-form model="form.model" fields="form.fields" form="form.form"></formly-form>
    </form>`,
    restrict: 'E',
    scope: {
      model: '=',
      status: '='
    },
    link: $scope => {
      const form = {
        model: $scope.model,
        form: null
      }
      const resourceForm = new ResourceForm(form, $scope.status)
      $scope.post = () => resourceForm.post()
      $scope.form = form
    }
  }
}

module.exports = resourceForm
