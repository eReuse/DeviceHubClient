function FormSchemaFactory (ResourceSettings, SubmitForm, $rootScope, Notification) {
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
     * with formly forms, as until the formly form is instantiated this value won't be populated.
     * @param {object} status - Flags of the submission.
     * @param {boolean} status.errorFromLocal - An error has been detected through validation in the browser prior
     * submitting to server.
     * @param {boolean} status.loading - A flag indicating that the server is processing a request of the server.
     * @param {boolean} status.errorListFromServer - An error has been detected from the server.
     * @param {boolean} status.done - If the execution has done. Prior first execution is false too.
     * @param {boolean} status.succeeded - Flag set true when the execution is done successfully (HTTP 2XX).
     * @param {object} [parserOptions] - Options for cerberusToFormly. See it there. TODO cerberusFormly obsolete, remove this?
     * @property {object|undefined} _uploadsFile - Does this form upload a file? If yes, the schema of such field or
     * undefined.
     * API.
     */
    constructor (model, form, status, parserOptions = {}) {
      this.rSettings = ResourceSettings(model['@type']) // need resource settings for server mainly
      this.resourceType = model['@type']
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
      } catch (err) {
      }  // doNotUse not in getSetting

      this.fields = this.form.fields = this._getFields(this.resourceType, model.device && model.device.type)

      // this.fields = this.form.fields = cerberusToFormly.parse(model, parserOptions)
      // console.log('type:' + model['@type'])
      // console.log('----------------------')
      // console.log(JSON.stringify(this.fields))
      // console.log('----------------------------------------------------')

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
      } else if (this.resourceType === 'devices:NewTag') { // TODO this case should probably be generalized and settings moved to config
        const device = model.device
        const newTagID = device.newTagID
        promise = this.rSettings.server.one(newTagID).one('device', device._id).put()
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
        // TODO this is probably outdated with teal
        // const resource = _.isUndefined(response) ? model : response // DELETE operations do not answer with the result
        const resource = model
        Notification.success(utils.getResourceTitle(resource) + ' successfully ' + operationName + '.')
        $rootScope.$broadcast('submitted@' + resource['@type'])
        return response
      }
    }

    _final (promise) {
      this.submitForm.after(promise)
    }

    // _getURL (event) {
    //   switch (event) {
    //     case 'devices:ToPrepare':
    //       return []
    //     case 'devices:ToRepair':
    //       return []
    //     case 'devices:Repair':
    //       return []
    //     case 'devices:Ready':
    //       return []
    //     case 'devices:Locate':
    //       return []
    //     case 'devices:Allocate':
    //       return []
    //     case 'devices:Reserve':
    //       return []
    //     case 'devices:Sell':
    //       return []
    //     case 'devices:CancelReservation':
    //       return []
    //     case 'devices:Deallocate':
    //       return []
    //     case 'devices:Receive':
    //       return []
    //     case 'devices:ToDispose':
    //       return []
    //     case 'devices:Dispose':
    //       return []
    //     case 'devices:TransferAssetLicense':
    //       return []
    //     case 'devices:Snapshot':
    //       return []
    //     default:
    //       throw new Error('event ' + event + ' does not have fields specified')
    //   }
    // }

    // TODO move fields definition to schema definition and get resource-settings from there
    _getFields (event, type) {
      switch (event) {
        case 'devices:ToPrepare':
          return [{
            'key': 'label',
            'name': 'label',
            'type': 'input',
            'templateOptions': {'description': 'A short, descriptive title', 'label': 'Label', 'disabled': false}
          }, {
            'key': 'devices',
            'name': 'devices',
            'type': 'resources',
            'templateOptions': {'key': '_id', 'label': 'Devices', 'disabled': false, 'placeholder': []}
          }, {
            'key': 'date',
            'name': 'date',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When this happened. Leave blank if it is happening now.',
              'label': 'Date',
              'disabled': false
            }
          }, {
            'key': 'incidence',
            'name': 'incidence',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Check if something went wrong, you can add details in a comment',
              'label': 'Incidence',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'description',
            'name': 'description',
            'type': 'textarea',
            'templateOptions': {
              'maxlength': 500,
              'description': 'Full long description.',
              'label': 'Description',
              'disabled': false
            }
          }]
        case 'devices:ToRepair':
          return [{
            'key': 'label',
            'name': 'label',
            'type': 'input',
            'templateOptions': {'description': 'A short, descriptive title', 'label': 'Label', 'disabled': false}
          }, {
            'key': 'devices',
            'name': 'devices',
            'type': 'resources',
            'templateOptions': {'key': '_id', 'label': 'Devices', 'disabled': false, 'placeholder': []}
          }, {
            'key': 'date',
            'name': 'date',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When this happened. Leave blank if it is happening now.',
              'label': 'Date',
              'disabled': false
            }
          }, {
            'key': 'incidence',
            'name': 'incidence',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Check if something went wrong, you can add details in a comment',
              'label': 'Incidence',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'description',
            'name': 'description',
            'type': 'textarea',
            'templateOptions': {
              'maxlength': 500,
              'description': 'Full long description.',
              'label': 'Description',
              'disabled': false
            }
          }]
        case 'devices:Repair':
          return [{
            'key': 'label',
            'name': 'label',
            'type': 'input',
            'templateOptions': {'description': 'A short, descriptive title', 'label': 'Label', 'disabled': false}
          }, {
            'key': 'devices',
            'name': 'devices',
            'type': 'resources',
            'templateOptions': {'key': '_id', 'label': 'Devices', 'disabled': false, 'placeholder': []}
          }, {
            'key': 'date',
            'name': 'date',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When this happened. Leave blank if it is happening now.',
              'label': 'Date',
              'disabled': false
            }
          }, {
            'key': 'incidence',
            'name': 'incidence',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Check if something went wrong, you can add details in a comment',
              'label': 'Incidence',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'description',
            'name': 'description',
            'type': 'textarea',
            'templateOptions': {
              'maxlength': 500,
              'description': 'Full long description.',
              'label': 'Description',
              'disabled': false
            }
          }]
        case 'devices:Ready':
          return [{
            'key': 'label',
            'name': 'label',
            'type': 'input',
            'templateOptions': {'description': 'A short, descriptive title', 'label': 'Label', 'disabled': false}
          }, {
            'key': 'devices',
            'name': 'devices',
            'type': 'resources',
            'templateOptions': {'key': '_id', 'label': 'Devices', 'disabled': false, 'placeholder': []}
          }, {
            'key': 'date',
            'name': 'date',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When this happened. Leave blank if it is happening now.',
              'label': 'Date',
              'disabled': false
            }
          }, {
            'key': 'incidence',
            'name': 'incidence',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Check if something went wrong, you can add details in a comment',
              'label': 'Incidence',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'description',
            'name': 'description',
            'type': 'textarea',
            'templateOptions': {
              'maxlength': 500,
              'description': 'Full long description.',
              'label': 'Description',
              'disabled': false
            }
          }]
        case 'devices:Locate':
          return [{
            'key': 'label',
            'name': 'label',
            'type': 'input',
            'templateOptions': {'description': 'A short, descriptive title', 'label': 'Label', 'disabled': false}
          }, {
            'key': 'devices',
            'name': 'devices',
            'type': 'resources',
            'templateOptions': {'key': '_id', 'label': 'Devices', 'disabled': false, 'placeholder': []}
          }, {
            'key': 'place',
            'name': 'place',
            'type': 'typeahead',
            'templateOptions': {
              'resourceName': 'places',
              'keyFieldName': '_id',
              'label': 'Place',
              'labelFieldName': 'label',
              'filterFieldNames': ['label', '_id'],
              'description': 'Where did it happened',
              'disabled': false
            }
          }, {
            'key': 'date',
            'name': 'date',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When this happened. Leave blank if it is happening now.',
              'label': 'Date',
              'disabled': false
            }
          }, {
            'key': 'incidence',
            'name': 'incidence',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Check if something went wrong, you can add details in a comment',
              'label': 'Incidence',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'description',
            'name': 'description',
            'type': 'textarea',
            'templateOptions': {
              'maxlength': 500,
              'description': 'Full long description.',
              'label': 'Description',
              'disabled': false
            }
          }]
        case 'devices:Allocate':
          return [{
            'key': 'label',
            'name': 'label',
            'type': 'input',
            'templateOptions': {'description': 'A short, descriptive title', 'label': 'Label', 'disabled': false}
          }, {
            'key': 'to',
            'name': 'to',
            'type': 'getFromDataRelationOrCreate',
            'templateOptions': {
              'resourceName': 'accounts',
              'keyFieldName': '_id',
              'label': 'To',
              'labelFieldName': 'email',
              'filterFieldNames': ['email'],
              'schema': {
                'fieldGroup': [{'template': '<h4>To</h4>'}, {
                  'key': 'email',
                  'name': 'to.to.email',
                  'type': 'input',
                  'templateOptions': {'type': 'email', 'required': true, 'label': 'Email', 'disabled': false}
                }, {
                  'key': 'name',
                  'name': 'to.to.name',
                  'type': 'input',
                  'templateOptions': {
                    'description': 'The name of an account, if it is a person or an organization.',
                    'label': 'Name',
                    'disabled': false
                  }
                }, {
                  'key': 'isOrganization',
                  'name': 'to.to.isOrganization',
                  'type': 'checkbox',
                  'templateOptions': {'label': 'Is organization', 'disabled': false}
                }, {
                  'key': 'organization',
                  'name': 'to.to.organization',
                  'type': 'input',
                  'templateOptions': {
                    'description': 'The name of the organization the account is in. Organizations can be inside others.',
                    'label': 'Organization',
                    'disabled': false
                  }
                }],
                'key': 'to',
                'sink': 2
              },
              'getFromDataRelationOrCreate': 'email',
              'required': true,
              'disabled': false
            }
          }, {
            'key': 'devices',
            'name': 'devices',
            'type': 'resources',
            'templateOptions': {'key': '_id', 'label': 'Devices', 'disabled': false, 'placeholder': []}
          }, {
            'key': 'date',
            'name': 'date',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When this happened. Leave blank if it is happening now.',
              'label': 'Date',
              'disabled': false
            }
          }, {
            'key': 'incidence',
            'name': 'incidence',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Check if something went wrong, you can add details in a comment',
              'label': 'Incidence',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'description',
            'name': 'description',
            'type': 'textarea',
            'templateOptions': {
              'maxlength': 500,
              'description': 'Full long description.',
              'label': 'Description',
              'disabled': false
            }
          }]
        case 'devices:Reserve':
          return [{
            'key': 'label',
            'name': 'label',
            'type': 'input',
            'templateOptions': {'description': 'A short, descriptive title', 'label': 'Label', 'disabled': false}
          }, {
            'key': 'for',
            'name': 'for',
            'type': 'getFromDataRelationOrCreate',
            'templateOptions': {
              'resourceName': 'accounts',
              'keyFieldName': '_id',
              'label': 'For',
              'labelFieldName': 'email',
              'filterFieldNames': ['email'],
              'schema': {
                'fieldGroup': [{'template': '<h4>For</h4>'}, {
                  'key': 'email',
                  'name': 'for.for.email',
                  'type': 'input',
                  'templateOptions': {'type': 'email', 'required': true, 'label': 'Email', 'disabled': false}
                }, {
                  'key': 'name',
                  'name': 'for.for.name',
                  'type': 'input',
                  'templateOptions': {
                    'description': 'The name of an account, if it is a person or an organization.',
                    'label': 'Name',
                    'disabled': false
                  }
                }, {
                  'key': 'isOrganization',
                  'name': 'for.for.isOrganization',
                  'type': 'checkbox',
                  'templateOptions': {'label': 'Is organization', 'disabled': false}
                }, {
                  'key': 'organization',
                  'name': 'for.for.organization',
                  'type': 'input',
                  'templateOptions': {
                    'description': 'The name of the organization the account is in. Organizations can be inside others.',
                    'label': 'Organization',
                    'disabled': false
                  }
                }],
                'key': 'for',
                'sink': 2
              },
              'getFromDataRelationOrCreate': 'email',
              'description': 'Who are you reserving for? If you leave it blank, you will reserve it for yourself.',
              'disabled': false
            }
          }, {
            'key': 'deadline',
            'name': 'deadline',
            'type': 'datepicker',
            'templateOptions': {'label': 'Deadline', 'disabled': false}
          }, {
            'key': 'devices',
            'name': 'devices',
            'type': 'resources',
            'templateOptions': {'key': '_id', 'label': 'Devices', 'disabled': false, 'placeholder': []}
          }, {
            'key': 'date',
            'name': 'date',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When this happened. Leave blank if it is happening now.',
              'label': 'Date',
              'disabled': false
            }
          }, {
            'key': 'incidence',
            'name': 'incidence',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Check if something went wrong, you can add details in a comment',
              'label': 'Incidence',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'description',
            'name': 'description',
            'type': 'textarea',
            'templateOptions': {
              'maxlength': 500,
              'description': 'Full long description.',
              'label': 'Description',
              'disabled': false
            }
          }]
        case 'devices:Sell':
          return [{
            'key': 'label',
            'name': 'label',
            'type': 'input',
            'templateOptions': {'description': 'A short, descriptive title', 'label': 'Label', 'disabled': false}
          }, {
            'key': 'to',
            'name': 'to',
            'type': 'getFromDataRelationOrCreate',
            'templateOptions': {
              'resourceName': 'accounts',
              'keyFieldName': '_id',
              'label': 'To',
              'labelFieldName': 'email',
              'filterFieldNames': ['email'],
              'schema': {
                'fieldGroup': [{'template': '<h4>To</h4>'}, {
                  'key': 'email',
                  'name': 'to.to.email',
                  'type': 'input',
                  'templateOptions': {'type': 'email', 'required': true, 'label': 'Email', 'disabled': false}
                }, {
                  'key': 'name',
                  'name': 'to.to.name',
                  'type': 'input',
                  'templateOptions': {
                    'description': 'The name of an account, if it is a person or an organization.',
                    'label': 'Name',
                    'disabled': false
                  }
                }, {
                  'key': 'isOrganization',
                  'name': 'to.to.isOrganization',
                  'type': 'checkbox',
                  'templateOptions': {'label': 'Is organization', 'disabled': false}
                }, {
                  'key': 'organization',
                  'name': 'to.to.organization',
                  'type': 'input',
                  'templateOptions': {
                    'description': 'The name of the organization the account is in. Organizations can be inside others.',
                    'label': 'Organization',
                    'disabled': false
                  }
                }],
                'key': 'to',
                'sink': 2
              },
              'getFromDataRelationOrCreate': 'email',
              'description': 'The user buying. If you leave it empty and you reference below a reference, we will set it to the user of the reference.',
              'disabled': false
            }
          }, {
            'key': 'shippingDate',
            'name': 'shippingDate',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When are the devices going to be ready for shipping?',
              'label': 'Shipping date',
              'disabled': false
            }
          }, {
            'key': 'reserve',
            'name': 'reserve',
            'type': 'typeahead',
            'templateOptions': {
              'resourceName': 'events',
              'keyFieldName': '_id',
              'label': 'Reserve',
              'labelFieldName': '_id',
              'filterFieldNames': ['_id'],
              'description': 'The reserve this sell confirms.',
              'disabled': false
            }
          }, {
            'key': 'devices',
            'name': 'devices',
            'type': 'resources',
            'templateOptions': {'key': '_id', 'label': 'Devices', 'disabled': false, 'placeholder': []}
          }, {
            'key': 'invoiceNumber',
            'name': 'invoiceNumber',
            'type': 'input',
            'templateOptions': {
              'description': 'The id of your invoice so they can be linked.',
              'label': 'Invoice number',
              'disabled': false
            }
          }, {
            'key': 'invoices',
            'name': 'invoices',
            'type': 'upload',
            'templateOptions': {
              'accept': 'application/pdf',
              'multiple': true,
              'description': 'Upload invoices in PDF. You can select multiple by pressing Ctrl or Cmd.You won\'t be able to modify them later and we will save them with the name they have.',
              'label': 'Invoices',
              'disabled': false
            }
          }, {
            'key': 'date',
            'name': 'date',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When this happened. Leave blank if it is happening now.',
              'label': 'Date',
              'disabled': false
            }
          }, {
            'key': 'incidence',
            'name': 'incidence',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Check if something went wrong, you can add details in a comment',
              'label': 'Incidence',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'description',
            'name': 'description',
            'type': 'textarea',
            'templateOptions': {
              'maxlength': 500,
              'description': 'Full long description.',
              'label': 'Description',
              'disabled': false
            }
          }]
        case 'devices:CancelReservation':
          return [{
            'key': 'label',
            'name': 'label',
            'type': 'input',
            'templateOptions': {'description': 'A short, descriptive title', 'label': 'Label', 'disabled': false}
          }, {
            'key': 'reserve',
            'name': 'reserve',
            'type': 'typeahead',
            'templateOptions': {
              'resourceName': 'events',
              'keyFieldName': '_id',
              'label': 'Reserve',
              'labelFieldName': '_id',
              'filterFieldNames': ['_id'],
              'required': true,
              'description': 'The reserve to cancel.',
              'disabled': false
            }
          }, {
            'key': 'date',
            'name': 'date',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When this happened. Leave blank if it is happening now.',
              'label': 'Date',
              'disabled': false
            }
          }, {
            'key': 'incidence',
            'name': 'incidence',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Check if something went wrong, you can add details in a comment',
              'label': 'Incidence',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'description',
            'name': 'description',
            'type': 'textarea',
            'templateOptions': {
              'maxlength': 500,
              'description': 'Full long description.',
              'label': 'Description',
              'disabled': false
            }
          }]
        case 'devices:Deallocate':
          return [{
            'key': 'label',
            'name': 'label',
            'type': 'input',
            'templateOptions': {'description': 'A short, descriptive title', 'label': 'Label', 'disabled': false}
          }, {
            'key': 'from',
            'name': 'from',
            'type': 'typeahead',
            'templateOptions': {
              'resourceName': 'accounts',
              'keyFieldName': '_id',
              'label': 'From',
              'labelFieldName': 'email',
              'filterFieldNames': ['email'],
              'disabled': false
            }
          }, {
            'key': 'devices',
            'name': 'devices',
            'type': 'resources',
            'templateOptions': {'key': '_id', 'label': 'Devices', 'disabled': false, 'placeholder': []}
          }, {
            'key': 'date',
            'name': 'date',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When this happened. Leave blank if it is happening now.',
              'label': 'Date',
              'disabled': false
            }
          }, {
            'key': 'incidence',
            'name': 'incidence',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Check if something went wrong, you can add details in a comment',
              'label': 'Incidence',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'description',
            'name': 'description',
            'type': 'textarea',
            'templateOptions': {
              'maxlength': 500,
              'description': 'Full long description.',
              'label': 'Description',
              'disabled': false
            }
          }]
        case 'devices:Receive':
          return [{
            'key': 'label',
            'name': 'label',
            'type': 'input',
            'templateOptions': {'description': 'A short, descriptive title', 'label': 'Label', 'disabled': false}
          }, {
            'key': 'receiver',
            'name': 'receiver',
            'type': 'getFromDataRelationOrCreate',
            'templateOptions': {
              'resourceName': 'accounts',
              'keyFieldName': '_id',
              'label': 'Receiver',
              'labelFieldName': 'email',
              'filterFieldNames': ['email'],
              'schema': {
                'fieldGroup': [{'template': '<h4>Receiver</h4>'}, {
                  'key': 'email',
                  'name': 'receiver.receiver.email',
                  'type': 'input',
                  'templateOptions': {'type': 'email', 'required': true, 'label': 'Email', 'disabled': false}
                }, {
                  'key': 'name',
                  'name': 'receiver.receiver.name',
                  'type': 'input',
                  'templateOptions': {
                    'description': 'The name of an account, if it is a person or an organization.',
                    'label': 'Name',
                    'disabled': false
                  }
                }, {
                  'key': 'isOrganization',
                  'name': 'receiver.receiver.isOrganization',
                  'type': 'checkbox',
                  'templateOptions': {'label': 'Is organization', 'disabled': false}
                }, {
                  'key': 'organization',
                  'name': 'receiver.receiver.organization',
                  'type': 'input',
                  'templateOptions': {
                    'description': 'The name of the organization the account is in. Organizations can be inside others.',
                    'label': 'Organization',
                    'disabled': false
                  }
                }],
                'key': 'receiver',
                'sink': 2
              },
              'getFromDataRelationOrCreate': 'email',
              'required': true,
              'disabled': false
            }
          }, {
            'key': 'acceptedConditions',
            'name': 'acceptedConditions',
            'type': 'checkbox',
            'templateOptions': {'required': true, 'label': 'Accepted conditions', 'disabled': false}
          }, {
            'key': 'automaticallyAllocate',
            'name': 'automaticallyAllocate',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Allocates to the user',
              'label': 'Automatically allocate',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'devices',
            'name': 'devices',
            'type': 'resources',
            'templateOptions': {'key': '_id', 'label': 'Devices', 'disabled': false, 'placeholder': []}
          }, {
            'key': 'type',
            'name': 'type',
            'type': 'radio',
            'templateOptions': {
              'options': [{
                'name': 'Collection point',
                'value': 'CollectionPoint'
              }, {'name': 'Final user', 'value': 'FinalUser'}, {'name': 'Recycling point', 'value': 'RecyclingPoint'}],
              'required': true,
              'label': 'Type',
              'disabled': false
            }
          }, {
            'key': 'place',
            'name': 'place',
            'type': 'typeahead',
            'templateOptions': {
              'resourceName': 'places',
              'keyFieldName': '_id',
              'label': 'Place',
              'labelFieldName': 'label',
              'filterFieldNames': ['label', '_id'],
              'description': 'Where did it happened',
              'disabled': false
            }
          }, {
            'key': 'date',
            'name': 'date',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When this happened. Leave blank if it is happening now.',
              'label': 'Date',
              'disabled': false
            }
          }, {
            'key': 'incidence',
            'name': 'incidence',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Check if something went wrong, you can add details in a comment',
              'label': 'Incidence',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'description',
            'name': 'description',
            'type': 'textarea',
            'templateOptions': {
              'maxlength': 500,
              'description': 'Full long description.',
              'label': 'Description',
              'disabled': false
            }
          }]
        case 'devices:ToDispose':
          return [{
            'key': 'label',
            'name': 'label',
            'type': 'input',
            'templateOptions': {'description': 'A short, descriptive title', 'label': 'Label', 'disabled': false}
          }, {
            'key': 'devices',
            'name': 'devices',
            'type': 'resources',
            'templateOptions': {'key': '_id', 'label': 'Devices', 'disabled': false, 'placeholder': []}
          }, {
            'key': 'date',
            'name': 'date',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When this happened. Leave blank if it is happening now.',
              'label': 'Date',
              'disabled': false
            }
          }, {
            'key': 'incidence',
            'name': 'incidence',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Check if something went wrong, you can add details in a comment',
              'label': 'Incidence',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'description',
            'name': 'description',
            'type': 'textarea',
            'templateOptions': {
              'maxlength': 500,
              'description': 'Full long description.',
              'label': 'Description',
              'disabled': false
            }
          }]
        case 'devices:Snapshot':
          switch (type) {
            case 'ComputerMonitor':
              return [
                {
                  key: 'device.tags[0].id',
                  type: 'input',
                  id: '_newTagID',
                  templateOptions: {
                    label: 'Tag',
                    description: window.AndroidApp
                      ? 'Hold your phone closely over the NFC-enabled tag or press the camera to scan the QR code'
                      : 'Identifier printed on tag or label',
                    addonRight: window.AndroidApp ? {
                      onClick: () => {
                        window.AndroidApp.scanBarcode('tagScanDone')
                      },
                      class: 'fa fa-camera'
                    } : null
                  }
                },
                {
                  'key': 'device.width',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Width',
                    'description': 'Indicate width',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.height',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Height',
                    'description': 'Indicate height',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.size',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Size',
                    'description': 'Indicate size',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.weight',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Weight',
                    'description': 'Indicate weight',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.resolutionWidth',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Resolution width',
                    'description': 'Indicate resolution width',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.resolutionHeight',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Resolution height',
                    'description': 'Indicate resolution height',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.serialNumber',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Serial number',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.model',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Model',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.manufacturer',
                  'type': 'typeahead',
                  'templateOptions': _.assign(
                    {
                      required: true,
                      resourceName: ResourceSettings('Manufacturer').resourceName
                    },
                    _.clone(ResourceSettings('Manufacturer').getSetting('dataRelation'))
                  )
                },
                {
                  'key': 'device.technology',
                  'type': 'select',
                  'templateOptions': {
                    'label': 'Technology',
                    'options': [
                      {name: 'CRT', value: 'CRT'},
                      {name: 'TFT', value: 'TFT'},
                      {name: 'PDP', value: 'PDP'},
                      {name: 'LCD', value: 'LCD'},
                      {name: 'OLED', value: 'OLED'},
                      {name: 'AMOLED', value: 'AMOLED'}
                    ]
                  }
                },
                {
                  'key': 'device.events[0].appearanceRange',
                  'type': 'select',
                  'templateOptions': {
                    'label': 'Appearance rating',
                    'options': [
                      {name: 'A', value: 'B'},
                      {name: 'B', value: 'B'}
                    ]
                  }
                },
                {
                  'key': 'device.events[0].functionalityRange',
                  'type': 'select',
                  'templateOptions': {
                    'label': 'Functionaliy rating',
                    'options': [
                      {name: 'A', value: 'B'},
                      {name: 'B', value: 'B'}
                    ]
                  }
                }
              ]
            case 'Smartphone':
              return [
                {
                  'key': 'device.width',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Width',
                    'description': 'Indicate width',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.height',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Height',
                    'description': 'Indicate height',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.weight',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Weight',
                    'description': 'Indicate weight',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.serialNumber',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Serial number',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.model',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Model',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.manufacturer',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Manufacturer',
                    'disabled': false
                  }
                },
                {
                  'key': 'device.imei',
                  'type': 'input',
                  'templateOptions': {
                    'type': 'number',
                    'label': 'IMEI',
                    'disabled': false
                  }
                }
              ]
            default:
              throw new Error('Fields for event' + event + ' and type' + type + 'not found')
          }
        case 'devices:Dispose':
          return [{
            'key': 'label',
            'name': 'label',
            'type': 'input',
            'templateOptions': {'description': 'A short, descriptive title', 'label': 'Label', 'disabled': false}
          }, {
            'key': 'devices',
            'name': 'devices',
            'type': 'resources',
            'templateOptions': {'key': '_id', 'label': 'Devices', 'disabled': false, 'placeholder': []}
          }, {
            'key': 'date',
            'name': 'date',
            'type': 'datepicker',
            'templateOptions': {
              'description': 'When this happened. Leave blank if it is happening now.',
              'label': 'Date',
              'disabled': false
            }
          }, {
            'key': 'incidence',
            'name': 'incidence',
            'type': 'checkbox',
            'templateOptions': {
              'description': 'Check if something went wrong, you can add details in a comment',
              'label': 'Incidence',
              'disabled': false,
              'placeholder': false
            }
          }, {
            'key': 'description',
            'name': 'description',
            'type': 'textarea',
            'templateOptions': {
              'maxlength': 500,
              'description': 'Full long description.',
              'label': 'Description',
              'disabled': false
            }
          }]
        case 'devices:TransferAssetLicense':
          return [
            {
              'key': 'transfer',
              'fieldGroup': [
                {'template': '<h4>Transfer</h4>'},
                {
                  'key': 'title',
                  'type': 'input',
                  'templateOptions': {
                    'description': 'A short, descriptive title',
                    'label': 'Title'
                  }
                },
                {
                  'key': 'date',
                  'name': 'transferDate',
                  'type': 'datepicker',
                  'templateOptions': {
                    'description': 'Date of transfer as stated in transfer document',
                    'label': 'Date'
                  }
                }
              ]
            },
            {
              'key': 'supplier',
              'fieldGroup': [
                {'template': '<h4>Supplier</h4>'},
                {
                  'key': 'id',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'CIF'
                  }
                },
                {
                  'key': 'name',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Name'
                  }
                }
              ]
            },
            {
              'key': 'deviceReuseManager',
              'fieldGroup': [
                {'template': '<h4>Device reuse manager</h4>'},
                {
                  'key': 'id',
                  'name': 'id',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'CIF'
                  }
                },
                {
                  'key': 'name',
                  'name': 'name',
                  'type': 'input',
                  'templateOptions': {
                    'label': 'Name'
                  }
                }
              ]
            },
            {
              'key': 'agreement',
              'fieldGroup': [
                {'template': '<h4>Agreement</h4>'},
                {
                  'key': 'title',
                  'type': 'input',
                  'templateOptions': {
                    'description': 'A short, descriptive title',
                    'label': 'Agreement title'
                  }
                },
                {
                  'key': 'date',
                  'type': 'datepicker',
                  'templateOptions': {
                    'description': 'Issue date of agreement as stated in agreement document',
                    'label': 'Agreement date'
                  }
                },
                {
                  'key': 'type',
                  'type': 'select',
                  'templateOptions': {
                    'label': 'Type of agreement',
                    'options': [
                      {name: 'eReuse Catalunya Circuit', value: 'ereuseCAT'},
                      {name: 'eReuse General', value: 'ereuseGeneral'},
                      {name: 'Private', value: 'Private'}
                    ]
                  }
                }
              ]
            },
            {
              'key': 'conditions',
              'fieldGroup': [
                { 'template': '<h4>Conditions</h4>' },
                {
                  'key': 'ownership',
                  'type': 'select',
                  'templateOptions': {
                    'label': 'Ownership',
                    'options': [
                      {name: 'Ownership remains with the supplier', value: 'supplier'},
                      {name: 'Ownership is transferred to device reuse manager', value: 'deviceReuseManager'},
                      {
                        name: 'Ownership is temporarily transferred to device reuse manager and subsequently to user',
                        value: 'user'
                      }
                    ]
                  }
                },
                {
                  'key': 'usufructTime',
                  'type': 'select',
                  'templateOptions': {
                    'label': 'Usage time',
                    'options': [
                      {name: 'Usage time is limited', value: 'limited'},
                      {name: 'Usage time is unlimited', value: 'unlimited'}
                    ]
                  }
                },
                {
                  'key': 'dataErasure',
                  'type': 'select',
                  'templateOptions': {
                    'label': 'Data erasure',
                    'options': [
                      {
                        name: 'Device data is erasure prior to transfer and no additional erasure is necessary',
                        value: 'noErasure'
                      },
                      {
                        name: 'Device data needs to be erased and erasure certified needs to be emitted',
                        value: 'erasureNecessary'
                      }
                    ]
                  }
                },
                {
                  'key': 'monetaryTransfer',
                  'type': 'select',
                  'templateOptions': {
                    'label': 'Compensations',
                    'options': [
                      {name: 'Devices can be sold', value: 'sell'},
                      {
                        name: 'Devices can not be sold, but services necessary for usage can be charged',
                        value: 'services'
                      },
                      {name: 'Devices can be donated for a monetary compensation', value: 'compensation'},
                      {name: 'Devices must be donated without any monetary compensation', value: 'free'}
                    ]
                  }
                },
                {
                  'key': 'priceUpperLimit',
                  'type': 'select',
                  'templateOptions': {
                    'label': 'Price upper limit',
                    'options': [
                      {name: 'Devices can be sold for any price', value: 'sell'},
                      {
                        name: 'Devices can be sold for any price except for some typologies of users which receive a discount',
                        value: 'services'
                      },
                      {
                        name: 'Devices can be sold for any price except for some typologies of users which pay the cost of services',
                        value: 'compensation'
                      },
                      {name: 'Devices must always be sold at the cost of services', value: 'free'}
                    ]
                  }
                },
                {
                  'key': 'certificates',
                  'fieldGroup': [
                    {'template': '<h5>Certificates of delivery</h5>'},
                    {
                      'key': 'deviceReuseManager',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Certificate of delivery to device reuse manager'
                      }
                    },
                    {
                      'key': 'provider',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Certificate of delivery to service provider'
                      }
                    },
                    {
                      'key': 'receiver',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Certificate of delivery to receiver'
                      }
                    },
                    {
                      'key': 'recycler',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Certificate of delivery to recycler'
                      }
                    }
                  ]
                },
                {
                  'key': 'reporting',
                  'fieldGroup': [
                    { 'template': '<h5>Reporting</h5><br>The device reuse manager must report:' },
                    {
                      'key': 'socialImpact',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Social impact'
                      }
                    },
                    {
                      'key': 'economicalImpact',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Economical impact'
                      }
                    },
                    {
                      'key': 'environmentalImpact',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Environmental impact'
                      }
                    },
                    {
                      'key': 'useValueAtRecycling',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Use value at recycling'
                      }
                    },
                    {
                      'key': 'percentagesProcessedByProviders',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Quotas of devices processed by providers'
                      }
                    },
                    {
                      'key': 'economicalImpact',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Donations and services charged'
                      }
                    }
                  ]
                },
                {
                  'key': 'serviceProviderFixedQuotes',
                  'fieldGroup': [
                    { 'template': '<h5>Fixed quotes for service providers</h5>' },
                    {
                      'key': 'definedBy',
                      'type': 'select',
                      'templateOptions': {
                        'label': 'Fixed quotes for service providers',
                        'options': [
                          {
                            name: 'The device reuse manager defines the quotes',
                            value: 'devicereusemanager'
                          },
                          {
                            name: 'The giver defines the quotes (up to 30%)',
                            value: 'giver'
                          }
                        ]
                      }
                    },
                    {
                      'key': 'quotes',
                      'type': 'input',
                      'templateOptions': {
                        'label': 'Quotes for service providers'
                      }
                    }
                  ]
                },
                {
                  'key': 'serviceProviderPerformanceQuotes',
                  'fieldGroup': [
                    {'template': '<h5>Performance dependent quotes for service providers</h5>'},
                    {
                      'key': 'returned',
                      'type': 'input',
                      'templateOptions': {
                        'label': 'Percentage of returned devices'
                      }
                    },
                    {
                      'key': 'returned',
                      'type': 'input',
                      'templateOptions': {
                        'label': 'Percentage of refurbished devices'
                      }
                    }
                  ]
                },
                {
                  'key': 'typologiesProviders',
                  'fieldGroup': [
                    { 'template': '<h5>Typologies service providers</h5>' },
                    {
                      'key': 'nonprofit',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Non-profit'
                      }
                    },
                    {
                      'key': 'ess',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Social and solitary economy (ESS)'
                      }
                    },
                    {
                      'key': 'jobplacement',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Job placement'
                      }
                    },
                    {
                      'key': 'cooperative',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Cooperatives'
                      }
                    },
                    {
                      'key': 'company',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Private companies'
                      }
                    }
                  ]
                },
                {
                  'key': 'typologiesReceivers',
                  'fieldGroup': [
                    { 'template': '<h5>Typologies receivers</h5>' },
                    {
                      'key': 'nonprofit',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Non-profit'
                      }
                    },
                    {
                      'key': 'ess',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Social and solitary economy (ESS)'
                      }
                    },
                    {
                      'key': 'jobplacement',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Job placement'
                      }
                    },
                    {
                      'key': 'school',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Schhols'
                      }
                    },
                    {
                      'key': 'cooperative',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Cooperatives'
                      }
                    },
                    {
                      'key': 'company',
                      'type': 'checkbox',
                      'templateOptions': {
                        'label': 'Private companies'
                      }
                    }
                  ]
                }
              ] // conditions field-group
            }
          ]
        case 'devices:NewTag':
          return [
            {
              key: 'device.newTagID',
              type: 'input',
              id: '_newTagID',
              templateOptions: {
                label: 'Tag',
                description: window.AndroidApp
                  ? 'Hold your phone closely over the NFC-enabled tag or press the camera to scan the QR code'
                  : 'Identifier printed on tag or label',
                addonRight: window.AndroidApp ? {
                  onClick: () => {
                    window.AndroidApp.scanBarcode('tagScanDone')
                  },
                  class: 'fa fa-camera'
                } : null
                /*
                : {
                  onClick: () => {
                    Notification.success('click on web')
                    $rootScope.$broadcast('tagScanDone', 'http://t.devicetag.io/DT-9KKD9')
                  },
                  class: 'fa fa-camera'
                }
                */
              }
            }
          ]
        default:
          throw new Error('event ' + event + ' does not have fields specified')
      }
    }

  }

  return FormSchema
}

module.exports = FormSchemaFactory
