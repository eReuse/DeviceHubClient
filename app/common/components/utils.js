require('angular')
const inflection = require('inflection')

/**
 * Tries to copy a value using an own 'clone' property of it, or uses the angular standard way of
 * doing it.
 * @param value
 * @returns {*}
 */
function copy (value) {
  try {
    return value.clone()
  } catch (err) {
    return angular.copy(value)
  }
}

/**
 * Port from DeviceHub.utils.Naming. See that project for an explanation of the cases.
 */
const Naming = {
  RESOURCE_PREFIX: '_',
  TYPE_PREFIX: ':',
  RESOURCES_CHANGING_NUMBER: [
    'device',
    'event',
    'account',
    'place',
    'erase',
    'project',
    'package',
    'lot',
    'manufacturer',
    'group',
    'pallet'
  ],

  /**
   * @param string {string} type or resource case
   * @returns {string} e.x.: 'devices_snapshot', 'component', 'events'
   */
  resource: function (string) {
    let prefix
    let type = string
    try {
      const values = this.popPrefix(string)
      prefix = values[0] + this.RESOURCE_PREFIX
      type = values[1]
    } catch (err) {
      prefix = ''
    }
    type = inflection.dasherize(inflection.underscore(type))
    return prefix + (this._pluralize(type) ? inflection.pluralize(type) : type)
  },

  /**
   *
   * @param string {string} type or resource case
   * @returns {string} e.x.: 'devices:Snapshot', 'Component', 'Event'
   */
  type: function (string) {
    let prefix
    let type = string
    try {
      const values = this.popPrefix(string)
      prefix = values[0] + this.TYPE_PREFIX
      type = values[1]
    } catch (err) {
      prefix = ''
    }
    let resultingType = this._pluralize(type) ? inflection.singularize(type) : type
    resultingType = resultingType.replace('-', '_')
    return prefix + inflection.camelize(resultingType)
  },

  _pluralize: function (string) {
    const value = inflection.dasherize(inflection.underscore(string))
    return _.includes(this.RESOURCES_CHANGING_NUMBER, value) || _.includes(this.RESOURCES_CHANGING_NUMBER, inflection.singularize(value))
  },

  /**
   * Erases the prefix and returns it.
   * @throws IndexError: There is no prefix
   * @param string {string}
   * @returns {Array} Two values: [prefix, type]
   */
  popPrefix: function (string) {
    let result = _.split(string, this.TYPE_PREFIX)
    if (result.length === 1) {
      result = _.split(string, this.RESOURCE_PREFIX)
      if (result.length === 1) {
        throw new NoPrefix()
      }
    }
    return result
  },

  new_type: function (typeName, prefix) {
    prefix = prefix ? (prefix + this.TYPE_PREFIX) : ''
    return prefix + typeName
  },

  /**
   * For a given text, it returns a human friendly version, with spaces, etc.
   * @param string {string} If is type or resource name, it removes the spaces.
   * @returns {string}
   */
  humanize: function (string) {
    console.assert(_.isString(string), `Humanize only works with strings, not ${string}.`)
    let res = inflection.underscore(string)
    // inflection.underscore breaks camelCase words
    if (res[1] === '_' && res[3] === '_') res = string
    return inflection.humanize(res)
  }
}

/**
 * Exception for cases where popup prefix does not get a prefix.
 * @param message
 * @constructor
 */
function NoPrefix (message) {
  this.message = message
}

NoPrefix.prototype = Object.create(Error.prototype)

/**
 * Generates a suitable humanized title for a resource.
 * @param {Object} resource Resource object (not schema) with, at least, @type field
 * @return {string}
 */
function getResourceTitle (resource) {
  const text = resource.label || resource.email || resource._id
  return Naming.humanize(resource.type) + ' ' + text
}

function getEventDescription (event) {
  if (event.error) {
    return 'Something went wrong'
  }
  switch (event.type) {
    case 'devices:EreusePrice':
      return event.price + '€'
    case 'devices:AggregateRate':
      return event.ratingRange
    case 'devices:Snapshot':
      return 'OK'
    case 'devices:WorkbenchRate':
      return event.ratingRange + ' (appearance: ' + event.appearanceRange + ', functionality: ' + event.functionalityRange + ')'
    case 'devices:BenchmarkRamSysbench':
      return event.rate + ' points'
    case 'devices:StressTest':
      return 'OK'
    case 'devices:TestDataStorage':
      return event.status + '. Lifetime of ' + (+(event.lifetime / 365 / 24).toFixed(2)) + ' years'
    case 'devices:BenchmarkDataStorage':
      return 'Read: ' + event.readSpeed + ' MB/s Write: ' + event.writeSpeed
    case 'devices:BenchmarkProcessorSysbench':
      return event.rate + ' points'
    case 'devices:BenchmarkProcessor':
      return event.rate + ' points'
    case 'devices:Price':
      return event.price
    case 'devices:Ready':
      return 'OK'
    case 'devices:Prepare':
      return 'OK'
    case 'devices:ToPrepare':
      return 'OK'
    case 'devices:Delete':
      return 'OK'
    case 'devices:Trade':
      return 'OK'
    case 'devices:Confirm':
      return 'OK'
    case 'devices:Revoke':
      return 'OK'
    case 'devices:ConfirmRevoke':
      return 'OK'
  }
  return ''
}

