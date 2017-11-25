/**
 * Retreives the correct workbench URL, depending if this website is being seen inside the Android App.
 */
class workbenchServer {
  constructor (CONSTANTS) {
    this._host = CONSTANTS.workbench
  }

  /**
   * Gets the workbench URL.
   * @returns {string}
   */
  get host () {
    return 'AndroidApp' in window ? window.AndroidApp.workbenchServerAddress() : this._host
  }
}

module.exports = workbenchServer
