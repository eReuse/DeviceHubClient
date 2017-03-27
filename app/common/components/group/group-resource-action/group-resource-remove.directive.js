function groupResourceRemove (ResourceSettings, GroupResourceSubmitter) {
  /**
   * @ngdoc directive
   * @name groupResourceRemove
   * @description Removes the resources from a group. This directive only shows groups that are, at least, **parents**
   * of one of the resources. Resources that were not from the selected group are left as they are. Note that you can
   * only remove parent groups: if a device is inside a package, and the package is inside a lot, and you want to
   * remove the device from the lot, you need to remove the package, as the device is inside the lot indirectly and
   * because of the package.
   * @param {'resources'} resources - = The resources.
   * @param {string} resourceType - @ The resource type of the resources.
   * @param {string} groupType - @ The resource type of the group.
   * @param {expression} success - & Expression executed when the *add* has been successful.
   */
  return {
    templateUrl: require('./__init__').PATH + '/group-resource-action.directive.html',
    restrict: 'E',
    scope: {
      resources: '=',
      resourceType: '@',
      groupType: '@',
      success: '&' // Callback executed when the op has been successful
    },
    link: {
      pre: $scope => {
        const groupType = $scope.groupType
        const gSettings = ResourceSettings(groupType)
        const groupServer = gSettings.server

        let typeahead = {
          group: null, // The ng-model of the typeahead
          get: _.bind(groupServer.findText, groupServer, 'label', _)
        }
        let form = { // Note that for the form to work correctly with formly, we need to be in link's pre
          fields: [{
            key: 'groupLabel',
            type: 'select',
            templateOptions: {
              label: `${gSettings.humanName} to remove the elements from`,
              valueProp: 'name',
              options: _($scope.resources)
                .flatMap(resource => _(resource.ancestors).filter({'@type': groupType}).map('label').value())
                .uniq()
                .map(label => ({name: label}))
                .value(),
              description: `We only show ${gSettings.humanName} that contain, are strictly parents, 
                            of at least one of the selected items.`, // todo explain parent vs ancestor
              required: true
            }
          }],
          model: {}
        }
        let grs = new GroupResourceSubmitter($scope.resources, $scope.resourceType, groupType, form, $scope, $scope.success, false)
        form.submit = model => grs.submit(model.groupLabel)
        $scope.typeahead = typeahead
        $scope.form = form
      }
    }
  }
}

module.exports = groupResourceRemove
