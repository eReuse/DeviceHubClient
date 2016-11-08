function ComputerSnapshotFormSchemaFactory (SnapshotFormSchema, FormSchema, ResourceSettings, $rootScope, $q) {
  var Progress = require('./../../utils').Progress
  var CannotSubmit = require('./../../forms/form-schema/cannot-submit.exception')
  /**
   * Extends SnapshotFormSchema. See that class to know how to use it.
   * @param {object} model The resource
   * @param {object} form A reference to formly's form
   * @param {object} status The status object
   * @param {array} options It adds a new 'deviceType' field with the type of device
   * @param {object} scope $scope
   * @constructor
   */
  function ComputerSnapshotFormSchema (model, form, status, options, scope) {
    var self = this
    this.PICK_VARS = [{key: 'from'}, {key: 'place'}]
    status.uploaded = status.unsolved = 0
    status.working = status.done = false
    status.results = {
      error: [],
      success: []
    }
    this.deviceRSettings = ResourceSettings('Computer')
    model['@type'] = 'devices:Snapshot'
    FormSchema.apply(this, arguments)
    var fields = []
    _.forEach(this.PICK_VARS, function (filter) {
      fields = fields.concat(_.filter(self.fields, filter))
    })
    this.fields = fields
    this.fields.unshift({
      key: 'files',
      templateOptions: {
        label: 'Snapshot JSON Files to upload',
        accept: '.json',
        required: true,
        readAs: 'readAsText',
        multiple: true,
        description: 'You can select multiple'
      },
      type: 'upload'
    })
  }

  ComputerSnapshotFormSchema.prototype = Object.create(SnapshotFormSchema.prototype)
  ComputerSnapshotFormSchema.prototype.constructor = ComputerSnapshotFormSchema
  var proto = ComputerSnapshotFormSchema.prototype

  /**
   *
   * @param originalModel
   */
  proto.submit = function (originalModel) {
    var self = this
    this.status.results.error.length = this.status.results.success.length = 0
    Progress.start()
    iterativeUpload(originalModel.files, 0)
    function iterativeUpload (files, index) {
      try {
        var file = files[index]
      } catch (e) { // This file is required and should be treated as a local error
        self.status.errorFromLocal = true
        Progress.stop()
        throw new CannotSubmit('Select at least one JSON file')
      }
      try {
        var snapshotFromFile = JSON.parse(file.data)
      } catch (e) {
        self.status.results.error.push({
          fileName: file.name,
          type: 'json',
          object: e
        })
        ++self.status.unsolved
        self.status.errorFromLocal = true
        return final()
      }
      var model = _.assign({}, snapshotFromFile)
      _.forEach(self.PICK_VARS, function (filter) {
        if (originalModel[filter.key]) model[filter.key] = originalModel[filter.key]
      })
      try {
        var promise = SnapshotFormSchema.prototype.submit.call(self, model)
      } catch (e) { // Local JS validation form error
        Progress.stop()
        throw e
      }
      promise.then(function (modelFromServer) {
        self.status.results.success.push({
          fileName: file.name,
          _id: modelFromServer._id
        })
        return modelFromServer
      }).catch(function (modelFromServer) {
        self.status.results.error.push({
          fileName: file.name,
          _id: modelFromServer._id,
          fileContent: snapshotFromFile,
          object: modelFromServer,
          solved: false,
          type: 'server'
        })
        ++self.status.unsolved
        return $q.reject(modelFromServer)
      }).finally(final)

      function final () {
        ++self.status.uploaded
        if (index === (files.length - 1)) {
          if (self.status.results.success.length > 0) {
            $rootScope.$broadcast('submitted@Computer')
            $rootScope.$broadcast('submitted@any')
          }
          self.status.working = false
          self.status.done = true
          Progress.stop()
        } else {
          iterativeUpload(files, index + 1)
        }
      }
    }
  }
  proto.succeedSubmissionFactory = function () {
    return _.identity
  }
  proto.failedSubmissionFactory = function () {
    return function (response) {
      return $q.reject(response)
    }
  }
  proto.prepareOptions = function (options) {
    var _options = SnapshotFormSchema.prototype.prepareOptions.call(this, options)
    _options.doNotUse.push('device')
    return _options
  }
  return ComputerSnapshotFormSchema
}

module.exports = ComputerSnapshotFormSchemaFactory
