var utils = require('./../utils.js')

/**
 * Provides a suitable connexion to DeviceHub, personalised for the resource.
 *
 * The server automatically takes care to particularities of resources, like handling databases.
 *
 * This is an extension of {@link https:// github.com/mgonto/restangular#how-to-create-a-restangular-service-with-a-different-configuration-from-the-global-one Restangular's different configuration manual}.
 */
function ResourceServer (schema, Restangular, CONSTANTS, session) {
  /**
   * Obtains the server proxy for a ResourceSettings.
   *
   * Note that an existing resource (no the settings) does not need this method, as it already have put, get,
   * delete... methods. Use this to get or post new resources.
   *
   * This extends from {@link https://github.com/mgonto/restangular#decoupled-restangular-service Restangular's decoupled service manual}.
   * @param {Object} settings settings from ResourceSettings
   * @return {Object} A Restangular connexion with get, getList and post.
   */
  function _ResourceServer (settings) {
    var url = settings.url.split('/')

    // We use the settings for default database or custom one
    var CustomRestangular = settings.useDefaultDatabase ? RestangularConfigurerResource : RestangularConfigurerCustomDB
    var restangularConfig
    switch (url.length) {
      case 2:
        restangularConfig = CustomRestangular.all(url[0])
        break
      case 3:
        restangularConfig = CustomRestangular.one(url[0], url[1])
        break
    }
    var service = CustomRestangular.service(url[url.length - 1], restangularConfig)
    /**
     * Finds the given text in field. Text can be a partial word.
     * @param {string} name The name of the field
     * @param {string} text The text to look for
     * @param {bool} valueMatchesBeginning Optional, default false. If the text should match from the beginning,
     * makes the search quite faster.
     * @type {string}
     * @return {$q} The same promise as service.getList()
     */
    service.findText = function (name, text, valueMatchesBeginning) {
      var fromBeginning = valueMatchesBeginning ? '^' : ''
      var searchParams = {where: {}}
      // We look for words starting by filterValue (so we use indexs), case-insensible (options: -i)
      searchParams.where[name] = {$regex: fromBeginning + text, $options: '-ix'}
      return service.getList(searchParams)
    }
    return service
  }

  /* Configurations */

  /*
   We create 2 Configurations of Restangular, one generic for resources and another one for resources that have
   databases.
   When using withConfig Restangular clones (full copy, not referencing) the config file, doing a kind of extension.
   We will first extend Restangular creating the generic configuration for resources, modifying and adding the
   configuration we want, and then we extend this one for the specific case of the databases, modifying again
   those parameters.
   */
  var RestangularConfigurerResource = Restangular.withConfig(function (RestangularProvider) {
      /**
       * Parses resources received from the server.
       */
      RestangularProvider.addResponseInterceptor(function (data, operation, resourceName, url, response, deferred) {
        if (resourceName in schema.schema) {
          if (operation === 'getList') {
            for (var i = 0; i < data.length; i++) parse(data[i], schema.schema[resourceName])
          } else if (response.status !== 204) parse(data, schema.schema[resourceName])
        }
        return data
      })

      /**
       * Parses resources sent to the server.
       */
      RestangularProvider.addRequestInterceptor(function (originalElement, operation, what, url) {
        var element = utils.copy(originalElement)
        if (operation === 'post') {
          for (var fieldName in element) {
            if (element[fieldName] instanceof Date) {
              element[fieldName] = utils.parseDate(element[fieldName])
            }
          }
        }
        if (operation === 'put') {
          for (fieldName in element) {
            if (fieldName === '_created' ||
              fieldName === '_updated' ||
              fieldName === '_links') {
              delete element[fieldName]
            }
          }
        }
        return element
      })
    }
  )

  /**
   * A special configuration for Restangular that has the database preppended in the base url, used for
   * some resources.
   */
  var RestangularConfigurerCustomDB = RestangularConfigurerResource.withConfig(_.noop) // We can configure it outside

  /**
   * Changes the database in the url for the configuration with databases
   * @param {string} database New database to override existing
   */
  function setDatabaseInUrl (database) {
    RestangularConfigurerCustomDB.setBaseUrl(CONSTANTS.url + '/' + database)
  }

  session.callWhenDatabaseChanges(setDatabaseInUrl)
  if (!_.isNull(session.activeDatabase)) {
    setDatabaseInUrl(session.activeDatabase)
  } // In case there is already a database set

  return _ResourceServer
}

/**
 * Auxiliary method that parses (from DeviceHub to DeviceHubClient) resources.
 *
 * todo this could read from a Translator dictionary in constants, being easily extensible
 * @param item
 * @param schema
 */
function parse (item, schema) {
  // todo this first for should be nested
  for (var fieldName in schema) {
    switch (schema[fieldName].type) {
      case 'datetime':
        item[fieldName] = new Date(item[fieldName])
        break
    }
  }

  // We do only one nested level, as python-eve cannot go more deeper neither (of object and array)
  _.forOwn(item, function (val) {
    if (_.isArray(val)) {
      _.forEach(val, parseDate)
    } else if (_.isObject(val)) parseDate(val)
  })
  parseDate(item)

  function parseDate (val) {
    _parseDate(val, '_updated')
    _parseDate(val, '_created')

    function _parseDate (value, propertyName) {
      var a = new Date(value[propertyName])
      if (!_.isNaN(a.getTime())) value[propertyName] = a
    }
  }
}

module.exports = ResourceServer
