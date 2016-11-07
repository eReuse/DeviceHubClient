require('bower_components/Boxer/jquery.ba-dotimeout.js')
require('angular')
var inflection = require('inflection')

/**
 * Tries to copy a value using an own 'clone' property of it, or uses the angular standard way of doing it.
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
var Naming = {
  RESOURCE_PREFIX: '_',
  TYPE_PREFIX: ':',
  RESOURCES_CHANGING_NUMBER: require('./../constants/CONSTANTS.js').resourcesChangingNumber,

  /**
   * @param string {string} type or resource case
   * @returns {string} e.x.: 'devices_snapshot', 'component', 'events'
   */
  resource: function (string) {
    var prefix
    var type = string
    try {
      var values = this.popPrefix(string)
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
    var prefix
    var type = string
    try {
      var values = this.popPrefix(string)
      prefix = values[0] + this.TYPE_PREFIX
      type = values[1]
    } catch (err) {
      prefix = ''
    }
    return prefix + inflection.camelize(this._pluralize(type) ? inflection.singularize(type) : type)
  },

  _pluralize: function (string) {
    var value = inflection.dasherize(inflection.underscore(string))
    return _.includes(this.RESOURCES_CHANGING_NUMBER, value) || _.includes(this.RESOURCES_CHANGING_NUMBER, inflection.singularize(value))
  },

  /**
   * Erases the prefix and returns it.
   * @throws IndexError: There is no prefix
   * @param string {string}
   * @returns {Array} Two values: [prefix, type]
   */
  popPrefix: function (string) {
    var result = _.split(string, this.TYPE_PREFIX)
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
    var converted = string
    try {
      converted = this.popPrefix(string)[1]
    } catch (err) {}
    converted = inflection.humanize(inflection.underscore(converted))
    // Humanize destroys acronyms by adding a space between letters
    if (converted[0] !== ' ' && converted[1] === ' ' && converted[2] !== '' && converted[3] === ' ') return string
    else return converted
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
  var text = ''
  text += resource.label || ''
  if (text === '') {
    text += resource.email || ''
  }
  if (text === '') {
    text += resource._id
  }
  return Naming.humanize(resource['@type']) + ' ' + text
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
  var datetime = oldDate.toISOString()
  return datetime.substring(0, datetime.indexOf('.'))
}

/**
 * It is used in the views (see main app.js) to block loading of a view until schema is ready, needed for
 * views that manage resources (i.e. all except login view).
 * @param schema The schema service.
 * @return {$q.promise} The promise.
 */
function schemaIsLoaded (schema) {
  return schema.isLoaded()
}

function setImageGetter ($scope, jqueryExpression, nameOfVariableToStore) {
  $(jqueryExpression).change(function () {
    if (this.files && this.files[0]) {
      var reader = new FileReader()
      reader.onload = function (e) {
        $scope.$evalAsync(function (scope) {
          scope[nameOfVariableToStore] = e.target.result
        })
      }
      reader.readAsDataURL(this.files[0])
    }
  })
}

var Progress = {
  PROGRESS_NAME: 'dh-progress',
  /**
   * Barebone for a progress package that handles switching a global progress (cursor style). It is interesting
   * to handle different begin and end globally (e.x. only stopping the cursor after all end() have been executed)
   */
  start: function () {
    console.log(Progress.PROGRESS_NAME)
    $('*').addClass(Progress.PROGRESS_NAME)
  },
  stop: function () {
    console.log('stop')
    $('*').removeClass(Progress.PROGRESS_NAME)
  }
}

module.exports = {
  Naming: Naming,
  copy: copy,
  getResourceTitle: getResourceTitle,
  applyAfterScrolling: applyAfterScrolling,
  parseDate: parseDate,
  schemaIsLoaded: schemaIsLoaded,
  NoPrefix: NoPrefix,
  setImageGetter: setImageGetter,
  Progress: Progress
}
