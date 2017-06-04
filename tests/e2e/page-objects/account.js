class Account {
  constructor () {
    this.userButton = $('#user-button')
    this.logoutButton = this.userButton.$('[ng-click="logout()"]')
    this.credentials = {
      email: 'a@a.a',
      password: '1234'
    }
  }
}

module.exports = Account
