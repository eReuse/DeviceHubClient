const _ = require('lodash')
const NewButton = require('../page-objects/newButton')
const path = require('path')
const Base = require('./../page-objects/base')
const EC = protractor.ExpectedConditions

/**
 * Tests the creation of a resource of, at least, each type.
 */
function DescribeCreateResources () {
  const newButton = new NewButton()

  it('should snapshot a computer', () => {
    newButton.newButton.click()
    // Opening the modal
    newButton.newComputer.click()
    // Checking that the modal has been opened (an inner input is visible)
    browser.wait(EC.presenceOf(newButton.computer.json))
    // Submit snapshot json file
    const absolutePath = path.resolve(__dirname, '../fixtures/snapshot.json')
    newButton.computer.json.sendKeys(absolutePath)
    newButton.submit.click()
    // Check success
    browser.wait(EC.presenceOf(newButton.computer.resultText))
    expect(newButton.computer.resultText.getText()).toContain('1 computers have been successfully uploaded.')
    // Press 'upload more' button
    newButton.computer.uploadMoreButton.click()
    // Check form is re-added again
    browser.wait(EC.presenceOf(newButton.computer.resultText))
    newButton.exitModal()
  })
  it('should snapshot a monitor', () => {
    const cm = newButton.cm
    newButton.newButton.click()
    newButton.newMonitor.click()
    browser.wait(EC.presenceOf(newButton.label))
    // Create random SN so DB does not need to be depleted
    // Inspired from https://stackoverflow.com/a/8084248
    cm.serialNumber.sendKeys(Base.random())
    cm.model.sendKeys('foobar')
    cm.manufacturer.sendKeys('Apple')
    browser.wait(EC.presenceOf(cm.manufacturerTypeahead))
    cm.manufacturerTypeahead.click()
    cm.lcd.click()
    newButton.submitAndCheck()
  })
  it('should create two placeholders', () => {
    newButton.newButton.click()
    newButton.newPlaceholders.click()
    browser.wait(EC.presenceOf(newButton.placeholders.input))
    newButton.placeholders.input.clear().sendKeys('2')
    newButton.submitAndCheck('submitPopover')
  })
  it('should create a lot', () => {
    newButton.newButton.click()
    newButton.newLot.click()
    browser.wait(EC.presenceOf(newButton.label)).then(() => {
      newButton.label.sendKeys('This is the label of the lot')
      newButton.submitAndCheck()
    })
  })
  it('should create a pallet', () => {
    newButton.newButton.click()
    newButton.newPallet.click()
    browser.wait(EC.presenceOf(newButton.label))
    newButton.label.sendKeys(Base.random())
    newButton.submitAndCheck()
  })
}

module.exports = DescribeCreateResources
