// const Naming = require('./../utils').Naming

/**
 * Util method for manual-events-button and reserve-button that opens the event in a modal.
 *
 * @param {Object} dhModal
 * @returns {function(string, Array)}
 */
function openModalFactory (dhModal) {
  /**
   * Opens the modal.
   * @param {string} type - The @type of the event to perform.
   * @param {Object[]|null} resources - devices or groups to perform the event on.
   * @param {Object} model - Optional. Pre-built model where type and resources are appended. This param is
   * mutated.
   * @param {Object} options - Opotional. Options to pass to FormSchema.
   */
  return (type, resources = null, model = {}, options = {}) => {
    // TODO enable modals for groups
    // const isGroup = resources && ResourceSettings(resources[0]['@type']).isSubResource('Group')
    // // We make it: groups.lots = [objLot1, objLot2...]
    // if (isGroup) {
    //   resources = _(resources).groupBy('@type').mapKeys((_, type) => Naming.resource(type)).value()
    //   resources['lots'] = resources['lots'] || []
    //   _.arrayExtend(resources['lots'], _.pop(resources, 'incoming-lot', []))
    //   _.arrayExtend(resources['lots'], _.pop(resources, 'outgoing-lot', []))
    // }
    // if (resources) model[isGroup ? 'groups' : 'devices'] = resources

    if (type === 'devices:Snapshot') {
      model['device'] = resources[0]
    } else {
      model['devices'] = resources
    }

    model['@type'] = type
    const opt = {
      model: () => model,
      // TODO enable modals for groups
      // parserOptions: () => ({doNotUse: resources ? (isGroup ? ['devices'] : ['groups']) : ['devices', 'groups']}),
      parserOptions: () => ({doNotUse: resources ? (['groups']) : ['devices', 'groups']}),
      options: () => options
    }
    dhModal.open('form', opt)
  }
}

module.exports = openModalFactory

