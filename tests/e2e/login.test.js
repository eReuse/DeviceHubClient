const LoginForm = require('./page-objects/loginForm')
const Account = require('./page-objects/account')
const EC = protractor.ExpectedConditions

/**
 * Tries performing login and logout.
 *
 * This is used too as an example for explaining stuff related E2E testing and protractor.
 */
describe('Login and get main view', () => {
  const loginForm = new LoginForm()
  const account = new Account()
  loginForm.get()
  it('should perform login', () => {
    expect(browser.getTitle()).toEqual('DeviceHub')
    expect(loginForm.email.sendKeys(account.credentials.email).getAttribute('value')).toEqual(account.credentials.email)
    // Just to showcase
    // to use a breakpoint in the debugger you can do:
    loginForm.email.getAttribute('value').then(text => {
      // By using then you can set a breakpoint
      expect(text).toEqual(account.credentials.email)
    })
    loginForm.password.sendKeys(account.credentials.password)
    return loginForm.submit.click().then(() => loginForm.waiUntilInventoryLoaded())
  })
  it('should perform logout', () => {
    account.userButton.click()
    browser.wait(EC.presenceOf(account.logoutButton), null, 'The logout button should appear')
    account.logoutButton.click()
    browser.wait(EC.presenceOf(loginForm.email), null, 'The login form should appear')
  })
})
