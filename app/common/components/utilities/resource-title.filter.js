/**
 * Filter that transforms mm to inches. This filter returns a string with only two decimals.
 * @return {function(int|string): string}
 */
function humanize () {
  const utils = require('./../utils')
  return input => utils.Naming.humanize(input)
}

module.exports = humanize
