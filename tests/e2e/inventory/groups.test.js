const Inventory = require('../page-objects/inventory')

/**
 * Tests the 'Groups' resource-list and actions users can do in there.
 */
function describeGroups () {
  const inventory = new Inventory('Pallet')
  beforeAll(() => inventory.goToTab())

  it('should download an spreadsheet', () => inventory.download())

  describe('Should generate labels', () => { inventory.label() })
}

module.exports = describeGroups
