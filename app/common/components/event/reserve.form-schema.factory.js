/**
 * @param {FormSchema} FormSchema
 * @param ResourceSettings
 * @returns {ReserveFormSchema}
 * @constructor
 */
function ReserveFormSchemaFactory (FormSchema) {
  /**
   * Just disables two fields that are auto-filled by DeviceHubClient.
   */
  class ReserveFormSchema extends FormSchema {
    constructor (model, form, status, parserOptions = {}) {
      super(model, form, status, parserOptions)
      try {
        // Only Sell has this value
        _.find(form.fields, {key: 'to'}).templateOptions.disabled = true
      } catch (e) {}
      _.find(form.fields, {key: 'reserve'}).templateOptions.disabled = true
    }
  }

  return ReserveFormSchema
}

module.exports = ReserveFormSchemaFactory
