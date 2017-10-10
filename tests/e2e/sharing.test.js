const LoginForm = require('./page-objects/loginForm')
const Account = require('./page-objects/account')
const AccountPage = require('./page-objects/account-page')

/**
 * Tests the inventory.
 *
 * This is an entry-point for *describe* testing parts of the inventory, providing login and logout service (so
 * another test encounters the app in the login screen).
 */
describe('Sharing', () => {
  const loginForm = new LoginForm()
  const account = new Account('b@b.b', '1234')
  const aPage = new AccountPage()

  beforeAll(() => loginForm.login(account))

  it('access shared resources', () => {
    aPage.waitForUrl('inventories/db2')
    expect(aPage.changeDatabase.buttonText.getText()).toContain('db2')
    aPage.sharedWithMe.button.click()
    aPage.sharedWithMe.firstElement.click()
    aPage.waitForUrl('inventories/db1/lots.')
    expect(aPage.changeDatabase.buttonText.getText()).toContain('db1')

    // The user should be always able to change to db1 or db2
    expect(aPage.changeDatabase.itemsDb1).toBeDefined()
    expect(aPage.changeDatabase.itemsDb2).toBeDefined()
  })

  afterAll(() => loginForm.logout())
})
