const Inventory = require('../page-objects/inventory')

/**
 * Tests the 'Devices' resource-list and actions users can do in there.
 */
function describeDevices () {
  const inventory = new Inventory('Device')
  beforeAll(() => inventory.goToTab())

  it('should download an spreadsheet', () => inventory.download())

  describe('Should generate labels', () => { inventory.label() })
}

module.exports = describeDevices
