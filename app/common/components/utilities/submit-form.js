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
     * @param {Object} status - An object containing several flags
     * @param {boolean} status.loading - A flag only set true while executing.
     * @param {boolean} status.errorFromLocal - Flag set when isValid() returns false.
     * @param {boolean} status.done - A flag only set true when execution is done; succeeded or not.
     * @param {boolean} status.succeeded - Flag set true when the execution is done successfully (HTTP 2XX).
     * @param {object[]|null} status.errorListFromServer - If there was an error from the server, the cerberu's
     * issues. Otherwise null
     */
    constructor (form, status) {
      this.form = form
      this.status = status
      this.status.loading = this.status.done = this.status.succeeded = false
      this.status.errorListFromServer = null
    }

    /**
     * Checks form validation.
     *
     * This method internally sets a flag in form, needed to show errors in the form. See the file
     * *formly.config.js* to see why the need of this flag.
     * @returns {boolean}
     */
    isValid () {
      let isValid = this.form.form.$valid
      this.status.errorListFromServer = null // could be dirty from prior execution
      this.status.succeeded = this.status.done = false // could be dirty from prior execution
      this.form.form.triedSubmission = this.status.errorFromLocal = !isValid
      if (!isValid) require('./../forms/form-utils').scrollToFormlyError(this.form.form)
      return isValid
    }

    /**
     * Prepares a server submission.
     *
     * Internally raises some flags to show to the user a 'working...' state.
     */
    prepare () {
      this.status.loading = true
      utils.Progress.start()
    }

    /**
     * Performs final tasks after server execution, like reverting flags and notifying the UI.
     *
     * @param {$q} promise - The backend's service promise.
     * @param {string} [notifyText] - If set, notifies the user with the following **success** text.
     * @param {string} [errorText] - If set, notifies the user with an error message in case of error.
     */
    after (promise, notifyText, errorText) {
      let self = this
      promise.then(() => {
        if (notifyText) Notification.success(notifyText)
        self.status.succeeded = true
      }).catch((response) => {
        if (errorText) Notification.error(errorText)
        self.form.form.triedSubmission = true
        self.status.errorListFromServer = response.data._issues
      }).finally(() => {
        self.final()
      })
    }

    /**
     * States that execution is done. Executed inside 'after'.
     * *ComputerSnapshotFormSchema* does not execute *after* but *final* after all JSONs have been
     * uploaded.
     */
    final () {
      this.status.loading = false
      this.status.done = true
      utils.Progress.stop()
    }
  }
  return SubmitForm
}

module.exports = submitFormFactory
