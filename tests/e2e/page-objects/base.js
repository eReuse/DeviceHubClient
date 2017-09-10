const EC = protractor.ExpectedConditions
const _ = require('lodash')

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

  /**
   * Watis for browser URL to partially contain passed-in url.
   */
  waitForUrl (partialUrl, message, time = 2500) {
    const isUrl = () => browser.getCurrentUrl().then(u => _.includes(u, partialUrl))
    return browser.wait(isUrl, time, message || 'The browser does not contain ' + partialUrl)
  }

  filterByText (elements, text) {
    return elements.filter(elem => elem.getText().then(t => _.includes(t, text))).first()
  }
}

module.exports = Base
