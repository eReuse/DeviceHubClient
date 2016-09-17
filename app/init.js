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
