const utils = require('./../components/utils')
// Filenames for Constants are always UPPERCASE
// You can have as many files for constants as you require (ex: USER_ROLES, NOTIFICATIONS, etc)
// Constants are injected into controllers like any service or resource
module.exports = angular.module('common.constants', [])
  .constant('UNIT_CODES', require('./UNIT_CODES'))

require('dist/config.js') // DevicehubClient config from yaml

module.exports.factory('URL', CONSTANTS => new utils.URI(CONSTANTS.url))

/**
 * @typedef {object} DH_CONSTANTS
 * @property {string} appName
 * @property {boolean} html5mode
 * @property {string} siteLogo
 * @property {string} eReuseLogo
 * @property {string} defaultLabelLogo
 * @property {string} loginBackgroundImage
 * @property {string} androidWorkbench
 * @property {string} workbench
 * @property {string} url
 * @property {string} currency
 * @property {number} workbenchPollingDelay
 * @property {number} inventories
 */
