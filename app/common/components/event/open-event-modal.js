const Naming = require('./../utils').Naming

/**
 * Util method for manual-events-button and reserve-button that opens the event in a modal.
 *
 * @param {Object} dhModal
 * @param {ResourceSettings} ResourceSettings
 * @returns {function(string, Array)}
 */
function openModalFactory (ResourceSettings, dhModal) {
  return (type, resources) => {
    const isGroup = ResourceSettings(resources[0]['@type']).isSubResource('Group')
    // We make it: groups.lots = [objLot1, objLot2...]
    if (isGroup) {
      resources = _(resources).groupBy('@type').mapKeys((_, type) => Naming.resource(type)).value()
      resources['lots'] = resources['lots'] || []
      _.arrayExtend(resources['lots'], _.pop(resources, 'incoming-lot', []))
      _.arrayExtend(resources['lots'], _.pop(resources, 'outgoing-lot', []))
    }
    const opt = {
      model: () => ({'@type': type, [isGroup ? 'groups' : 'devices']: resources}),
      parserOptions: () => ({doNotUse: isGroup ? ['devices'] : ['groups']}),
      options: () => ({})
    }
    dhModal.open('form', opt)
  }
}

module.exports = openModalFactory

