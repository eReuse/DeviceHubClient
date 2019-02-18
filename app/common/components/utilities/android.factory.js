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
      // This is only called if the user did read something –not nulls
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

    /**
     * Utility method to extract the ID of a full url tag.
     *
     * @param {string} fullTag - The value from the QR / NFC. It
     * should be the full URL of a tag.
     *
     * @return {string} The ID of the tag or the full passed-in
     * value in case of unknown format.
     */
    static parseTag (fullTag) {
      let id
      try {
        const url = new URL(fullTag)
        id = _.last(url.pathname.split('/')) // Get last part of the path
      } catch (e) {
        id = fullTag
      }
      return id
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

  /**
   * Integrates the Android tag scanning with the Workbench
   * Link form.
   * @alias module:android.Tag
   */
  class Tag {
    constructor ($scope, nfcModelPath) {
      this.$scope = $scope
      try {
        app.startNFC(this.setTagFactory(nfcModelPath))
        $scope.$on('$destroy', () => {
          app.stopNFC()
        })
      } catch (e) {
        if (!(e instanceof NoAndroidApp)) throw e
      }
    }

    addonRightScan (modelPath) {
      return app.exists ? {
        onClick: () => {
          // Code tagNum as the last char of the event name
          app.scanBarcode(this.setTagFactory(modelPath))
        },
        class: 'fa fa-camera'
      } : null
    }

    /**
     * @param {number} modelPath
     */
    setTagFactory (modelPath) {
      return tag => {
        const id = app.constructor.parseTag(tag)
        _.set(this.$scope.form.model, modelPath, id)
      }
    }
  }

  return {
    app: app,
    NoAndroidApp: NoAndroidApp,
    Tag: Tag
  }
}

module.exports = androidFactory
