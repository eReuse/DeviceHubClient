function groupResourceAdd (ResourceSettings, GroupResourceSubmitter) {
  /**
   * @ngdoc directive
   * @name groupResourceAdd
   * @description Adds resources to a group. If the group is not a lot, resources will see their group replaced by
   * the new one, otherwise they keep the other groups plus the new one.
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
            templateOptions: {
              label: `Name of the ${gSettings.humanName}`,
              keyFieldName: 'label',
              resourceName: groupType,
              filterFieldName: 'label',
              labelFieldName: 'label',
              required: true
            },
            type: 'typeahead'
          }],
          model: {
            resources: $scope.resources
          }
        }
        let grs = new GroupResourceSubmitter($scope.resources, $scope.resourceType, groupType, form, $scope, $scope.success, true)
        form.submit = model => grs.submit(model.groupLabel)
        $scope.typeahead = typeahead
        $scope.form = form
      }
    }
  }
}

module.exports = groupResourceAdd
