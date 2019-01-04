const CannotSubmit = require('./cannot-submit.exception')

/**
 *
 * @param {SubmitForm} SubmitForm
 * @param $rootScope
 * @returns {ResourceForm}
 * @constructor
 */
function resourceFormFactory (SubmitForm, $rootScope, resources) {
  class ResourceForm {
    /**
     * @param {object} form - A form object containing a reference
     * to formly's form and model.
     * @param {object} form.form - A formly form. It is ok if this is
     * not set yet when creating ResourceForm, but it will need to be
     * set when submitting. This is usual workflow when leading
     * with formly forms, as until the formly form is instantiated
     * this value won't be populated.
     * @param {Thing} form.model — The model of the form.
     * @param {object} status - Flags of the submission.
     * @param {boolean} status.errorFromLocal - An error has been
     * detected through validation in the browser prior
     * submitting to server.
     * @param {boolean} status.loading - A flag indicating that the
     * server is processing a request of the server.
     * @param {boolean} status.errorListFromServer - An error has
     * been detected from the server.
     * @param {boolean} status.done - If the execution has done.
     * Prior first execution is false too.
     * @param {boolean} status.succeeded - Flag set true when the
     * execution is done successfully (HTTP 2XX).
     */
    constructor (form, status) {
      this.model = form.model
      console.assert(this.model instanceof resources.Thing)
      this.fields = eForms[this.model.type]
      this.submitForm = new SubmitForm(form, status)
      console.assert(this.fields)
      console.assert(this.submitForm)
    }


  }

  ResourceForm.POST = 'POST'
  ResourceForm.PUT = 'PUT'
  ResourceForm.DELETE = 'DELETE'
  ResourceForm.NOTIFICATIONS = {
    [ResourceForm.POST]: 'created',
    [ResourceForm.PUT]: 'modified',
    [ResourceForm.DELETE]: 'deleted'
  }
  return ResourceForm
}

module.exports = resourceFormFactory
