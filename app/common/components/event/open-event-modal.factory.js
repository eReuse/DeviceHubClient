/**
 * OpenEventModal module
 * @module open-event-modal
 */

/**
 * Util method for manual-events-button and reserve-button that opens
 * the event in a modal.
 *
 * @param {module:dh-modal-provider} dhModal
 * @param {module:resources} resources
 */
function openEventModalFactory (dhModal, resources) {
  /**
   * Opens the modal.
   *
   * @param {module:resources.Event} event
   * @alias module:open-event-modal.open
   */
  function open (event) {
    if (!(event instanceof resources.Event)) event = new event()
    console.assert(event instanceof resources.Event, 'Model must be an instance of Event')
    const opt = {
      model: () => event
    }
    dhModal.open('form', opt) // open form-modal
  }

  return {
    open: open
  }
}

/**
 *
 * @return {module:open-event-modal.open}
 */
module.exports = openEventModalFactory

