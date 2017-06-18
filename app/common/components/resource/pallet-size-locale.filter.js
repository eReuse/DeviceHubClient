/**
 * Transforms the mm value into inches, in case the user has set its browser as en-US.
 * @param $locale
 * @param {function} toInchesFilter
 * @return {function(string|int): string}
 */
function palletSizeLocale ($locale, toInchesFilter) {
  const map = $locale.id === 'en-us' ? x => toInchesFilter(x) : _.identity
  const unit = $locale.id === 'en-us' ? 'in' : 'mm'
  return input => _.isUndefined(input) ? input : _(input).split('-').map(map).join(' × ') + ' ' + unit
}
module.exports = palletSizeLocale
