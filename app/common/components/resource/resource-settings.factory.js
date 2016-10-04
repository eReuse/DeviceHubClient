var utils = require('./../utils')

var Unauthorized = require('./../authentication/Unauthorized')

/**
 * @typedef {Object} ResourceSettingsRet
 * @property {Function} of The ResourceSettings method
 * @property {$q.defer} loaded A promise indicating if all resources are ready to use
 */

/**
 * A factory for resourceSettings. Once you import ResourceSettings, just do:
 *
 * var specificResourceSettings = ResourceSettings(resourceType)
 * var snapshotSettings = ResourceSettings('devices:Snapshot')
 *
 * ResourceSettings can be used after the schema has loaded, which happens after the account is created
 * (by login or by restoring from localStorage). If you try to use the ResourceSettings before you will get an exception.
 * Devices and reports views will need a schema loaded, which is retrieved after the account is created.
 *
 * To know when ResourceSettings in are ready to use, do ResourceSettings.loaded.then(f())
 *
 * @return {ResourceSettingsRet}
 */
function resourceSettingsFactory (ResourceServer, schema, RESOURCE_CONFIG) {
  /**
   * Similar to DeviceHub's ResourceSettings, it stores several information about a resource. It can do:
   * - Stores settings and schema
   * - 'server' variable is a configured Restangular for the resource, use it to get or post.
   *
   * Note that to use this method you will need
   *
   * Classes in angular:
   * https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
   *
   * @param {string} type The type of the resource in Type convention.
   * @property {string} type The type of the resource in Type convention.
   * @property {string} resourceName The type in resource convention.
   * @property {object} schema The specific schema of the resource.
   * @property {object} settings Settings and configurations for the resource, from the server and RESOURCE_CONFIG,
   * you can add more by extending RESOURCE_CONFIG or through DeviceHub.
   * @property {object} server A gateway to send POST and GET petitions
   * @property {Array} subResourcesNames A list of subresources (excluding itself) in Type convention.
   * @property {boolean} accessible States if the user has the permission to work with the resource.
   * @property {boolean} isALeaf todo false (counterexample: EraseBasic) In the resource tree leafs (resources without
   * inner resources) are the actual specific resources we work with (you can have an object of devices:Snapshot but
   * not an object of
   * devices:deviceEvent).
   */
  function ResourceSettings (type) {
    if (!_.isString(type)) throw TypeError('ResourceSettings: type is expected to be string, but it is ' + typeof type)
    if (utils.Naming.type(type) !== type) throw TypeError(type + ' should be of Type convention.')
    var self = this
    this.type = type
    this.resourceName = utils.Naming.resource(type)
    this.humanName = utils.Naming.humanize(type)
    this.settings = {}
    this.authorized = self.resourceName in schema.schema // The server only sends the schemas that we have access to
    if (this.authorized) {
      self.schema = schema.schema[self.resourceName]
      // DeviceHub sends us data in underscore
      var settings = _.mapKeys(self.schema['_settings'], function (value, key) {
        return _.camelCase(key)
      })
      self.settings = _.assign(self._getInnerSettings(), settings)
      self.server = ResourceServer(self.settings)
      self.subResourcesNames = _.without(self.schema['@type']['allowed'], self.type)
      self.isALeaf = self.subResourcesNames.length === 0 || self.type === 'devices:EraseBasic' // todo so works redo
    }
  }

  var rs = ResourceSettings.prototype

  rs._getInnerSettings = function () {
    return RESOURCE_CONFIG.resources[this.type] || {}
  }

  /**
   * Gets full resourceSettings for all subresources (see property subResourcesName).
   * @return {Array}
   */
  rs.getSubResources = function () {
    var subResources = []
    _.forEach(this.subResourcesNames, function (subResourceName) {
      subResources.push(_ResourceSettingsFactory(subResourceName))
    })
    return subResources
  }

  /**
   * Returns if the actual type is a sub-resource of a given parent type.
   * @param {string} parentType In ResourceType format.
   * @return {boolean}
   */
  rs.isSubResource = function (parentType) {
    return _.includes(_ResourceSettingsFactory(parentType).subResourcesNames, this.type)
  }

  rs.throwError = function () {
    throw Unauthorized('The user is not authorized to submit this resource in DeviceHub.')
  }

  // ResourceSettings are singletons per resource, so we avoid duplicities for the same resource
  // This is the actual factory
  var resourceTypes = {}

  function _ResourceSettingsFactory (type) {
    if (!(type in resourceTypes)) {
      resourceTypes[type] = new ResourceSettings(type)
    }
    return resourceTypes[type]
  }

  return _ResourceSettingsFactory
}

module.exports = resourceSettingsFactory
