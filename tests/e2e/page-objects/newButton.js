const _ = require('lodash')
const Base = require('./base')
const EC = protractor.ExpectedConditions

class NewButton extends Base {

  constructor () {
    super()
    this.newButton = element(by.id('new-button'))
    this.newComputer = this.newButton.$('a[ng-click*=computerSnapshot]')
    this.newMonitor = this.newButton.$('a[ng-click*=ComputerMonitor]')
    this.newPlaceholders = this.newButton.$('a[ng-click*=placeholders]')
    this.newLot = this.newButton.$('a[ng-click*=Lot]')
    this.newPallet = this.newButton.$('a[ng-click*=Pallet]')
    this.modal = $('.modal')
    this.submit = this.modal.$('[type=submit]')
    this.submitPopover = $('.popover [type=submit]')
    this.done = this.modal.$('.btn.btn-info[ng-click="done()"]')
    this.cancel = this.modal.$('.btn.btn-warning[ng-click="cancel()"]')
    this.label = this.modal.$('[name*=label]')
    // new Computer
    this.computer = {
      json: this.modal.$('input[id*=upload_files]'),
      resultText: this.modal.$('.text-success'),
      uploadMoreButton: this.modal.$('.btn.btn-success')
    }
    this.cm = {
      serialNumber: this.modal.$('[name="device.serialNumber"]'),
      model: this.modal.$('[name="device.model"]'),
      manufacturerTypeahead: this.modal.$('.uib-typeahead-match>a:first-child'),
      manufacturer: this.modal.$('[name="device.manufacturer"]'),
      lcd: this.modal.$('[value="LCD"]')
    }
    this.placeholders = {
      input: $('[id*=input_quantity]')
    }
  }

  waitUntilOpened () {
    return browser.wait(() => browser.getCurrentUrl().then(url => _.includes(url, 'inventory')), 3000)
  }

  /**
   * Presses 'done' and waits for the modal to exit.
   */
  exitModal (name = 'done') {
    this[name].click()
    return browser.wait(EC.not(EC.presenceOf(this[name])))
  }

  submitAndCheck (submit = 'submit') {
    this[submit].click()
    this.waitForNotifySuccess()
    return browser.wait(EC.not(EC.presenceOf(this[submit])))
  }

}

module.exports = NewButton
