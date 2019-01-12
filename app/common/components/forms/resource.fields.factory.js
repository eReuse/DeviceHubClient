const CannotSubmit = require('./cannot-submit.exception')

/**
 * @module resourceFields
 */

/**
 * @param {module:fields} fields
 * @param {module:enums} enums
 */
function resourceFields (fields, resources, SubmitForm, $translate, Notification, enums) {
  const f = fields

  /**
   * @alias module:resourceFields.ResourceForm
   * @extends module:fields.Form
   */
  class ResourceForm extends fields.Form {
    constructor (model, ...fields) {
      console.assert(model instanceof resources.Thing)
      super(model, ...fields)
      this.status = {}
      this.submitForm = new SubmitForm(this, this.status)
    }

    post () {
      return this.submit(this.constructor.POST)
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
      const promise = this.model.post()
      promise.then(() => this._success(op))
      this.submitForm.after(promise)
      return promise
    }

    /**
     * @param {string} op
     * @private
     */
    _success (op) {
      const namespace = 'forms.resource.notification'
      Notification.success(
        $translate.instant(`${namespace}.success`,
          {
            title: this.model,
            op: $translate.instant(`${namespace}.${op.toLowerCase()}`)
          })
      )
    }
  }

  ResourceForm.POST = 'POST'
  ResourceForm.PUT = 'PUT'
  ResourceForm.DELETE = 'DELETE'

  /**
   * @alias module:resourceFields.Event
   * @extends module:resourceFields.ResourceForm
   */
  class Event extends ResourceForm {
    constructor (model, ...fields) {
      const def = {namespace: 'r.event'}
      super(model,
        new f.String('name', _.defaults({maxLength: fields.STR_BIG_SIZE}, def)),
        new f.Datepicker('endTime', def),
        new f.Select('severity',
          _.defaults({options: enums.Severity.options(f)}, def)),
        new f.Textarea('description', def),
        ...fields
      )
    }
  }

  /**
   * @alias module:resourceFields.EventWithMultipleDevices
   * @extends module:resourceFields.Event
   */
  class EventWithMultipleDevices extends Event {
    constructor (model, ...fields) {
      super(model, ...fields)
      const devices = new f.Resources('devices', {namespace: 'r.eventWithMultipleDevices'})
      this.fields.splice(1, 0, devices)
    }
  }

  /**
   * @alias module:resourceFields.ReadyToUse
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class ReadyToUse extends EventWithMultipleDevices {
  }

  class ToPrepare extends EventWithMultipleDevices {
  }

  return {
    ResourceForm: ResourceForm,
    Event: Event,
    EventWithMultipleDevices: EventWithMultipleDevices,
    ReadyToUse: ReadyToUse,
    ToPrepare: ToPrepare
  }
}

module.exports = resourceFields
