const path = require('path')
const Base = require('./base')
const IMG_LOGO = path.join(__dirname, '/../../fixtures/logo.png')
const Inventory = require('./inventory')

class InventoryDevice extends Inventory {
  /**
   * GoToTab does not wait for
   * @param waitForFirstRow
   */
  goToTab (waitForFirstRow = true) {
    this.tab.click()
    this.waitPresenceFor(this.listOfResources)
  }

  describeCertificateErasure () {
    const self = this
    describe('Certificate Erasure', () => {
      beforeAll(function selectOnlyComputers () {
        self.search.searchbox.sendKeys('type of device').sendKeys(protractor.Key.ENTER)
        self.search.type.$('option[value="string:Computer"]').click()
        self.waitPresenceFor(self.listOfResources, 'Resources should re-load')
        self.toggleSelectAll()
      })
      beforeAll(function openModal () {
        self.certificateButton.self.click()
        self.certificateButton.erasure.click()
        self.waitPresenceFor(self.modal, 'Modal should open')
      })
      it('Should generate and download the erasure certificate', () => {
        self.certificateErasure.logo.sendKeys(IMG_LOGO)
        self.certificateErasure.org.sendKeys('ACME')
        self.certificateErasure.submit.click()
        closeWindow()
      })
      it('Should generate and download the erasure certificate in Spanish', () => {
        self.certificateErasure.lanEs.click()
        self.certificateErasure.logo.sendKeys(IMG_LOGO)
        self.certificateErasure.org.sendKeys('ACME')
        self.certificateErasure.submit.click()
        closeWindow()
      })

      /**
       * The browser opens a window with the PDF. This closes such window after a delay.
       */
      function closeWindow () {
        browser.sleep(1000)
        browser.getAllWindowHandles().then(function (handles) {
          browser.driver.switchTo().window(handles[1])
          browser.driver.close()
          browser.driver.switchTo().window(handles[0])
        })
      }

      afterAll(() => {
        self.closeModal.click()
        self.waitStalenessFor(self.modal, 'Modal should disappear.')
      })
    })
  }

  testEditField () {
    const self = this
    beforeAll(function goToInfo () {
      self.subResource.click()
      self.infoTab.click()
    })
    it('Should edit the field', () => {
      self.editField.edit.click()
      const text = Base.random()
      self.editField.input.sendKeys(text).sendKeys(protractor.Key.ENTER)
      self.waitPresenceFor(self.notification.success)
      self.waitStalenessFor(self.editField.input)
      self.waitPresenceFor(self.editField.field)
      // The field has been modified
      expect(self.editField.field.getText()).toContain(text)
      // Our field in in resource-list has been modified
      expect(self.subResource.getText()).toContain(text.substr(0, 5))
    })
    it('Should not let edit the field when is the same value', () => {
      self.editField.edit.click()
      const text = Base.random()
      self.editField.input.sendKeys(text)
      self.editField.submit.click() // This is equal as pressing ENTER in the field
      self.editField.edit.click()
      self.waitPresenceFor(self.notification.success)
      self.editField.input.sendKeys(text).sendKeys(protractor.Key.ENTER)
      self.waitPresenceFor(self.notification.warning)
    }, 15000)
    it('Should cancel editing when pressing cancel', () => {
      self.editField.edit.click()
      self.editField.cancel.click()
      self.waitStalenessFor(self.editField.input)
      self.waitPresenceFor(self.editField.field)
    })
    afterAll(function exitSubResource () {
      self.subResource.click()
    })
  }
}

module.exports = InventoryDevice
