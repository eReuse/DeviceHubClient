/**
 * @param {FormSchema} FormSchema
 * @param ResourceSettings
 * @returns {SnapshotFormSchema}
 * @constructor
 */
function SnapshotFormSchemaFactory (FormSchema, ResourceSettings) {
  /**
   * FormSchema for snapshots, adding key fields for the device.
   */
  class SnapshotFormSchema extends FormSchema {
    constructor (model, form, status, parserOptions = {}, deviceType) {
      let deviceRSettings = ResourceSettings(deviceType)
      // let deviceSchema = _.cloneDeep(deviceRSettings.schema)
      model.device = {'type': deviceType}
      model.type = 'Snapshot' // Just in case is not there (ex: ComputerSnapshot)
      model.software = 'Web'
      model.version = '1.0'
      // delete deviceSchema.description
      // delete deviceSchema.place
      // deviceSchema.manufacturer.data_relation = {
      //   'resource': 'manufacturers',
      //   'field': 'label',
      //   'embeddable': true
      // }
      // parserOptions.schema = {
      //   device: {
      //     type: 'dict',
      //     schema: deviceSchema,
      //     sink: ResourceSettings(model['@type']).schema.device.sink,
      //     required: true
      //   }
      // }
      // Although getSetting can generate exception if setting not found, we know that Device at least has the property
      let deviceDoNotUse = _.map(deviceRSettings.getSetting('doNotUse'), x => 'device.' + x)
      parserOptions.doNotUse = _.concat(parserOptions.doNotUse || [], ['software', 'label'], deviceDoNotUse)
      super(model, form, status, parserOptions)
    }

  }
  return SnapshotFormSchema
}
module.exports = SnapshotFormSchemaFactory
