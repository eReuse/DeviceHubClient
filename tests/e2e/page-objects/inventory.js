const _ = require('lodash')
const path = require('path')
const jsonfile = require('jsonfile')
const Base = require('./base')
const EC = protractor.ExpectedConditions

class Inventory extends Base {
  constructor (resourceType) {
    super()
    this.resourceList = $('resource-list')
    this.table = $('#resource-list-table')
    this.firstRow = this.table.$('tbody tr:first-child')
    this._selectAll = this.table.$('thead .resource-list-checkbox')
    this.tab = element(by.cssContainingText('#subviews .view-tab-text', resourceType))
    this.buttons = this.resourceList.$('#buttons')
    this.resourceListFooter = $('resource-list-footer')
    this.downloadButton = this.resourceListFooter.$('[class*=download]')
    this.submitDownload = this.resourceListFooter.$('.popover [type=submit]')
    this.popover = $('.popover')
    // Modals
    this.modal = $('.modal')
    this.closeModal = this.modal.$('[ng-click*=cancel]')
    // Labeling
    this.print = this.modal.$('[ng-click*=print]')
    this.reset = this.modal.$('[ng-click*="labelEditApi.reset"]')
    this.labelButton = this.buttons.$('resource-label-button button')
    const labelEdit = this.modal.$('resource-label-edit')
    this.labelEdit = {
      self: labelEdit,
      showFieldNames: labelEdit.$('#show-field-names'),
      width: labelEdit.$('#width'),
      widthInches: labelEdit.$('[for=width]+*+.help-block+.help-block'),
      height: labelEdit.$('#height'),
      heightInches: labelEdit.$('[for=height]+*+.help-block+.help-block'),
      useLogo: labelEdit.$('#use-logo'),
      logoUpload: labelEdit.$('#logoUpload'),
      checkboxes: labelEdit.$$('#list-checkboxes #fields')
    }
    const labels = this.modal.$$('resource-label')
    const table = labels.$$('.label-body table')
    this.labels = { // label
      self: labels,
      logo: labels.$$('.label-logo img'),
      qr: labels.$$('qrcode'),
      table: table,
      fieldNames: table.$$('small'),
      fields: labels.$$('table td:last-child')
    }
    // Search
    const search = this.resourceList.$('resource-search')
    this.search = {
      self: search,
      groupInclusion: search.$('[data-e2e=groupInclusion]')
    }
    // Groups
    const groupResourceButton = this.buttons.$('group-resource-button')
    const groupRButtonList = groupResourceButton.$('ul')
    this.groupButton = {
      button: groupResourceButton.$('button'),
      list: groupRButtonList,
      addToLot: groupRButtonList.$('[data-e2e=Lot-add]'),
      removeFromLot: groupRButtonList.$('[data-e2e=Lot-remove]'),
      moveToPallet: groupRButtonList.$('[data-e2e=Pallet-move]')
    }
    const select = this.popover.$('group-resource-remove select')
    this.group = {
      input: this.popover.$('input'),
      select: select,
      selectFirstOption: select.$$('option').get(1), // get(0) is the undefined one
      submit: this.popover.$('[type=submit]')
    }
  }

  /**
   * Clicks the 'selectAll' button, selecting or deselecting all resources in the list.
   * @returns {promise.Promise<T>}
   */
  toggleSelectAll () {
    // Somehow it thinks the element is not displayed
    // Only working solution has been clicking through JS
    // See https://stackoverflow.com/a/37815727
    return browser.executeScript('arguments[0].click()', this._selectAll.getWebElement())
  }

  /**
   * Downloads stuff.
   */
  download () {
    const self = this
    this.toggleSelectAll()
    this.downloadButton.click()
    browser.wait(EC.presenceOf(this.submitDownload))
    self.submitDownload.click()
    browser.wait(EC.stalenessOf(this.submitDownload))
    this.toggleSelectAll()
  }

  goToTab () {
    this.tab.click()
    browser.wait(EC.presenceOf(this.firstRow))
  }

