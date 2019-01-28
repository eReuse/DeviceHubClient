/**
 * @module box
 */

function boxFactory () {
  /**
   * @memberOf module:box
   *
   */
  class Box {
    constructor () {
      this._app = window.WorkbenchServer
      this.exists = !!this._app
    }

    print (file, width, height, callback) {
      this._app.print(file, width, height, callback)
    }
  }

  /**
   * @alias {module:box.box}
   * @type {module:box.Box}
   */
  const box = new Box()
  return {
    box: box
  }
}

module.exports = boxFactory
