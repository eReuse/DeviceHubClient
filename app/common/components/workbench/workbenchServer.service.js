/**
 * Retreives the correct workbench URL, depending if this website is being seen inside the Android App.
 * @param _host - Internal param. It represents the base url where Workbench Server is. It can be with the
 * protocol and ports, in case it is taken from constants, or only the domain or IP, if using the AndroidApp.
 */
class workbenchServer {
  constructor (CONSTANTS) {
    this.host = 'AndroidApp' in window ? '192.168.2.2' : CONSTANTS.workbench
    this.port = '8091'
  }

  /**
   * Gets the workbench URL.
   * @returns {string}
   */
  get authority () {
    return `http://${this.host}:${this.port}`
  }
}

module.exports = workbenchServer
