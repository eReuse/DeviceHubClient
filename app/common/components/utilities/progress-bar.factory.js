/**
 * Returns a global progressBar singleton.
 *
 * Usage according to https://github.com/VictorBjelkholm/ngProgress/issues/96#issuecomment-182135346
 * @param ngProgressFactory
 * @returns {progressBar}
 */
function progressBarFactory (ngProgressFactory) {
  const progressBar = ngProgressFactory.createInstance()
  progressBar.setHeight('2px')
  return progressBar
}
module.exports = progressBarFactory
