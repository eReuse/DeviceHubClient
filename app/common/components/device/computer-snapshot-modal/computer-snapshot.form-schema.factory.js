/**
 *
 * @param {SnapshotFormSchema} SnapshotFormSchema
 * @param $rootScope
 * @param $q
 * @returns {ComputerSnapshotFormSchema}
 * @constructor
 */
function ComputerSnapshotFormSchemaFactory (SnapshotFormSchema, $rootScope, $q) {
  /**
   * Contains a list of form keys used to create the field
   * @type {string[]}
   */
  const PICK_FIELDS = ['from', 'place']

  /**
   * Enables uploading Snapshot forms containing snapshot files.
   */
  class ComputerSnapshotFormSchema extends SnapshotFormSchema {

    /**
     * @param {object} model - The resource to upload.
     * @param {object} form - A reference to formly's form
     * @param {object} status - The status object. See it in FormSchema. **We do not use status.succeeded**
     * @param {object} parserOptions - Options for cerberusToFormly. See it there.
     */
    constructor (model, form, status, parserOptions = {}) {
      status.uploaded = status.unsolved = 0
      status.results = {
        error: [],
        success: []
      }
      super(model, form, status, parserOptions, 'Computer')
      // Snapshot is special in that we only use three values, two from the Schema computed in FormSchema
      // Let's override this.fields with the only three fields we are going to use
      _.remove(this.fields, field => !_.includes(PICK_FIELDS, field.key))
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

    /**
     * Uploads *all* the Snapshot json files to the server.
     *
     * @param {object} originalModel - The formly model
     */
    submit (originalModel) {
      // Note that we will call super.submit() for each snapshot in *_iterativeUpload*
      if (this.submitForm.isValid()) this._iterativeUpload(originalModel, _(originalModel.files))
    }

    /**
     * Iteratively uploads the Snapshot json files to the server.
     *
     * Note that we upload iteratively to not overhead the server.
     * @param {object} originalModel
     * @param {Iterator} iterator - An iterator containing the files.
     * @private
     */
    _iterativeUpload (originalModel, iterator) {
      let step = iterator.next()
      if (!step.done) { // We have a new file to process
        let file = step.value
        let snapshotFromFile
        try {
          snapshotFromFile = JSON.parse(file.data)
        } catch (e) {
          this.status.results.error.push({
            fileName: file.name,
            type: 'json',
            object: e
          })
          ++this.status.unsolved
          this.status.errorFromLocal = true
          this._uploadNextFile(originalModel, iterator) // Let's still continue with other json
          return
        }
        // Model we submit = the fields of the form + values from snapshot
        let model = _.assign(_.pick(originalModel, PICK_FIELDS), snapshotFromFile)
        let self = this
        super.submit(model).then(modelFromServer => {
          self.status.results.success.push({
            fileName: file.name,
            _id: modelFromServer._id
          })
          return modelFromServer
        }).catch(modelFromServer => {
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
        }).finally(() => { this._uploadNextFile(originalModel, iterator)})
      } else { // no more files to process
        if (this.status.results.success.length > 0) {
          $rootScope.$broadcast('submitted@Computer')
          $rootScope.$broadcast('submitted@any')
        }
        this.submitForm.final() // Let's say with our flags that we are finished
      }
    }

    /**
     * Performs the recursive call to iterativeUpload
     * @param {object} originalModel
     * @param {Iterator} iterator - An iterator containing the files
     * @private
     */
    _uploadNextFile (originalModel, iterator) {
      ++this.status.uploaded
      this._iterativeUpload(originalModel, iterator)
    }

    _succeedSubmissionFactory () {
      return _.identity
    }

    _final (promise) {}
  }
  return ComputerSnapshotFormSchema
}

module.exports = ComputerSnapshotFormSchemaFactory
