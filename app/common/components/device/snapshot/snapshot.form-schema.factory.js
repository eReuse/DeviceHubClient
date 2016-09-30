var utils = require('./../../utils.js')

function FormSchemaFactory (FormSchema, ResourceSettings) {
  /**
   * Extends FormSchema. See that class to know how to use it. These are the following changes:
   * @param {object} model The resource
   * @param {object} form A reference to formly's form
   * @param {object} status The status object
   * @param {array} options It adds a new 'deviceType' field with the type of device
   * @param {object} scope $scope
   * @constructor
   */
  function SnapshotFormSchema (model, form, status, options, scope) {
    this.deviceRSettings = ResourceSettings(options.deviceType)
    var deviceSchema = _.cloneDeep(this.deviceRSettings.schema)
    model.device = {
      '@type': options.deviceType
    }
    model.automatic = false
    model.snapshotSoftware = 'DeviceHubClient'
    delete deviceSchema.description
    delete deviceSchema.place
    options.schema = {
      'device': {
        type: 'dict',
        'schema': deviceSchema,
        sink: ResourceSettings(model['@type']).schema.device.sink,
        required: true
      }
    }
    FormSchema.apply(this, arguments)
    _.remove(this.fields, {key: 'software'})
    _.remove(this.fields, {key: 'label'})
  }

  SnapshotFormSchema.prototype = Object.create(FormSchema.prototype)
  SnapshotFormSchema.prototype.constructor = SnapshotFormSchema
  var proto = SnapshotFormSchema.prototype

  /**
   * Add defaults to model prior submitting.
   * @param originalModel
   */
  proto.submit = function (originalModel) {
    var model = utils.copy(originalModel)
    FormSchema.prototype.submit.call(this, model)
  }
  /**
   * We add the doNotUse for the device
   * @param options
   * @return {*}
   */
  proto.prepareOptions = function (options) {
    var _options = _.cloneDeep(options)
    _options.doNotUse = _.concat(
      _options.doNotUse || [],
      this.deviceRSettings.settings.doNotUse,
      ResourceSettings('Device').settings.doNotUse
    )
    return FormSchema.prototype.prepareOptions.call(this, _options)
  }
  return SnapshotFormSchema
}

module.exports = FormSchemaFactory
