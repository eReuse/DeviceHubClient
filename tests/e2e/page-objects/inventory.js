const EC = protractor.ExpectedConditions

class Inventory {

  constructor (resourceType) {
    this.resourceList = $('resource-list')
    this.table = $('#resource-list-table')
    this.firstRow = this.table.$('tbody tr:first-child')
    this._selectAll = this.table.$('thead .resource-list-checkbox')
    this.tab = element(by.cssContainingText('#subviews .view-tab-text', resourceType))
    this.resourceListFooter = $('resource-list-footer')
    this.downloadButton = this.resourceListFooter.$('[class*=download]')
    this.submitDownload = this.resourceListFooter.$('.popover [type=submit]')
  }

  selectAll () {
    // Somehow it thinks the element is not displayed
    // Only working solution has been clicking through JS
    // See https://stackoverflow.com/a/37815727
    return browser.executeScript('arguments[0].click()', this._selectAll.getWebElement())
  }

  download () {
    const self = this
    this.selectAll()
    this.downloadButton.click()
    browser.wait(EC.presenceOf(this.submitDownload))
    self.submitDownload.click()
    browser.wait(EC.not(EC.presenceOf(this.submitDownload)))
  }

  goToTab () {
    this.tab.click()
    browser.wait(EC.presenceOf(this.firstRow))
  }

}

module.exports = Inventory
