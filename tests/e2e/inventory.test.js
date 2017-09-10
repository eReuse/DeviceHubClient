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

  beforeAll(() => loginForm.login(account))

  describe('Create resources', require('./inventory/create-resources.test'))
  describe('Devices', require('./inventory/devices.test'))
  describe('Groups', require('./inventory/groups.test'))

  afterAll(() => loginForm.logout())
})
