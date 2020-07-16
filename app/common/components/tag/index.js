// This init lines for angular-qrcode are taken from its website
window.qrcode = require('qrcode-generator')
const ngQrcode = require('angular-qrcode')

require('node_modules/qrcode-generator/qrcode_UTF8')

module.exports = angular.module('common.components.tag', [
  require('angular-ui-bootstrap'),
  ngQrcode
])
  .directive('tag', require('./tag/tag.directive'))
  .directive('printTagsButton', require('./print-tags-button/print-tags-button.directive'))
  .directive('printTags', require('./print-tags/print-tags.directive'))
  .directive('tagsButton', require('./tags-button/tags-button.directive'))
