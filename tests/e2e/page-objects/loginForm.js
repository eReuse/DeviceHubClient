const Base = require('./base')

class LoginForm extends Base {

  constructor () {
    super()
    this.form = $('form#loginForm')
    this.email = this.form.$('input[type=email]')
    this.password = this.form.$('input[type=password]')
    this.submit = this.form.$('[type=submit]')

    this.userButton = $('#user-button')
    this.logoutButton = this.userButton.$('[ng-click="logout()"]')
  }

  login (account) {
    browser.get('index.html')
    this.email.sendKeys(account.credentials.email)
    this.password.sendKeys(account.credentials.password)
    return this.submit.click().then(() => {
      return this.waitForUrl('inventories', 'Inventory is not loaded.', 3000)
    })
  }

  logout () {
    this.userButton.click()
    this.waitPresenceFor(this.logoutButton, 'The logout button should appear')
    this.logoutButton.click()
    this.waitPresenceFor(this.email, 'The login email should appear')
  }
}

module.exports = LoginForm
