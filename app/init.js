/**
 * Common initialisations for the App and tests. Just require this file.
 */

window.COMMON = 'common'
window.COMPONENTS = 'common/components'
window.VIEWS = 'views'

window.$ = window.jQuery = require('jquery') // We globally load jQuery
window._ = require('lodash')

const apiCheck = require('api-check')
apiCheck.globalConfig.disabled = true

require('angular')
require('bootstrap')
require('angular-sanitize')
const isPresent = require('is-present')

// NEW METHODS FOR LODASH //
window._.mixin({
  /**
   * As in Python's dict's pop: gets element on path and deletes it in the object.
   */
  pop: (object, path, def) => {
    const value = _.get(object, path, def)
    _.unset(object, path)
    return value
  },
  /**
   * Like 'remove' but returning the first removed element.
   * @param array
   * @param predicate
   */
  removeOne: (array, predicate) => _.remove(array, predicate)[0],
  /**
   * Like concat but without creating a new array. Internally
   * uses Jquery's merge
   * @param {Array} array
   * @param {Array} otherArray
   */
  arrayExtend: (array, otherArray) => {
    window.$.merge(array, otherArray)
  },
  /**
   * Like _.matches for isMatch; creates a function that executes
   * includes for a giving path and array.
   * @param {string} path - Path of the object to check.
   * @param {array} array - Array to check against.
   * @return {Function} - A function that performs _.includes for
   * the value in the path for the passed in object.
   */
  includesF: (array, path) => value => _.includes(array, _.get(value, path)),
  /**
   * Is the variable not empty (checked in a smart way)?
   *
   * See https://www.npmjs.com/package/is-present#usage
   */
  isPresent: isPresent,
  /**
   * Checks if source includes text in a search-friendly way
   * (ignoring case, etc.).
   * @param {string} source
   * @param {string} text
   * @return {boolean}
   */
  includesText: (source, text) => {
    console.assert(_.isString(text), 'Can only search strings, not %s', text)
    return _.includes(source.toLowerCase(), text.toLowerCase())
  }
})
