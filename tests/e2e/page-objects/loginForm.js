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
    // wait will wait until a) fulfilled (not error) promise or b) timeout (the second parameter '3000')
    return browser.wait(() => browser.getCurrentUrl().then(url => _.includes(url, 'inventory')), 3000)
  }

}

module.exports = LoginForm
