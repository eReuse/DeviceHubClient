/**
 * Filter that transforms mm to inches. This filter returns a string with only two decimals.
 * @return {function(int|string): string}
 */
function resourceTitle () {
  const utils = require('./../utils')
  return input => utils.getResourceTitle(input)
}

module.exports = resourceTitle
