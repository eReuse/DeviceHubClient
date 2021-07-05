/**
 *
 * @param $scope
 * @param {module:fields} fields
 * @param {module:resources} resources
 * @param {module:server} server
 */
function uploadSnapshotCtl ($scope, fields, resources, $translate, server, $state) {
  class ManualSnapshot extends fields.Form {
    constructor () {
      const fileField = new fields.Upload('files', {
        accept: 'application/json',
        multiple: true,
        readAs: fields.Upload.READ_AS.TEXT,
        required: true,
        namespace: 'snapshot',
        expressions: {
          disabled: 'form.status.loading'
        }
      })
      super({}, fileField)
      this.fileField = fileField
      this.results = []
    }

    _submit () {
      this.results.length = 0
      return this._iterativeUpload(this.model.files[Symbol.iterator]())
    }

    /**
     *
     * @param {Iterator} iterator
     * @private
     * @return {Promise}
     */
    _iterativeUpload (iterator) {
      const {value: file, done} = iterator.next()
      if (done) return super._submit() // Resolve
      // Parse JSON
      let raw
      try {
        raw = JSON.parse(file.data)
      } catch (e) {
        this.results.push(new JSONError(file))
        return this._iterativeUpload(iterator)
      }
      // Upload Snapshot
      const snapshot = resources.Snapshot.init(raw, false)
      snapshot.data = raw.data
      return snapshot.post().then(() => {
        this.results.push(new Success(file, snapshot))
      }).catch(e => {
        this.results.push(new ServerError(file, e, snapshot))
      }).finally(() => {
        return this._iterativeUpload(iterator)
      })
    }

    _success (op, response, namespace) {
    }

    _error (op, response, namespace) {
    }

    cancel () {
      $state.go('^')
    }
  }

  class Result {
    /**
     *
     * @param {DataFile} file
     */
    constructor (file) {
      this.file = file
      this.description = ''
    }
  }

  Result.TYPE = null

  class Error extends Result {
    constructor (file, error) {
      super(file)
      this.error = error
    }
  }

  Error.TYPE = 'danger'

  class JSONError extends Error {
    constructor (file, error = true) {
      super(file, error)
    }

    toString () {
      return $translate.instant('snapshot.upload.wrongJson')
    }
  }

  class ServerError extends Error {
    constructor (file, error, snapshot) {
      super(file, error)
      this.snapshot = snapshot
      if (error.constraint === 'snapshot_uuid_key') {
        // Repeated Snapshot
        this.description = $translate.instant('snapshot.upload.alreadyUploaded')
      } else {
        this.description = error.toString()
      }
    }

    toString () {
      return $translate.instant('snapshot.upload.serverError')
    }
  }

  class Success extends Result {
    constructor (file, snapshot) {
      super(file)
      this.snapshot = snapshot
      this.description = this.snapshot.toString()
    }

    toString () {
      return this.snapshot.device
    }
  }

  Success.TYPE = 'success'

  $scope.form = new ManualSnapshot()
}

module.exports = uploadSnapshotCtl

