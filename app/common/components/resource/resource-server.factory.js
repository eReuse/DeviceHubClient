// TODO what's the difference to config/restangular.config.js ? Merge the two config files?

const utils = require('./../utils.js')
const schemas = require('./../../config/schema_reduced')

/**
 * Provides a suitable connexion to DeviceHub, personalised for the resource.
 *
 * The server automatically takes care to particularities of resources, like handling databases.
 *
 * This is an extension of {@link https:// github.com/mgonto/restangular#how-to-create-a-restangular-service-with-a-different-configuration-from-the-global-one Restangular's different configuration manual}.
 */
function ResourceServer (schema, Restangular) {
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
    let service
    let restangularConfig
    let url = settings.url

    switch (url) {
      case 'lots/':
        service = RestangularConfigurerResource.service(url)
        break
      case 'devices/':
        service = RestangularConfigurerResource.service(url)
        break
      case 'snapshots/':
        service = Restangular.withConfig(function (RestangularProvider) {
          RestangularProvider.addRequestInterceptor(function (element) {
            element = utils.copy(element)
            delete element['@type']
            return element
          })
        }).service(url)
        break
      default:
        url = url.split('/')
        switch (url.length) {
          case 2:
            restangularConfig = RestangularConfigurerResource.all(url[0])
            break
          case 3:
            restangularConfig = RestangularConfigurerResource.one(url[0], url[1])
            break
        }
        service = RestangularConfigurerResource.service(url[url.length - 1], restangularConfig)
        break
    }

    /**
     * Finds the given text in field. Text can be a partial word.
     * @param {string[]} names The name of the field
     * @param {string} text The text to look for
     * @param {boolean} valueMatchesBeginning - If the text should match from the beginning.
     * makes the search quite faster.
     * @param {int} maxResults - The number of results to query and show.
     * @type {string}
     * @return {$q} The same promise as service.getList()
     */
    service.findText = (names, text, valueMatchesBeginning = false, maxResults = 6) => {
      // We look for words starting by filterValue (so we use indexs), case-insensible (options: -i)
      const query = {
        search: text
      }
      if (_.isInteger(maxResults)) query.max_results = maxResults
      return service.getList(query)
    }

    /**
     * Regular POST containing files, complying with Python-eve 'media' rules.
     *
     * See http://python-eve.org/features.html#file-storage
     * @param {Object} model
     * @param {string} fileKey - The property in model where the files are (if any). Use only
     * when models carry a property describing the fields that **you don't want to upload**, as
     * this property is not included.
     * @param {File[]} files - An array of file objects.
     * @returns {Promise} - Restangular promise.
     */
    service.postWithFiles = (model, fileKey, files) => {
      // python-eve requires content-type: form-data when uploading files
      // from https://github.com/mgonto/restangular/#how-can-i-send-files-in-my-request-using-restangular
      // and https://github.com/mgonto/restangular/issues/420#issuecomment-223011383
      const fd = new FormData()
      for (const key in model) if (key !== fileKey) fd.append(key, JSON.stringify(model[key]))
      files.forEach(f => { fd.append(fileKey, f) })
      return service.withHttpConfig({transformRequest: angular.identity})
        .customPOST(fd, undefined, undefined, {'Content-Type': _.noop})
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
  const RestangularConfigurerResource = Restangular.withConfig(function (RestangularProvider) {
    /**
     * Parses resources received from the server.
     */
    RestangularProvider.addResponseInterceptor(function (data, operation, resourceName, url, response) {
      // TODO update this and move code form resource-list-getter here
      if (operation === 'getList') {
        data = data.items
        for (let i = 0; i < data.length; i++) {
          parse(data[i], schemas[resourceName])
        }
      } else if (response.status !== 204) {
        parse(data, schemas[resourceName])
      }
      return data
    })

    /**
     * Parses resources sent to the server.
     */
    RestangularProvider.addRequestInterceptor(function (element, operation) {
      if (operation === 'put') {
        // Note we can't copy FormData
        element = utils.copy(element) // We don't want to touch the passed-in element
        for (const fieldName in element) {
          if (fieldName === '_created' ||
            fieldName === '_updated' ||
            fieldName === '_links') {
            delete element[fieldName]
          }
        }
      }
      return element
    })
  })

  // /**
  //  * A special configuration for Restangular that has the database preppended in the base url, used for
  //  * some resources.
  //  */
  // const RestangularConfigurerCustomDB = RestangularConfigurerResource.withConfig(_.noop) // We can configure it outside
  //
  // function setDatabaseInUrl (db) {
  //   RestangularConfigurerCustomDB.setBaseUrl(CONSTANTS.url + '/' + db)
  // }
  //
  // session.loaded.then(() => setDatabaseInUrl(session.db)) // Session may load before us
  // session.callWhenDbChanges(setDatabaseInUrl) // For next changes

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
  if (_.isNil(item)) {
    return
  }
  _.assign(item, {
    _id: item.id,
    _updated: item.updated,
    _created: item.created
  })

  function convertToUTC (dateString) {
    // return new Date(dateString + 'Z') TODO this doesn't work anymore
    return new Date(dateString)
  }

  // todo this first for should be nested
  for (const fieldName in schema) {
    switch (schema[fieldName].type) {
      case 'datetime':
        if (item[fieldName]) {
          item[fieldName] = convertToUTC(item[fieldName])
        }
        break
    }
  }

  // We do only one nested level, as python-eve cannot go more deeper neither (of object and array)
  _.forOwn(item, function (prop) {
    if (_.isArray(prop)) {
      _.forEach(prop, parse)
    }
  })
  parseDate(item)

  function parseDate (item) {
    _parseDate(item, '_updated')
    _parseDate(item, '_created')

    function _parseDate (item, propertyName) {
      if (!item[propertyName]) {
        return
      }
      const a = convertToUTC(item[propertyName]) // z stands for 'utc'
      if (!_.isNaN(a.getTime())) item[propertyName] = a
    }
  }
}

module.exports = ResourceServer
