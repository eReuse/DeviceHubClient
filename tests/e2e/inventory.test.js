const LoginForm = require('./page-objects/loginForm')
const Account = require('./page-objects/account')

/**
 * Tests the inventory.
 *
 * This is an entry-point for *describe* testing parts of the inventory, providing login and logout service (so
 * another test encounters the app in the login screen).
 */
describe('Inventory', () => {
  const loginForm = new LoginForm()
  const account = new Account()
  const EC = protractor.ExpectedConditions

  beforeAll(function login () {
    loginForm.get()
    loginForm.email.sendKeys(account.credentials.email)
    loginForm.password.sendKeys(account.credentials.password)
    return loginForm.submit.click().then(() => loginForm.waiUntilInventoryLoaded())
  })

  describe('Create resources', require('./inventory/create-resources.test'))
  describe('Devices', require('./inventory/devices.test'))
  describe('Groups', require('./inventory/groups.test'))

  afterAll(function logout () {
    account.userButton.click()
    browser.wait(EC.presenceOf(account.logoutButton))
    account.logoutButton.click()
    browser.wait(EC.presenceOf(loginForm.email))
  })
})