/**
 * Executes $apply() after the element has scrolled.
 * @param {Object} element DOM element to detect the scroll
 * @param {$scope} $scope The scope which to execute apply()
 */
function applyAfterScrolling (element, $scope) {
  $(element).scroll(function () {
    $.doTimeout('scroll', 250, function () {
      $scope.$apply()
    })
  })
}

/**
 * Returns the string representation of a date following the server's representation
 * @param {Date} oldDate
 * @returns {string}
 */
function parseDate (oldDate) {
  const datetime = oldDate.toISOString()
  return datetime.substring(0, datetime.indexOf('.'))
}

function setImageGetter ($scope, jqueryExpression, pathToStore) {
  $(jqueryExpression).change(function () {
    if (this.files && this.files[0]) {
      const reader = new FileReader()
      reader.onload = function (e) {
        $scope.$evalAsync(function (scope) {
          _.set(scope, pathToStore, e.target.result)
        })
      }
      reader.readAsDataURL(this.files[0])
    }
  })
}

/**
 * Barebone for a progress package that handles switching a global progress (cursor style). It is
 * interesting to handle different begin and end globally (e.x. only stopping the cursor after all
 * end() have been executed)
 */
const Progress = {
  PROGRESS_NAME: 'dh-progress',
  running: false,
  start: function () {
    $('*').addClass(Progress.PROGRESS_NAME)
    Progress.running = true
  },
  stop: function () {
    $('*').removeClass(Progress.PROGRESS_NAME)
    Progress.running = false
  }
}

/**
 * Given a setting object (note there are two) and a path to a property, retrieves the property.
 * If the property is not in the object, it looks at the ancestors and retrieves from them.
 *
 * If the setting object is RESOURCE_CONFIG, just use *ResourceSettings.getSetting*.
 * @param settings - An object where the first level keys are resource types.
 * @param {ResourceSettings} rSettings
 * @param path - What you want to find from the resourcetype in rSettings or its ancestor
 * @throw {TypeError} - No setting found in the resource or ancestors
 * @returns {*}
 */
function getSetting (settings, rSettings, path) {
  let value = _.get(settings, rSettings.type + '.' + path)
  if (_.isUndefined(value)) {
    let ancestorSetting = _.find(settings, (setting, rType) => _.has(setting, path) && rSettings.isSubResource(rType))
    value = _.get(ancestorSetting, path)
    if (_.isUndefined(value)) throw TypeError(`Nor ${rSettings.type} or its ancestors have the setting ${path}`)
  }
  return value
}

/**
 * Like regular JS File but with an extra data property. This automatically
 * reads the contents of file and sets them in the data property.
 */
class DataFile {
  /**
   * @param {File} file
   * @param {string} readAs
   */
  constructor (file, readAs) {
    console.assert(readAs === 'readAsDataUrl' || readAs === 'readAsText')
    console.assert(file instanceof File)
    this.name = file.name
    this.size = file.size
    this.lastModified = file.lastModified
    this.data = null
    // We cannot use $q as this is used by 'config' providers
    this.loaded = new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = event => {
        this.data = event.target.result
        resolve(this.data)
      }
      reader[readAs](file)
    })
  }

  toString () {
    return this.name
  }
}

const perms = {
  READ: 'r',
  EDIT: 'e',
  RESTRICTED_EDIT: 're',
  ADMIN: 'ad',
  ACCESS: 'ac',
  PARTIAL_ACCESS: 'pa'
}
perms.RESOURCE_PERMS = new Set([perms.READ, perms.EDIT, perms.RESTRICTED_EDIT, perms.ADMIN])
perms.DB_PERMS = new Set([perms.DB_PERMS, perms.PARTIAL_ACCESS, perms.ADMIN])
perms.EXPLICIT_DB_PERMS = new Set([perms.ACCESS, perms.ADMIN])

const unforgivingHandler = {
  get: (obj, prop) => {
    // Lodash can check for length
    console.assert(prop === 'length' || prop in obj, 'Obj %s does not has %s', obj, prop)
    return obj[prop]
  }
}

/**
 * A subclass of urijs that can stringify to json.
 */
class URI extends require('urijs') {
  toJSON () {
    return this.toString()
  }
}

module.exports = {
  Naming: Naming,
  copy: copy,
  getResourceTitle: getResourceTitle,
  getEventDescription: getEventDescription,
  applyAfterScrolling: applyAfterScrolling,
  parseDate: parseDate,
  NoPrefix: NoPrefix,
  setImageGetter: setImageGetter,
  Progress: Progress,
  getSetting: getSetting,
  perms: perms,
  DataFile: DataFile,
  unforgivingHandler: unforgivingHandler,
  URI: URI
}
