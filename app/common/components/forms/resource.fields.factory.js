/**
 * @module resourceFields
 * IMPORTANT: we are using the formly library for creating forms http://angular-formly.com/
 */

/**
 * @param {module:fields} fields
 * @param {module:enums} enums
 */
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
      this.fields.splice(1, 0, devices)
    }
  }

  /**
   * @alias module:resourceFields.ToPrepare
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class ToPrepare extends EventWithMultipleDevices {
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
   * TODO new-trade: remove? 
   * @alias module:resourceFields.Transferred
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class Transferred extends EventWithMultipleDevices {
  }

  /** TODO new-trade: add fields for trade here */
  class Trade extends EventWithMultipleDevices {
    constructor (model, ...fields) {
      super(model, ...fields)
      const to = model.userTo ? 
        new f.StringReadOnly('to', {defaultValue: model.userTo.id, namespace: 'r.to'})
        : new f.String('to', {namespace: 'r.to'})

      const from = model.userFrom ? 
        new f.StringReadOnly('from', {defaultValue: model.userfrom.id, namespace: 'r.from'})
        : new f.String('from', {namespace: 'r.from'})
     
      this.fields.splice(1, 0, to)
      this.fields.splice(1, 0, from)
    }
  }

  /**
   * @alias module:resourceFields.Rent
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class Rent extends EventWithMultipleDevices {
  }

  /**
   * TODO new-trade: remove? 
   * @alias module:resourceFields.CancelTrade
   * @extends module:resourceFields.EventWithMultipleDevices
   * @deprecated
   */
  class CancelTrade extends EventWithMultipleDevices {
  }
  
  /**
   * TODO new-trade: change to ConfirmTrade
   * @alias module:resourceFields.InitTransfer
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class InitTransfer extends EventWithMultipleDevices {
    constructor (model, ...fields) {
      super(model, ...fields)
      const receiver = new f.String('receiver', {namespace: 'r.receiver'})
      this.fields.splice(1, 0, receiver)
    }
  }

  /**
   * TODO new-trade: remove this form
   * @alias module:resourceFields.AcceptTransfer
   * @extends module:resourceFields.EventWithMultipleDevices
   */
  class AcceptTransfer extends EventWithMultipleDevices {
    constructor (model, ...fields) {
      super(model, ...fields)
      fields.op = this.constructor.PATCH
    }
  }

  /** TODO new-trade: add RevokeTrade */
  /** TODO new-trade: add ConfirmRevokeTrade */

  return {
    ResourceForm: ResourceForm,
    Event: Event,
    EventWithMultipleDevices: EventWithMultipleDevices,
    ToPrepare: ToPrepare,
    Prepare: Prepare,
    Allocate: Allocate,
    Deallocate: Deallocate,
    ToRepair: ToRepair,
    Ready: Ready,
    ToDisposeProduct: ToDisposeProduct,
    Receive: Receive,
    MakeAvailable: MakeAvailable,
    Transferred: Transferred,
    Rent: Rent,
    Trade: Trade,
    CancelTrade: CancelTrade,
    InitTransfer: InitTransfer,
    AcceptTransfer: AcceptTransfer
  }
}

module.exports = resourceFields
