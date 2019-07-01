function submitFormFactory (Notification) {
  const utils = require('./../../components/utils')

  /**
   * Helper class grouping utilities that are always used when
   * submitting a form, like validation and certain flags.
   *
   * The workflow is as follows:
   * 1. Instantiate SubmitForm
   * 2. Use isValid() to check for validation
   * 3. Use prepare() before sending info to server
   * 4. Use after() after sending info to server.
   */
  class SubmitForm {
    /**
     * @param {module:fields.Form} form - An object containing
     * Angular Formly parameters.
     * @param {Object} status - An object containing several flags:
     * @param {boolean} status.loading - A flag only set true while
     * executing.
     * @param {boolean} status.errorFromLocal - Flag set when
     * isValid() returns false.
     * @param {boolean} status.done - A flag only set true when
     * execution is done; succeeded or not.
     * @param {boolean} status.succeeded - Flag set true when
     * the execution is done successfully
     * (HTTP 2XX).
     * @param {?object} status.errorFromServer - If there was
     * an error from the server,the response data. Otherwise null.
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
     * This method internally sets a flag in form, needed to show
     * errors in the form. See the file *formly.config.js* to see
     * why the need of this flag.
     * @returns {boolean}
     */
    isValid () {
      const isValid = this.form.form.$valid
      this.status.errorListFromServer = null // could be dirty from prior execution
      this.status.succeeded = this.status.done = false // could be dirty from prior execution
      this.form.form.triedSubmission = this.status.errorFromLocal = !isValid
      if (!isValid) this.constructor._scrollToFormlyError(this.form.form)
      return isValid
    }

    /**
     * Prepares a server submission.
     *
     * Internally raises some flags to show to the user a
     * 'working...' state.
     */
    prepare () {
      this.status.loading = true
      utils.Progress.start()
    }

    /**
     * Performs final tasks after server execution, like reverting
     * flags and notifying the UI.
     *
     * @param {Promise} promise - The backend's service promise.
     * @param {?string} notifyText - If set, notifies the user with
     * the following **success** text.
     * @param {?string} errorText - If set, notifies the user with
     * an error message if error.
     */
    after (promise, notifyText, errorText) {
      return promise.then(() => {
        if (notifyText) Notification.success(notifyText)
        this.status.succeeded = true
      }).catch(response => {
        if (errorText) Notification.error(errorText)
        this.form.form.triedSubmission = true
        this.status.errorListFromServer = response.data
      }).finally(() => {
        this.final()
      })
    }

    /**
     * States that execution is done. Executed inside 'after'.
     * *ComputerSnapshotFormSchema* does not execute *after* but
     * *final* after all JSONs have been uploaded.
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
