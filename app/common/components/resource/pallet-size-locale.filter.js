/**
 * Transforms the mm value into inches, in case the user has set its browser as en-US.
 * @param $locale
 * @returns {function(string): string}
 */
function palletSizeLocale ($locale) {
  const map = $locale.id === 'en-us' ? x => (parseInt(x) / 25.4).toFixed(2) : _.identity
  const unit = $locale.id === 'en-us' ? 'in' : 'mm'
  return input => _.isUndefined(input) ? input : _(input).split('-').map(map).join(' × ') + ' ' + unit
}
module.exports = palletSizeLocale
