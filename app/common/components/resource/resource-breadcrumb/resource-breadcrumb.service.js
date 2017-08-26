const utils = require('./../../utils')

/**
 * Manages folder style navigation for resources, containing a log used for breadcrumbs.
 *
 * Navigation in resources follows REST conventions by showing a PATH in the navigation bar of the browser:
 *
 * .../packages-1/lots-94/devices-53?filters=...
 *
 * This class provides the functionality to navigate through this folder-style path.
 *
 * @prop {string} STATE - Constant. ui-router name of the resource state.
 * @prop {{}} $state - ui-router's $state.
 * @prop {string} FOLDER - What it is used as a folder separator for the URI. Should be standard '/' but angularjs
 * has a problem with it, and we use '|' for now.
 * @prop {string} NAME - Separator for the resourceName and resource id within the path (ex: packages and 1). Must be
 * something that is not used to generate neither the id or the resourceName.
 * @prop {[]} log - An array containing the resources of each piece of the path. For the URI above, this would contain:
 * an empty object (as always contains an empty object representing the main inventory view), the package 1, the lot 94
 * and the device 53. The resource may contain, as a minnimum, the @type and _id, and can contain the whole resource
 * too. *This variable is never replaced* so it can be used in $scope.
 * @prop {string} path - A copy of the URI.
 * @prop {{}} objects - Internal. A cache of full resources used for paths in the lifetime of the app.
 */
class ResourceBreadcrumb {
  constructor ($rootScope, $state) {
    this.STATE = 'index.inventory.resource'
    this.$state = $state
    this.FOLDER = '|' // todo new ui-router versions allows us to use '/'
    this.NAME = '.' // short-id uses characters like '-' or '_' so we can't use them
    this.log = [{}] // Default view with inventory
    this.path = ''
    this.resources = {}
    if ($state.current.name === this.STATE && $state.params.folderPath) {
      // When the service is created we can already be in a resource view,
      // if the user manually set the URL in the browser
      this._assign($state.params.folderPath)
    }
    $rootScope.$on('$stateChangeSuccess', (event, toState, toParams) => {
      // We listen for successful changes in the state (URL)
      // If we navigate to a resource state we assign our path to the breadcrumb
      // Otherwise we reset the breadcrumb by passing an empty string
      this._assign(toState.name === this.STATE ? toParams.folderPath : '')
    })
  }

  /**
   * Goes or opens a resource, changing angular-ui-router's state.
   *
   * This method builds the new path to navigate to.
   * @param {Object} resource - A Resource.
   */
  go (resource) {
    const i = _.findIndex(this.log, resource)
    this.resources[resource['@type'] + this.FOLDER + resource._id] = resource // Add to cache
    // We only append a new /resource-id in the end of the url (eg, going deeper to the jerarchy) if the
    // resource is not already in the path, in such case we go up to the jierarchy until our resource
    const path = this._logToPath(i === -1 ? this.log.concat([resource]) : _.take(this.log, i + 1))
    this.$state.go(this.STATE, {folderPath: path})
  }

  /**
   * Converts a path (string) to a log (array).
   * @param {string} path
   * @return {Array}
   * @private
   */
  _pathToLog (path) {
    const self = this
    const log = path ? _(path).split(this.FOLDER).map(resourceData => {
      const [resourceName, id] = resourceData.split(self.NAME)
      const type = utils.Naming.type(resourceName)
      return self.resources[type + self.FOLDER + id] || {'@type': type, _id: id}
    }).value() : []
    log.unshift({}) // Inventory
    return log
  }

  /**
   * Converts a log (array) to path (string)
   * @param {Array} log
   * @returns {string}
   * @private
   */
  _logToPath (log) {
    log.shift()
    return _.map(log, r => utils.Naming.resource(r['@type']) + this.NAME + r._id).join(this.FOLDER)
  }

  /**
   * Populates this.path and this.log with the new entry path
   * @param {string} path - The path as from the URL (note that path is from angular-ui-router's $stateParams)
   * @private
   */
  _assign (path) {
    this.path = path
    this.log.length = 0 // We reset the log
    _.assign(this.log, this._pathToLog(this.path))
  }
}

module.exports = ResourceBreadcrumb
