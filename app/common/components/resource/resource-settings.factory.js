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
 * @return {_ResourceSettingsFactory}
 */
function resourceSettingsFactory (ResourceServer, schema, RESOURCE_CONFIG) {
  const utils = require('./../utils')
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
   * @property {Array} subResourcesNames A list of subresources (excluding itthis) in Type convention.
   * @property {boolean} accessible States if the user has the permission to work with the resource.
   * @property {boolean} isALeaf todo false (counterexample: EraseBasic) In the resource tree leafs (resources without
   * inner resources) are the actual specific resources we work with (you can have an object of devices:Snapshot but
   * not an object of
   * devices:deviceEvent).
   */
  class ResourceSettings {
    /**
     * @param {string} type - The resource type in Type convention.
     * @throw {TypeError} When type is not string.
     * @throw {TypeError} When type is not in Type convention.
     * @throw {TypeError} When type is the reserved keyword *_settings*
     */
    constructor (type) {
      if (!_.isString(type)) throw TypeError('Type is expected to be string, but it is ' + typeof type)
      if (utils.Naming.type(type) !== type) throw TypeError(type + ' should be of Type convention.')
      if (type === '_settings') throw TypeError('\'_settings\' is not a valid resource.')
      this.type = type
      this.resourceName = utils.Naming.resource(type)
      this.humanName = utils.Naming.humanize(type)
      this.settings = {}
      this.authorized = this.resourceName in schema.schema // The server only sends the schemas that we have access to
      if (this.authorized) {
        this.schema = schema.schema[this.resourceName]
        this.settings = _.assign(this._getInnerSettings(), this.schema._settings)
        this.server = ResourceServer(this.settings)
        this.types = this.schema['@type'].allowed
        this.subResourcesNames = _.without(this.types, this.type)
        this.isALeaf = this.subResourcesNames.length === 0 || this.type === 'devices:EraseBasic' // todo so works redo
      }
    }

    _getInnerSettings () {
      return RESOURCE_CONFIG.resources[this.type] || {}
    }

    /**
     * Gets full resourceSettings for all subresources (see property subResourcesName).
     * @return {Array}
     */
    getSubResources () {
      return _.map(this.subResourcesNames, subResourceName => _ResourceSettingsFactory(subResourceName))
    }

    /**
     * Returns if the actual type is a sub-resource of a given parent type.
     *
     * The parent type is not a subResource of itthis.
     *
     * @param {string} parentType In ResourceType format.
     * @return {boolean}
     */
    isSubResource (parentType) {
      return _.includes(_ResourceSettingsFactory(parentType).subResourcesNames, this.type)
    }

    /**
     * As *isSubResource* but including itself.
     * @param {string} parentType
     * @returns {boolean}
     */
    isSubResourceOrItself (parentType) {
      return parentType === this.type || this.isSubResource(parentType)
    }

    /**
     * Gets the setting in the settings of the passed-in resource or, if the resource has not
     * the setting, it gets it from one of its ancestors.
     *
     * The value of the setting cannot be 'undefined'.
     *
     * @param {string} path - The name of the setting to fetch.
     * @throw {TypeError} Nor the resource type of its ancestors had the setting.
     * @return {*} The value of the setting
     */
    getSetting (path) {
      return utils.getSetting(RESOURCE_CONFIG.resources, this, path)
    }
  }

  // ResourceSettings are singletons per resource, so we avoid duplicities for the same resource
  // This is the actual factory
  let resourceTypes = {}

  /**
   * @param {string} type - The resource type name
   * @returns {ResourceSettings}
   * @private
   */
  function _ResourceSettingsFactory (type) {
    if (!(type in resourceTypes)) resourceTypes[type] = new ResourceSettings(type)
    return resourceTypes[type]
  }

  // Let's add lodash mixins related to resources
  window._.mixin({
    /**
     * Given a parent type, returns a function that checks if a given resource it is subtype.
     * @param {string} resourceType - The parent type to check against.
     * @returns {Function}
     */
    subResourceF: resourceType => _.includesF(_ResourceSettingsFactory(resourceType).types, '@type')
  })

  return _ResourceSettingsFactory
}

module.exports = resourceSettingsFactory
