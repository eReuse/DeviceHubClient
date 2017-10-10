const Base = require('./base')

class AccountPage extends Base {
  constructor () {
    super()
    const changeDatabaseButton = $('header-nav [data-e2e=change-database]')
    const items = changeDatabaseButton.$$('a')
    this.changeDatabase = {
      button: changeDatabaseButton,
      buttonText: changeDatabaseButton.$('.dropdown-toggle'),
      items: items,
      itemsDb1: this.filterByText(items, 'db1'),
      itemsDb2: this.filterByText(items, 'db2')
    }
    const sharedWithMeButton = $('header-nav [data-e2e=shared-with-me]')
    this.sharedWithMe = {
      button: sharedWithMeButton,
      firstElement: sharedWithMeButton.$$('li[role=menuitem]').first()
    }
  }
}

module.exports = AccountPage
