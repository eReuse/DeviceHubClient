/**
 * Common initialisations for the App and tests. Just require this file.
 */

window.COMMON = 'common'
window.COMPONENTS = 'common/components'
window.VIEWS = 'views'

window.$ = window.jQuery = require('jquery') // We globally load jQuery
window._ = require('lodash')
window.Sortable = require('bower_components/Sortable/Sortable.js')

require('angular')
require('angular-ui-router')
require('bootstrap')

window._.mixin({
  /**
   * As in Python's dict's pop: gets element on path and deletes it in the object.
   */
  pop: (object, path, def) => {
    const value = _.get(object, path, def)
    _.unset(object, path)
    return value
  },
  arrayExtend: (array, otherArray) => { window.$.merge(array, otherArray) }
})
