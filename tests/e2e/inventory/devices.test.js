const Inventory = require('../page-objects/inventory')

/**
 * Tests the 'Devices' resource-list and actions users can do in there.
 */
function describeDevices () {
  const inventory = new Inventory('Device')
  beforeAll(() => inventory.goToTab())

  it('should download an spreadsheet', () => inventory.download())
}

module.exports = describeDevices
