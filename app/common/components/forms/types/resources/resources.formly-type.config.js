/**
 * templateOptions: {
 *  options: [ device1, device2... ]
 *  }
 *
 *  device needs _id
 * @param {FormlyConfigProvider}
 */
function resources (formlyConfigProvider, RESOURCE_CONFIG) {
  var Naming = require('./../../../utils').Naming
  formlyConfigProvider.setType({
    name: 'resources',
    extends: 'multiCheckbox',
    defaultOptions: {
      templateOptions: {
        valueProp: '_id'
      }
    },
    templateUrl: window.COMPONENTS + '/forms/types/resources/resources.formly-type.config.html'
  })

  // Note that we cannot use ResourceSettings as this is executed in config time
  _.forOwn(RESOURCE_CONFIG.resources, function (resourceConfig, typeName) {
    var type = {
      name: Naming.resource(typeName),
      extends: 'resources',
      defaultOptions: {
        templateOptions: {
          type: typeName
        }
      }
    }
    if (_.has(resourceConfig, 'dataRelation.keyFieldName')) {
      type.defaultOptions.templateOptions.keyFieldName = resourceConfig.dataRelation.keyFieldName
    }
    formlyConfigProvider.setType(type)
  })
}

module.exports = resources
