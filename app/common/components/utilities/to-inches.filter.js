/**
 * Filter that transforms mm to inches. This filter returns a string with only two decimals.
 * @return {function(int|string): string}
 */
function toInches () {
  return input => (parseInt(input) / 25.4).toFixed(2)
}

module.exports = toInches
