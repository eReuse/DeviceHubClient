const InventoryDevice = require('../page-objects/inventory-device')

/**
 * Tests the 'Devices' resource-list and actions users can do in there.
 */
function describeDevices () {
  const inventory = new InventoryDevice('Device')
  beforeAll(() => { inventory.goToTab() })

  describe('Download a spreadsheet', () => {
    it('should download an spreadsheet', () => inventory.download())
  })

  describe('Should generate labels', () => { inventory.label() })

  describe('Should integrate with groups', () => {
    inventory.prepareGroup()
    inventory.addToLot()
    inventory.removeFromLot()
    inventory.moveToPallet()
  })

  inventory.describeCertificateErasure()
}

module.exports = describeDevices
