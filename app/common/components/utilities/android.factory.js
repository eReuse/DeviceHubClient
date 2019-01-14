/**
 * @module android
 */

function androidFactory ($rootScope) {
  /**
   * @memberOf module:android
   * @name An interface to the Android app.
   */
  class Android {
    constructor () {
      this._app = window.AndroidApp
      /**
       * @type {boolean}
       */
      this.exists = !!window.AndroidApp
      this._scanBarcodeCallback = null
      this._nfcCallback = null
      $rootScope.$on(this.constructor.BARCODE_EVENT, (_, x) => this._scanBarcodeCallback(x))
      $rootScope.$on(this.constructor.NFC_EVENT, (_, x) => this._nfcCallback(x))
    }

    /**
     * Open the camera of the smartphone and read a barcode,
     * executing the callback when done.
     * @param {Function} callback - Callback receiving the value of the
     * barcode.
     */
    scanBarcode (callback) {
      this._throwIfNoApp()
      this._scanBarcodeCallback = callback
      this._app.scanBarcode(this.constructor.BARCODE_EVENT)
    }

    /**
     * Calls the callback with the id of a new incoming NFC tag.
     * This keeps calling the callback for any new value until
     * stopNFC() is called.
     * @param {Function} callback
     */
    startNFC (callback) {
      this._throwIfNoApp()
      this._nfcCallback = callback
      this._app.startNFC(this.constructor.NFC_EVENT)
    }

    /**
     * Stop accepting incoming NFC tags.
     */
    stopNFC () {
      this._throwIfNoApp()
      this._app.stopNFC()
      this._nfcCallback = null
    }

    _throwIfNoApp () {
      if (!this.exists) throw new NoAndroidApp()
    }
  }

  Android.BARCODE_EVENT = 'android-barcode'
  Android.NFC_EVENT = 'android-nfc'

  /**
   * @memberOf module:android
   */
  class NoAndroidApp extends Error {
  }

  /**
   * @alias module:android.app
   * @type {module:android.Android}
   */
  const app = new Android()

  return {
    app: app,
    NoAndroidApp: NoAndroidApp
  }
}

module.exports = androidFactory
