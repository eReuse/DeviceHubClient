/**
 * @module resourceFields
 * IMPORTANT: we are using the formly library for creating forms http://angular-formly.com/
 */

/**
 * @param {module:fields} fields
 * @param {module:enums} enums
 */
//import { SHA3 } from "sha3"

function resourceFields (fields, resources, enums) {
  const f = fields

  /** 
   * @alias module:resourceFields.ResourceForm
   * @extends module:fields.Form
   */
  class ResourceForm extends fields.Form {
    constructor (model, ...fields) {
      console.assert(model instanceof resources.Thing)
      super(model, ...fields)
    }

    /**
     * Internal function that performs the actual submission,
     * without checking.
     * @returns {Promise.<T>|*}
     * @private
     */
    _submit (op) {
      switch (op) {
        case this.constructor.POST:
          return this.model.post()
        case this.constructor.PATCH:
          return this.model.patch()
        default:
          throw new Error(`Method ${op} not implemented.`)
      }
    }
  }

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
          _.defaults({options: enums.Severity .options(f)}, def)),
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
      /** TODO new-trade: show selected documents as well */
      this.fields.splice(1, 0, devices)
    }
  }

  /**
   * @alias module:resourceFields.EventWithMultipleDevices
   * @extends module:resourceFields.Event
   */
  class EventWithOneDocument extends ResourceForm {
    constructor (model, ...fields) {
      super(model, ...fields)
      const def = {namespace: 'r.eventWithOneDocument'}
      const doc = new f.Resources('doc', def)
      this.fields.splice(1, 0, doc)
    }
  }

  /**
   * @alias module:resourceFields.Recycling
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class Recycling extends EventWithMultipleDevices {
  }

  /**
   * @alias module:resourceFields.Use
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class Use extends EventWithMultipleDevices {
  }

  /**
   * @alias module:resourceFields.Refurbish
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class Refurbish extends EventWithMultipleDevices {
  }

  /**
   * @alias module:resourceFields.Management
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class Management extends EventWithMultipleDevices {
  }

  /**
   * @alias module:resourceFields.ToPrepare
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class ToPrepare extends EventWithMultipleDevices {
  }

  /**
   * @alias module:resourceFields.Delete
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class Delete extends EventWithMultipleDevices {
  }

  /**
   * @alias module:resourceFields.Prepare
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class Prepare extends EventWithMultipleDevices {
  }

  /**
   */
  class Allocate extends EventWithMultipleDevices {
    constructor (model, ...fields) {
      super(model, ...fields)
      const def = {namespace: 'r.allocate'}
      
      
      this.fields.splice(2, 0, new f.Datepicker('startTime', def))
      this.fields.push(new f.String('transaction', def))
      this.fields.push(new f.String('finalUserCode', def))
      this.fields.push(new f.Number('endUsers', def))
    }
  }

  /**
   */
  class Deallocate extends EventWithMultipleDevices {
    constructor (model, ...fields) {
      super(model, ...fields)
      const def = {namespace: 'r.allocate'}
      
      
      this.fields.splice(2, 0, new f.Datepicker('startTime', def))
      this.fields.push(new f.String('transaction', def))
    }
  }

  /**
   * @alias module:resourceFields.ToRepair
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class ToRepair extends EventWithMultipleDevices {
  }

  class DataWipe extends EventWithMultipleDevices {
    constructor (model, ...fields) {
      const def = {namespace: 'r.datawipe'}
      super(model,
        new f.String('url', _.defaults({maxLength: 2048, required: false}, def)),
        new f.String('documentId', _.defaults({maxLength: fields.STR_BIG_SIZE, required: false}, def)),
        new f.String('software', _.defaults({maxLength: fields.STR_BIG_SIZE, required: false}, def)),
        new f.Checkbox('success', def),
        new f.Upload('file', {
          accept: '*/*',
          multiple: false,
          readAs: 'readAsArrayBuffer',
          required: true,
          namespace: def.namespace,
          expressions: {
            disabled: 'form.status.loading'
          }
        }),
        ...fields
	      )
    }

    getHash () {
      return JSSHA3.sha3_256(this.model.file.data)
    }


    _submit (op) {
      this.model.filename = this.model.file.name
      this.model.hash = this.getHash()
      delete this.model.file
      return this.model.post()
    }
  }

  /**
   * @alias module:resourceFields.Ready
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class Ready extends EventWithMultipleDevices {
  }

  /**
   * @alias module:resourceFields.ToDisposeProduct
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class ToDisposeProduct extends EventWithMultipleDevices {
  }

  /**
   * @alias module:resourceFields.Receive
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class Receive extends EventWithMultipleDevices {
  }

  /**
   * @alias module:resourceFields.MakeAvailable
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class MakeAvailable extends EventWithMultipleDevices {
  }

  /**
   * @alias module:resourceFields.Rent
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class Rent extends EventWithMultipleDevices {
  }

  /**
   * TODO new-trade: change userTo Trade
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class Trade extends EventWithMultipleDevices {
    constructor (model, ...fields) {
      super(model, ...fields)
      const def = {namespace: 'r.trade'}
      function createField(fields, position, model, propName, namespace) {
        const newField = model[propName] ? 
          new f.StringReadOnly(propName, {defaultValue: model[propName], namespace: namespace})
          : new f.String(propName, {namespace: namespace})  
        fields.splice(position, 0, newField)
      }
      createField(this.fields, 1, model, 'userFromEmail', 'userFrom')
      createField(this.fields, 2, model, 'userToEmail', 'userTo')
      this.fields.push(new f.Checkbox("confirms", def))
      this.fields.push(new f.String("code", def))
    }
  }

  class Confirm extends EventWithMultipleDevices {
    constructor (model, ...fields) {
      super(model, ...fields)
      const action = model.action ? 
        new f.StringReadOnly('action', {defaultValue: model.action.id, namespace: 'r.trade'})
        : new f.String('action', {namespace: 'r.trade'})

      this.fields.splice(1, 0, action)
    }
  }

  class Revoke extends Confirm {
  }

  class ConfirmRevoke extends Confirm {
  }

  class ConfirmDocument extends ResourceForm {
    constructor (model, ...fields) {
      const def = {namespace: 'r.tradedocument'}
      super(model, ...fields)
      const documents = new f.Resources('documents', def)
      this.fields.splice(1, 0, documents)
    }

    _submit (op) {
      this.model.documents = this.model.documents.map((x) => x.id)
      return this.model.post()
    }
  }

  class RevokeDocument extends ResourceForm {
    constructor (model, ...fields) {
      const def = {namespace: 'r.tradedocument'}
      super(model, ...fields)
      const documents = new f.Resources('documents', def)
      this.fields.splice(1, 0, documents)
    }

    _submit (op) {
      this.model.documents = this.model.documents.map((x) => x.id)
      return this.model.post()
    }
  }

  class ConfirmRevokeDocument extends ResourceForm {
    constructor (model, ...fields) {
      const def = {namespace: 'r.tradedocument'}
      super(model, ...fields)
      const documents = new f.Resources('documents', def)
      this.fields.splice(1, 0, documents)
    }

    _submit (op) {
      this.model.documents = this.model.documents.map((x) => x.id)
      return this.model.post()
    }
  }

  /**
   * @alias module:resourceFields.Event
   * @extends module:resourceFields.ResourceForm
   */
  class TradeDocument extends ResourceForm {
    constructor (model, ...fields) {
      const def = {namespace: 'r.tradedocument'}
      super(model,
        new f.String('url', _.defaults({maxLength: 2048}, def)),
        new f.String('documentId', _.defaults({maxLength: fields.STR_BIG_SIZE}, def)),
        new f.String('description', _.defaults({maxLength: fields.STR_BIG_SIZE}, def)),
        new f.Datepicker('date', def),
        new f.Number('weight', def),
        new f.Upload('file', {
          accept: '*/*',
          multiple: false,
          readAs: 'readAsArrayBuffer',
          required: true,
          namespace: 'r.tradedocument',
          expressions: {
            disabled: 'form.status.loading'
          }
        }),
        ...fields
	      )
    }

    getHash () {
      return JSSHA3.sha3_256(this.model.file.data)
    }

    _submit (op) {
      this.model.filename = this.model.file.name
      this.model.hash = this.getHash()
      delete this.model.file
      return this.model.post()
    }
  }


  /**
   * @alias module:resourceFields.Event
   * @extends module:resourceFields.ResourceForm
   */
  class MoveOnDocument extends EventWithMultipleDevices {
    constructor (model, ...fields) {
      const def = {namespace: 'r.tradedocument'}
      super(model,
        new f.Number('weight', def),
        new f.Upload('file', {
          accept: '*/*',
          multiple: false,
          readAs: 'readAsArrayBuffer',
          required: true,
          namespace: 'r.tradedocument',
          expressions: {
            disabled: 'form.status.loading'
          }
        }),
        ...fields
	      )
    }

    getHash () {
      return JSSHA3.sha3_256(this.model.file.data)
    }

    _submit (op) {
      this.model.container_to = this.getHash()
      delete this.model.file
      return this.model.post()
    }
  }



  return {
    ResourceForm: ResourceForm,
    Event: Event,
    EventWithMultipleDevices: EventWithMultipleDevices,
    Recycling: Recycling,
    Use: Use,
    Refurbish: Refurbish,
    Management: Management,
    ToPrepare: ToPrepare,
    Delete: Delete,
    Prepare: Prepare,
    Allocate: Allocate,
    Deallocate: Deallocate,
    ToRepair: ToRepair,
    DataWipe: DataWipe,
    Ready: Ready,
    ToDisposeProduct: ToDisposeProduct,
    Receive: Receive,
    MakeAvailable: MakeAvailable,
    Rent: Rent,
    Trade: Trade,
    Confirm: Confirm,
    Revoke: Revoke,
    ConfirmRevoke: ConfirmRevoke,
    ConfirmDocument: ConfirmDocument,
    RevokeDocument: RevokeDocument,
    ConfirmRevokeDocument: ConfirmRevokeDocument,
    TradeDocument: TradeDocument,
    MoveOnDocument: MoveOnDocument,
  }
}

module.exports = resourceFields
