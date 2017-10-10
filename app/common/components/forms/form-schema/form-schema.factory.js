function FormSchemaFactory (ResourceSettings, SubmitForm, $rootScope, Notification, cerberusToFormly, Restangular) {
  const utils = require('./../../utils.js')
  const CannotSubmit = require('./cannot-submit.exception')
  const OPERATION = {
    put: 'updated',
    post: 'created',
    delete: 'deleted'
  }

  /**
   * Generates and handles a form schema, using angular-formly settings. This service provides
   * the functions to submit and delete the resource in the form.
   */
  class FormSchema {
    /**
     * @param {object} model - The resource to upload.
     * @param {object} form - A form object containing a reference to formly's form.
     * @param {object} form.form - A formly form. It is ok if this is not set yet when creating
     * FormSchema, but it will need to be set when submitting. This is usual workflow when leading
     * @param {object[]} form.fields - formly form's fields, usually from *cerberusToFormly* service.
     * with formly forms, as until the formly form is instantiated this value won't be populated.
     * @param {object} status - Flags of the submission.
     * @param {boolean} status.errorFromLocal - An error has been detected through validation in the browser prior
     * submitting to server.
     * @param {boolean} status.loading - A flag indicating that the server is processing a request of the server.
     * @param {boolean} status.errorListFromServer - An error has been detected from the server.
     * @param {boolean} status.done - If the execution has done. Prior first execution is false too.
     * @param {boolean} status.succeeded - Flag set true when the execution is done successfully (HTTP 2XX).
     * @param {object} [parserOptions] - Options for cerberusToFormly. See it there.
     * @property {object|undefined} _uploadsFile - Does this form upload a file? If yes, the schema of such field or
     * undefined.
     * API.
     */
    constructor (model, form, status, parserOptions = {}) {
      this.rSettings = ResourceSettings(model['@type'])
      this.form = form
      this.status = status
      // Assign parserOptions
      _.defaultsDeep(parserOptions, {
        excludeLabels: {
          receiver: 'Check if the receiver has already an account',
          to: 'Check if the new possessor has already an account',
          from: 'Check if the old possessor has already an account'
        }
      })
      try {
        parserOptions.doNotUse = _.concat(parserOptions.doNotUse || [], this.rSettings.getSetting('doNotUse'))
      } catch (err) {}  // doNotUse not in getSetting
      this.fields = this.form.fields = cerberusToFormly.parse(model, parserOptions)
      this._uploadsFile = _.find(this.fields, {type: 'upload'})
      this.submitForm = new SubmitForm(form, status)
    }

    /**
     * Submits the form.
     * @param {object} originalModel - The formly model
     * @return {Promise}
     */
    submit (originalModel) {
      if (this.submitForm.isValid()) {
        this.submitForm.prepare()
        return this._submit(originalModel)
      } else {
        throw new CannotSubmit('Form is invalid')
      }
    }

    /**
     * Internal function that performs the actual submission, without checking
     * @param {object} originalModel
     * @returns {Promise.<T>|*}
     * @private
     */
    _submit (originalModel) {
      const model = utils.copy(originalModel) // We are going to change stuff in model
      // Remove helper values todo necessary still?
      for (const fieldName in model) if (_.includes(fieldName, 'exclude_')) delete model[fieldName]
      // Upload
      let promise
      if ('put' in model) {
        promise = model.put()
      } else if (this._uploadsFile) {
        const field = this._uploadsFile
        promise = this.rSettings.server.postWithFiles(model, field.key, field.templateOptions.files)
      } else {
        promise = this.rSettings.server.post(model)
      }
      promise.then(this._succeedSubmissionFactory(OPERATION['put' in model ? 'put' : 'post'], model))
      this._final(promise)
      return promise
    }

    delete (model) {
      if (confirm('Are you sure you want to delete it?')) {
        model.remove().then(
          this._succeedSubmissionFactory(OPERATION.delete, model),
          this._failedSubmissionFactory()
        )
      }
    }

    _succeedSubmissionFactory (operationName, model) {
      return response => {
        const resource = _.isUndefined(response) ? model : response // DELETE operations do not answer with the result
        Notification.success(utils.getResourceTitle(resource) + ' successfully ' + operationName + '.')
        $rootScope.$broadcast('submitted@' + resource['@type'])
        return response
      }
    }

    _final (promise) {
      this.submitForm.after(promise)
    }

  }

  return FormSchema
}

module.exports = FormSchemaFactory
