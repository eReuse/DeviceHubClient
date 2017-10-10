class Account {
  constructor (email = 'a@a.a', password = '1234') {
    this.credentials = {
      email: email,
      password: password
    }
  }
}

module.exports = Account
