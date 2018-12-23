const eForms = require('./event.forms')
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

    post () {
      this.submit(this.constructor.POST)
    }

    /**
     * Submits the form.
     * @param {string} op
     */
    submit (op) {
      console.assert(this.constructor[op], 'OP must be a REST method.')
      if (this.submitForm.isValid()) {
        this.submitForm.prepare()
        return this._submit(op)
      } else {
        throw new CannotSubmit('Form is invalid')
      }
    }

    /**
     * Internal function that performs the actual submission,
     * without checking.
     * @returns {Promise.<T>|*}
     * @private
     */
    _submit (op) {
      const model = this.model.copy()
      const promise = model.post()
      promise.then(this._succeedSubmissionFactory(op, model))
      this.submitForm.after(promise)
      return promise
    }

    /**
     * @param {string} op
     * @param {Thing} model
     * @returns {Function}
     * @private
     */
    _succeedSubmissionFactory (op, model) {
      return response => {
        Notification.success(`${model.title} successfully ${this.constructor.NOTIFICATIONS[op]}.`)
        $rootScope.$broadcast(`submitted@${model.type}`)
        return response
      }
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
