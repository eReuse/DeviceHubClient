/**
 * Returns a human friendly version of the string.
 * @return {function(string): string}
 */
function resourceTitle () {
  const utils = require('./../utils')
  return input => utils.getResourceTitle(input)
}

module.exports = resourceTitle
