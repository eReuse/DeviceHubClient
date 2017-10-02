/**
 * Returns a human friendly version of the string.
 * @return {function(string): string}
 */
function resourceTitle () {
  const utils = require('./../utils')
  return input => utils.Naming.humanize(input)
}

module.exports = resourceTitle
