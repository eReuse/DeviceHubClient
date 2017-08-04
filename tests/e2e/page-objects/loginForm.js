const _ = require('lodash')

class LoginForm {

  constructor () {
    this.email = element(by.id('formly_1_input_email_0'))
    this.password = element(by.id('formly_1_input_password_1'))
    this.submit = element(by.css('#loginForm [type=submit]'))
  }

  get () {
    browser.get('index.html')
  }

  waiUntilInventoryLoaded () {
    function urlIsInventory () {
      return browser.getCurrentUrl().then(url => _.includes(url, 'inventory'))
    }

    return browser.wait(urlIsInventory, 3000, 'Inventory is not loaded.')
  }

}

module.exports = LoginForm
