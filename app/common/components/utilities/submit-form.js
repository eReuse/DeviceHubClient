function submitFormFactory (Notification) {
  const utils = require('./../../components/utils')
  /**
   * Helper class grouping utilities that are always used when submitting a form, like validation
   * and certain flags.
   *
   * This is used in *login* and *groupResourceAdd* and *groupResourceRemove* directives. The workflow is as follows:
   * 1. Instantiate SubmitForm
   * 2. Use isValid() to check for validation
   * 3. Use prepare() before sending info to server
   * 4. Use after() after sending info to server. Note that the method wants a promise from the backend service.
   */
  class SubmitForm {
    /**
     * @param {Object} form - An object containing Angular Formly parameters. See *login* controller for an example.
     * @param {Object} loadingContainer - An object containing 'loading'
     * @param {bool} loadingContainer.loading - A flag that SubmitForm changes depending if the server is loading
     */
    constructor (form, loadingContainer) {
      this.form = form
      this.lc = loadingContainer
    }

    /**
     * Checks form validation.
     *
     * This method internally sets a flag in form, needed to show errors in the form. See the file
     * *formly.config.js* to see why the need of this flag.
     * @returns {boolean}
     */
    isValid () {
      this.form.form.triedSubmission = !this.form.$valid
      return this.form.form.$valid
    }

    /**
     * Prepares a server submission.
     *
     * Internally raises some flags to show to the user a 'working...' state.
     */
    prepare () {
      this.lc.loading = true
      utils.Progress.start()
    }

    /**
     * Performs final tasks after server execution, like reverting flags and notifying the UI.
     *
     * @param {$q} promise - The backend's service promise.
     * @param {string} [notifyText] - If set, notifies the user with the following **success** text.
     */
    after (promise, notifyText) {
      promise.then(() => {
        if (notifyText) Notification.success(notifyText)
      }).catch(() => {
        this.form.form.triedSubmission = true
      }).finally(() => {
        this.lc.loading = false
        utils.Progress.stop()
      })
    }
  }
  return SubmitForm
}

module.exports = submitFormFactory
