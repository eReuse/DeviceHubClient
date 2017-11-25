/**
 * Retreives the correct workbench URL, depending if this website is being seen inside the Android App.
 * @param _host - Internal param. It represents the base url where Workbench Server is. It can be with the
 * protocol and ports, in case it is taken from constants, or only the domain or IP, if using the AndroidApp.
 */
class workbenchServer {

  constructor (CONSTANTS) {
    this._host = 'AndroidApp' in window ? window.AndroidApp.workbenchServerAddress() : CONSTANTS.workbench
    this.port = CONSTANTS.workbench.split(':')[2]
  }

  /**
   * Gets the workbench URL.
   * @returns {string}
   */
  get host () {
    return 'AndroidApp' in window ? `https://${this._host}:${this.port}` : this._host
  }

  set host (host) {
    this._host = host
  }

}

module.exports = workbenchServer
