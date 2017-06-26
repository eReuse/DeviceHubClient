const EC = protractor.ExpectedConditions

class Base {
  constructor () {
    this.notification = {
      self: $('.ui-notification'),
      success: $('.ui-notification.success'),
      error: $('.ui-notification.error'),
      warning: $('.ui-notification.warning')
    }
  }

  static random () {
    return Math.random().toString(36).substring(2)
  }

  waitForNotifySuccess () {
    // We add some more time as this is usually for requests
    return this.waitPresenceFor(this.notification.success, 'Should notify success', 5000)
  }

  /**
   * Shortcut for browser.wait(EC.presenceOf(element), time, message))
   * @returns {promise.Promise<T>|*|Promise<T>}
   */
  waitPresenceFor (protractorElement, message, time = 2500) {
    return browser.wait(EC.presenceOf(protractorElement), time, message)
  }

  waitStalenessFor (protractorElement, message, time = 2500) {
    return browser.wait(EC.stalenessOf(protractorElement), time, message)
  }
}

module.exports = Base