  label () {
    const self = this
    beforeAll(() => {
      self.toggleSelectAll()
      self.labelButton.click()
      browser.wait(EC.presenceOf(self.modal))
      browser.wait(EC.presenceOf(self.labelEdit.self))
      browser.wait(EC.presenceOf(self.labels.self))
    })
    it('Should reset the design of the label', () => {
      self.reset.click()
      self.waitPresenceFor(self.labels.self.first(), 'A label should appear')
      self.waitPresenceFor(self.labels.self.get(2), 'A label should appear')
      expect(self.labelEdit.self.$$('#list-checkboxes #fields.ng-not-empty').isSelected()).not.toContain(false)
      expect(self.labelEdit.useLogo.isSelected()).toEqual(true)
      expect(self.labelEdit.showFieldNames.isSelected()).toEqual(true)
      browser.wait(EC.textToBePresentInElementValue(self.labelEdit.width, '97'))
      browser.wait(EC.textToBePresentInElementValue(self.labelEdit.height, '59'))
    })
    it('Should edit the checkboxes', () => {
      // We remove the first and second checkboxes
      $$('#list-checkboxes #fields.ng-not-empty').click() // We click both checkboxes
      browser.wait(EC.stalenessOf(self.labels.fields)) // Removing all fields from the labels
      expect(self.labelEdit.checkboxes.isSelected()).not.toContain(true)

      // We re-click the checkboxes
      self.labelEdit.checkboxes.click()
      browser.wait(EC.presenceOf(self.labels.fields))
      expect(self.labelEdit.checkboxes.isSelected()).not.toContain(false)
      // We just keep one checkbox
      self.labelEdit.checkboxes.click()
      self.labelEdit.checkboxes.first().click()
    })
    it('Should change width and height', () => {
      // Let's set a new width and height
      // Note that we input mm and getCssValue() returns px, and there is no way
      // to compute mm -> px, so we just check that the pre and post values mismatch
      let oldWidth, oldHeight
      self.labels.self.first().getCssValue('width').then(width => {
        oldWidth = width
      })
      self.labelEdit.width.clear().sendKeys('60')
      self.labels.self.first().getCssValue('width').then(newWidth => {
        expect(oldWidth).not.toEqual(newWidth)
      })
      browser.wait(EC.textToBePresentInElement(self.labelEdit.widthInches, '2.36 in'))
      self.labels.self.first().getCssValue('height').then(height => {
        oldHeight = height
      })
      self.labelEdit.height.clear().sendKeys('49')
      self.labels.self.first().getCssValue('height').then(newHeight => {
        expect(oldHeight).not.toEqual(newHeight)
      })
      browser.wait(EC.textToBePresentInElement(self.labelEdit.heightInches, '1.93 in'))
    })
    it('Should change logo', () => {
      // Hide logo
      self.labelEdit.useLogo.click()
      browser.wait(EC.stalenessOf(self.labels.logo))
      // The size of the label adapts to the non-logo version
      browser.wait(EC.textToBePresentInElementValue(self.labelEdit.width, '97'))
      browser.wait(EC.textToBePresentInElementValue(self.labelEdit.height, '32'))
      // Show again logo
      self.labelEdit.useLogo.click()
      browser.wait(EC.presenceOf(self.labels.logo))
      // The size of the label adapts to the non-logo version
      browser.wait(EC.textToBePresentInElementValue(self.labelEdit.width, '97'))
      browser.wait(EC.textToBePresentInElementValue(self.labelEdit.height, '59'))

      // Add another logo
      let dataUrl
      jsonfile.readFile(path.join(__dirname, '/../../fixtures/logo.json'), (_, json) => {
        dataUrl = json['logo']
      })
      self.labelEdit.logoUpload.sendKeys(path.join(__dirname, '/../../fixtures/logo.png'))
      browser.wait(EC.presenceOf(self.labels.logo))
      self.labels.logo.getAttribute('ng-src').then(ngSrc => {
        _.forEach(ngSrc, src => { expect(src).toEqual(dataUrl) })
      })
    })
    it('Should change field names', () => {
      // Hide field names
      self.labelEdit.showFieldNames.click()
      self.labels.fieldNames.getAttribute('class').then(classes => {
        _.forEach(classes, cls => { expect(cls).toContain('ng-hide') })
      })
      // Show field names
      self.labelEdit.showFieldNames.click()
      self.labels.fieldNames.getAttribute('class').then(classes => {
        _.forEach(classes, cls => { expect(cls).not.toContain('ng-hide') })
      })
    })
    it('Should print the PDF', () => {
      // Print the PDF
      self.print.click()
      // While generating the PDF the button is not clickable, but checking it is complex as it happens quite fast
      browser.wait(EC.elementToBeClickable(self.print), null, 'Print should be clickable after printing.')
    })
    afterAll(() => {
      // Close it
      self.closeModal.click()
      self.waitStalenessFor(self.modal, 'Modal should close')
    })
  }

  prepareGroup () {
    const self = this
    beforeAll(function removeGroupInclusionSearchParameter () {
      self.search.groupInclusion.$('.remove').click()
      self.waitPresenceFor(self.table.$('tbody>tr'))
      self.toggleSelectAll()
    })
    beforeEach(function openGroupMenu () {
      self.groupButton.button.click()
      self.waitPresenceFor(self.groupButton.list, 'Should open the list')
    })
    afterEach(function waitForPopoverToDisappear () {
      self.waitStalenessFor(self.popover, 'Popover should disappear')
    })
    afterAll(function deselectAll () {
      self.toggleSelectAll()
    })
  }

  addToLot () {
    const self = this
    it('Should add to lot', () => {
      self.groupButton.addToLot.click()
      self.waitPresenceFor(self.popover, 'Should open the popover')
      expect(self.group.input.isDisplayed()).toBe(true)
      self.group.input.sendKeys('l').sendKeys(protractor.Key.ENTER)
      self.group.submit.click()
      self.waitForNotifySuccess()
    })
  }

  removeFromLot () {
    const self = this
    it('Should remove a lot', () => {
      self.groupButton.removeFromLot.click()
      self.waitPresenceFor(self.popover, 'Should open the popover')
      self.group.selectFirstOption.click()
      self.group.submit.click()
      self.waitForNotifySuccess()
    })
  }

  moveToPallet () {
    const self = this
    it('Should move to pallet', () => {
      self.groupButton.moveToPallet.click()
      self.waitPresenceFor(self.popover, 'Should open the popover')
      self.group.input.sendKeys('p').sendKeys(protractor.Key.ENTER)
      self.group.submit.click()
      self.waitForNotifySuccess()
    })
  }
}

module.exports = Inventory
