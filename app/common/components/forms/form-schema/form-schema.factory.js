var utils = require('./../../utils.js')
var CannotSubmit = require('./cannot-submit.exception')

function FormSchemaFactory (ResourceSettings, $rootScope, Notification, cerberusToFormly) {
  /**
   * Generates and handles a form schema, using angular-formly settings. This service provides
   * the functions to submit and delete the resource in the form.
   * @param {object} model The resource
   * @param {object} form A reference to formly's form
   * @param {object} status The status object
   * @param {array} options
   * @param {object} scope $scope
   * @constructor
   */
  function FormSchema (model, form, status, options, scope) {
    this.rSettings = ResourceSettings(model['@type'])
    this.form = form
    this.status = status
    var _options = this.prepareOptions(options)
    this.fields = cerberusToFormly.parse(model, scope, _options) // parse adds 'nonModifiable' to options
  }

  var proto = FormSchema.prototype
  proto.OPERATION = {
    put: 'updated',
    post: 'created',
    delete: 'deleted'
  }
  proto.submit = function (originalModel) {
    this.status.errorFromLocal = false
    if (this.isValid(this.fields)) {
      this.status.working = true
      this.status.errorListFromServer = null
      var model = utils.copy(originalModel) // We are going to change stuff in model
      this.removeHelperValues(model)
      this.upload(model).then(
        this.succeedSubmissionFactory(this.OPERATION['put' in model ? 'put' : 'post'], model),
        this.failedSubmissionFactory()
      )
    } else {
      this.status.errorFromLocal = true
      throw new CannotSubmit('Form is invalid')
    }
  }
  proto.removeHelperValues = function (model) {
    for (var fieldName in model) {
      if (_.includes(fieldName, 'exclude_')) delete model[fieldName]
    }
  }
  proto.upload = function (model) {
    return 'put' in model ? model.put() : this.rSettings.server.post(model)
  }
  proto.succeedSubmissionFactory = function (operationName, model) {
    var self = this
    return function (response) {
      var resource = _.isUndefined(response) ? model : response // DELETE operations do not answer with the result
      $rootScope.$broadcast('submitted@' + resource['@type'])
      $rootScope.$broadcast('submitted@any')
      self.status.working = false
      self.status.done = true
      Notification.success(utils.getResourceTitle(resource) + ' successfully ' + operationName + '.')
    }
  }
  proto.failedSubmissionFactory = function () {
    var self = this
    return function (response) {
      self.status.working = false
      self.status.errorListFromServer = response.data._issues
    }
  }
  proto.prepareOptions = function (options) {
    var _options = _.cloneDeep(options)
    _options.excludeLabels = {
      receiver: 'Check if the receiver has already an account',
      to: 'Check if the new possessor has already an account',
      from: 'Check if the old possessor has already an account'
    }
    _options.doNotUse = _.concat(_options.doNotUse || [], this.rSettings.settings.doNotUse)
    return _options
  }
  proto.isValid = function (schema) {
    if (!this.form.$valid) {
      return false
    } else {
      var valid = true
      schema.forEach(function (field) {
        try {
          if (!field.validators.or()) {
            valid = false
          }
        } catch (err) {}
      })
      return valid
    }
  }
  proto.delete = function (model) {
    if (confirm('Are you sure you want to delete it?')) {
      model.remove().then(
        this.succeedSubmissionFactory(this.OPERATION.delete, model),
        this.failedSubmissionFactory()
      )
    }
  }
  return FormSchema
}

module.exports = FormSchemaFactory
