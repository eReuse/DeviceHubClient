const utils = require('./../utils')
const enums = require('./../enums')
const inflection = require('inflection')

/**
 * Resources module
 * @module resources
 */

function resourceFactory (Restangular, CONSTANTS, $filter) {
  const cache = {
    /** @type {Object.<int, Device>} */
    devices: {},
    /** @type {Object.<string, Lot>} */
    lots: {}
  }

  /**
   * A Devicehub resource. This mimics Devicehub's schema.Thing.
   *
   * This contains the model data and it is the object that
   * restangular augments adding get / post; etc methods.
   *
   * Please look at the Devicehub counterpart to learn about
   * the fields, etc.
   *
   */
  class Thing {
    constructor (sameAs = null, updated = null, created = null) {
      /**
       * @type {URL}
       */
      this.sameAs = sameAs
      /**
       * @type {Date}
       */
      this.updated = updated ? new Date(updated) : null
      /**
       * @type {Date}
       */
      this.created = created ? new Date(created) : null
    }

    get createdHuman () {
      return $filter('date')(this.created, 'shortDate')
    }

    /**
     * The type of the event.
     * @returns {string}
     */
    static get type () {
      return this.name
    }

    /**
     * The type of the event.
     * @returns {string}
     */
    get type () {
      return this.constructor.type
    }

    get typeHuman () {
      return utils.Naming.humanize(this.type)
    }

    /**
     * A human way of addressing the resource.
     * @returns {string}
     */
    get title () {
      return utils.Naming.humanize(this.type)
    }

    /**
     * HTML describing the resource.
     * @return {string}
     */
    get teaser () {
      return new Teaser(
        this.type,
        this.title,
        '',
        this.created
      )
    }

    static get icon () {
      throw Error('Not implemented')
    }

    get icon () {
      return this.constructor.icon
    }

    /**
     * Returns a deep copy of the thing.
     */
    copy () {
      return utils.copy(this)
    }

    /**
     * Creates an instance of this class from a generic JS object,
     * parsing all properties, etc.
     */
    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created)
    }

    /** The URL path to access the resource. */
    static get basePath () {
      throw Error('Not implemented error.')
    }

    /** A connection to Devicehub. Ex. myThing.server.post() */
    static get server () {
      return RestangularConfigurerResource.service(this.basePath)
    }

    /** A connection to Devicehub. Ex. myThing.server.post() */
    get server () {
      return this.constructor.server
    }

    post () {
      return this.server.post(this)
    }

    toString () {
      return this.title
    }

    valueOf () {
      return this.toString()
    }

    /**
     * sets a relationship (ex. Component.parent) when initializing
     * component. This takes care of instantiating the other end
     * of the relationship (ex. new Computer()) if the passed-in
     * object is not a primitive (ex. the ID of the computer) or
     * null / undefined.
     * @param {object} other
     * @return {*|Thing}
     */
    static _relationship (other) {
      let ret = other
      let hasType = false
      try {
        hasType = 'type' in other
      } catch (e) {
      }
      if (hasType) {
        if (other instanceof Thing) ret = other
        else ret = resourceClass(other.type).fromObject(other)
      }
      return ret
    }

    static _relationships (others) {
      return others.map(other => this._relationship(other))
    }
  }

  /**
   * Class representing a device
   * @alias module:resources.Device
   * @extends module:resources.Thing
   */
  class Device extends Thing {
    constructor (sameAs, updated, created, id = null, hid = null, tags = [], model = null, manufacturer = null, serialNumber = null, weight = null, width = null, height = null, depth = null, events = [], problems = [], url = null, lots = [], rate = null, price = null, trading = null, physical = null, physicalPossessor = null, productionDate = null, working = []) {
      super(sameAs, updated, created)
      if (id) cache.devices[id] = this
      /** @type {int} */
      this.id = id
      /** @type {?string} */
      this.hid = hid
      /** @type {Tag[]} */
      this.tags = this.constructor._relationships(tags)
      /** @type {?string} */
      this.model = model ? inflection.titleize(model) : null
      /** @type {?string} */
      this.manufacturer = manufacturer ? inflection.titleize(manufacturer) : null
      /** @type {?string} */
      this.serialNumber = serialNumber ? serialNumber.toUpperCase() : null
      /** @type {string} */
      this.weight = weight
      /** @type {string} */
      this.width = width
      /** @type {string} */
      this.height = height
      /** @type {string} */
      this.depth = depth
      /** @type {Event[]} */
      this.events = this.constructor._relationships(events)
      /** @type {Event[]} */
      this.problems = this.constructor._relationships(problems)
      /** @type {string} */
      this.url = url ? new URL(url, window.CONSTANTS.url) : null
      /** @type {Lot[]} */
      this.lots = lots
      /** @type {Rate} */
      this.rate = this.constructor._relationship(rate)
      /** @type {Price} */
      this.price = this.constructor._relationship(price)
      /** @type {string} */
      this.trading = trading
      /** @type {string} */
      this.physical = physical
      /** @type {string} */
      this.physicalPossessor = physicalPossessor
      /** @type {string} */
      this.productionDate = productionDate
      /** @type {Event} */
      this.working = this.constructor._relationships(working)
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.hid, data.tags, data.model, data.manufacturer, data.serialNumber, data.weight, data.width, data.height, data.depth, data.events, data.problems, data.url, data.lots, data.rate, data.price, data.trading, data.physical, data.physicalPossessor, data.productionDate, data.working)
    }

    static get icon () {
      return ''
    }

    get server () {
      return super.server('/devices/')
    }

    static get basePath () {
      return '/devices/'
    }

    /**
     * A human description of the state of the device.
     * @returns {string}
     */
    get status () {
      let status = this.physical || this.trading || 'Registered'
      if (this.physical && this.trading) {
        status = `${this.trading} / ${this.physical}`
      }
      return utils.Naming.humanize(status)
    }

    get title () {
      const tags = this.tags.length ? ` ${this.tags[0]}` : ''
      return `${utils.Naming.humanize(this.type)} ${this.model}${tags}`
    }

    get teaser () {
      return new Teaser(
        this.type,
        this.title,
        `${this.model} (${this.manufacturer})`,
        this.updated
      )
    }
  }

  class Computer extends Device {
    constructor (sameAs, updated, created, id, hid, tags, model, manufacturer, serialNumber, weight, width, height, depth, events, problems, url, lots, rate, price, trading, physical, physicalPossessor, productionDate, working, components = [], chassis = null, ramSize = null, dataStorageSize = null, processorModel = null, graphicCardModel = null, networkSpeeds = [], privacy = []) {
      super(sameAs, updated, created, id, hid, tags, model, manufacturer, serialNumber, weight, width, height, depth, events, problems, url, lots, rate, price, trading, physical, physicalPossessor, productionDate, working)
      /** @type {Components[]} */
      this.components = components ? components.map(c => Component.fromObject(c)) : []
      this.chassis = chassis
      this.ramSize = ramSize
      this.datStorageSize = dataStorageSize
      this.processorModel = processorModel
      this.graphicCardModel = graphicCardModel
      this.networkSpeeds = networkSpeeds
      this.privacy = this.constructor._relationships(privacy)
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.hid, data.tags, data.model, data.manufacturer, data.serialNumber, data.weight, data.width, data.height, data.depth, data.events, data.problems, data.url, data.lots, data.rate, data.price, data.trading, data.physical, data.physicalPossessor, data.productionDate, data.working, data.components, data.chassis, data.ramSize, data.StorageSize, data.processorModel, data.graphicCardModel, data.networkSpeeds, data.privacy)
    }

    static get icon () {
      return 'fa-building'
    }
  }

  class ComputerMonitor extends Device {
    static get icon () {
      return 'fa-desktop'
    }
  }

  class Desktop extends Computer {
  }

  class Laptop extends Computer {
    static get icon () {
      return 'fa-laptop'
    }
  }

  /**
   * @alias module:resources.Component
   * @extends module:resources.Device
   */
  class Component extends Device {
    constructor (sameAs, updated, created, id, hid, tags, model, manufacturer, serialNumber, weight, width, height, depth, events, problems, url, lots, rate, price, trading, physical, physicalPossessor, productionDate, working, parent = null) {
      super(sameAs, updated, created, id, hid, tags, model, manufacturer, serialNumber, weight, width, height, depth, events, problems, url, lots, rate, price, trading, physical, physicalPossessor, productionDate, working)
      this._parent = parent
    }

    get parent () {
      return _.get(cache.devices, this._parent, this._parent)
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.hid, data.tags, data.model, data.manufacturer, data.serialNumber, data.weight, data.width, data.height, data.depth, data.events, data.problems, data.url, data.lots, data.rate, data.price, data.trading, data.physical, data.physicalPossessor, data.productionDate, data.working, data.parent)
    }

    static get icon () {
      return 'fa-microchip'
    }

    get title () {
      return `${utils.Naming.humanize(this.type)} ${this.model} ${this.serialNumber}`
    }
  }

  /**
   * Class representing an event.
   * @alias module:resources.Event
   * @extends module:resources.Thing
   */
  class Event extends Thing {
    constructor (sameAs, updated, created, id = null, name = null, closed = null, severity = null, description = null, startTime = null, endTime = null, snaphsot = null, agent = null, author = null, components = null, parent = null, url = null) {
      super(sameAs, updated, created)
      /** @type {?string} */
      this.id = id
      /** @type {?string} */
      this.name = name
      /** @type {?boolean} */
      this.closed = closed
      /** @type {?Severity} */
      this.severity = severity ? new enums.Severity(severity) : null
      /** @type {?string} */
      this.description = description
      /** @type {?Date} */
      this.startTime = startTime ? new Date(startTime) : null
      /** @type {?Date} */
      this.endTime = endTime ? new Date(endTime) : null
      /** @type {?Snapshot} */
      this.snaphsot = snaphsot
      /** @type {?Agent} */
      this.agent = agent
      /** @type {?User} */
      this.author = author
      this._components = components
      this._parent = parent
      /** @type {?URL} */
      this.url = url ? new URL(url, CONSTANTS.url) : null
    }

    /**
     *
     * @return {Component[]}
     */
    get components () {
      return this._components.map(id => _.get(cache.devices, id, id))
    }

    /**
     *
     * @return {Computer}
     */
    get parent () {
      return _.get(cache.devices, this._parent, this._parent)
    }

    static get icon () {
      return 'fa-bookmark'
    }

    static get basePath () {
      return '/events/'
    }

    /**
     * A way of addressing the event without exposing the device.
     * @return {string}
     */
    get title () {
      return `${this.typeHuman}: ${this.severity}`
    }

    /**
     * HTML describing the event exposing the device.
     */
    get teaser () {
      return super.teaser
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url)
    }
  }

  class EventWithMultipleDevices extends Event {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, devices = []) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url)
      this._devices = devices // todo we assume we only have a list of
                              //  ids here as we don't directly require events as of now
    }

    get devices () {
      return this._devices.map(id => _.get(cache.devices, id, id))
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.devices)
    }
  }

  class EventWithOneDevice extends Event {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url)
      this._device = device // todo see todo in multiple devices
    }

    get device () {
      return _.get(cache.devices, this._device, this._device)
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device)
    }
  }

  class Add extends EventWithOneDevice {
  }

  class Remove extends EventWithOneDevice {
  }

  class EraseBasic extends EventWithOneDevice {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, steps = [], standards = [], certificate = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device)
      this.steps = steps
      this.standards = standards.map(std => new enums.ErasureStandard(std))
      this.certificate = certificate ? new URL(certificate, CONSTANTS.url) : null
    }

    get standardsHuman () {
      return this.standards.length ? this.standards : 'Non-standard'
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.steps, data.standards, data.certificate)
    }

    get title () {
      return `${super.title} — ${this.constructor.method} ${this.standardsHuman}`
    }
  }

  EraseBasic.method = 'Shred'

  class EraseSectors extends EraseBasic {
  }

  EraseSectors.method = 'Badblocks'

  class ErasePhysical extends EraseBasic {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, steps, standards, certificate, method = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, steps, standards, url)
      this.method = method
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.steps, data.standards, data.certificate, data.method)
    }
  }

  class Step extends Thing {
    constructor (sameAs, updated, created, startTime = null, endTime = null, severity = null) {
      super(sameAs, updated, created)
      this.startTime = startTime ? new Date(startTime) : null
      this.endTime = endTime ? new Date(endTime) : null
      this.severity = severity
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.startTime, data.endTime, data.severity)
    }
  }

  class StepZero extends Step {
  }

  class StepRandom extends Step {
  }

  class Rate extends EventWithOneDevice {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, rating = null, software = null, version = null, appearance = null, functionality = null, ratingRange = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device)
      this.rating = rating
      this.software = software
      this.version = version
      this.appearance = appearance
      this.functionality = functionality
      this.ratingRange = ratingRange
      this.ratingRangeHuman = ratingRange ? utils.Naming.humanize(ratingRange) : null
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.rating, data.software, data.version, data.appearance, data.functionality, data.ratingRange)
    }

    get title () {
      return this.ratingRangeHuman
    }
  }

  class IndividualRate extends Rate {
  }

  class ManualRate extends IndividualRate {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, rating, software, version, appearance, functionality, ratingRange, appearanceRange = null, functionalityRange = null, labelling = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, rating, software, version, appearance, functionality, ratingRange)
      this.appearanceRange = appearanceRange ? new enums.AppearanceRange(appearanceRange) : null
      this.functionalityRange = functionalityRange ? new enums.FunctionalityRange(functionalityRange) : null
      this.labelling = labelling
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.rating, data.software, data.version, data.appearance, data.functionality, data.ratingRange, data.appearanceRange, data.functionalityRange, data.labelling)
    }
  }

  class WorkbenchRate extends ManualRate {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, rating, software, version, appearance, functionality, ratingRange, appearanceRange, functionalityRange, labelling, processor = null, ram = null, dataStorage = null, graphicCard = null, bios = null, biosRange = null, dataStorageRange = null, ramRange = null, processorRange = null, graphicCardRange = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, rating, software, version, appearance, functionality, ratingRange, appearanceRange, functionalityRange, labelling)
      this.processor = processor
      this.ram = ram
      this.dataStorage = dataStorage
      this.graphicCard = graphicCard
      this.bios = bios
      this.biosRange = biosRange
      this.dataStorageRange = dataStorageRange
      this.dataStorageRangeHuman = dataStorageRange ? utils.Naming.humanize(dataStorageRange) : null
      this.ramRange = ramRange
      this.ramRangeHuman = ramRange ? utils.Naming.humanize(ramRange) : null
      this.processorRange = processorRange
      this.processorRangeHuman = processorRange ? utils.Naming.humanize(processorRange) : null
      this.graphicCardRange = graphicCardRange
      this.graphicCardRangeHuman = graphicCardRange ? utils.Naming.humanize(graphicCardRange) : null
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.rating, data.software, data.version, data.appearance, data.functionality, data.ratingRange, data.appearanceRange, data.functionalityRange, data.labelling, data.processor, data.ram, data.dataStorage, data.graphicCard, data.bios, data.biosRange, data.dataStorageRange, data.ramRange, data.processorRange, data.graphicCardRange)
    }
  }

  class AggregateRate extends Rate {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, rating, software, version, appearance, functionality, ratingRange, workbench = null, manual = null, processor = null, ram = null, dataStorage = null, graphicCard = null, bios = null, biosRange = null, appearanceRange = null, functionalityRange = null, labelling = null, dataStorageRange = null, ramRange = null, processorRange = null, graphicCardRange = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, rating, software, version, appearance, functionality, ratingRange)
      this.workbench = workbench
      this.manual = manual
      this.processor = processor
      this.ram = ram
      this.dataStorage = dataStorage
      this.graphicCard = graphicCard
      this.bios = bios
      this.biosRange = biosRange
      this.appearanceRange = appearanceRange ? new enums.AppearanceRange(appearanceRange) : null
      this.functionalityRange = functionalityRange ? new enums.FunctionalityRange(functionalityRange) : null
      this.labelling = labelling
      this.dataStorageRange = dataStorageRange
      this.dataStorageRangeHuman = dataStorageRange ? utils.Naming.humanize(dataStorageRange) : null
      this.ramRange = ramRange
      this.ramRangeHuman = ramRange ? utils.Naming.humanize(ramRange) : null
      this.processorRange = processorRange
      this.processorRangeHuman = processorRange ? utils.Naming.humanize(processorRange) : null
      this.graphicCardRange = graphicCardRange
      this.graphicCardRangeHuman = graphicCardRange ? utils.Naming.humanize(graphicCardRange) : null
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.rating, data.software, data.version, data.appearance, data.functionality, data.ratingRange, data.workbench, data.manual, data.processor, data.ram, data.dataStorage, data.graphicCard, data.bios, data.biosRange, data.appearanceRange, data.functionalityRange, data.labelling, data.dataStorageRange, data.ramRange, data.processorRange, data.graphicCardRange)
    }
  }

  class Price extends EventWithOneDevice {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, currency, price, software, version, rating) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device)
      this.currency = currency
      this.price = price
      this.software = software
      this.version = version
      this.rating = rating
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.software, data.version, data.rating)
    }
  }

  class EreusePrice extends Price {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, warranty2 = null, refurbisher = null, retailer = null, platform = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device)
      this.warranty2 = warranty2
      this.refurbisher = refurbisher
      this.retailer = retailer
      this.platform = platform
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.software, data.version, data.rating, data.warranty2, data.refurbisher, data.retailer, data.platform)
    }
  }

  class Install extends EventWithOneDevice {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, elapsed = null, address = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device)
      this.elapsed = elapsed
      this.address = address
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.elapsed, data.address)
    }
  }

  class Snapshot extends EventWithOneDevice {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, uuid = null, software = null, version = null, events = null, expectedEvents = null, elapsed = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device)
      this.uuid = uuid
      this.software = software
      this.version = version
      this.events = events
      this.expectedEvents = expectedEvents
      this.elapsed = elapsed
      this._components = components
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.uuid, data.software, data.version, data.events, data.expectedEvents, data.elapsed)
    }

    get title () {
      return `${super.title} — ${this.software} ${this.version}`
    }
  }

  class Test extends EventWithOneDevice {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, elapsed = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device)
      this.elapsed = elapsed
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.elapsed)
    }
  }

  class TestDataStorage extends Test {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, elapsed, length = null, status = null, lifetime = null, assessment = null, reallocatedSectorCount = null, powerCycleCount = null, reportedUncorrectableErrors = null, commandTimeout = null, currentPendingSectorCount = null, offlineUncorrectable = null, remainingLifetimePercentage = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, elapsed)
      this.length = length
      this.status = status
      /**
       * Lifetime in hours.
       * @type {integer}
       */
      this.lifetime = lifetime
      this.assessment = assessment
      this.reallocatedSectorCount = reallocatedSectorCount
      this.powerCycleCount = powerCycleCount
      this.reportedUncorrectableErrors = reportedUncorrectableErrors
      this.commandTimeout = commandTimeout
      this.currentPendingSectorCount = currentPendingSectorCount
      this.offlineUncorrectable = offlineUncorrectable
      this.remainingLifetimePercentage = remainingLifetimePercentage
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.elapsed, data.length, data.status, data.lifetime, data.assessment, data.reallocatedSectorCount, data.powerCycleCount, data.reportedUncorrectableErrors, data.commandTimeout, data.currentPendingSectorCount, data.offline, data.remainingLifetimePercentage)
    }

    statusHuman () {
      let status = utils.Naming.humanize(this.status)
      if (this.severity.is(this.severity.constructor.Warning)) {
        status = 'Data storage can die soon.'
      }
      return `${this.severity}: ${status}`
    }

    lifetimeHuman () {
      return this.lifetime
        ? ` Lifetime of ${$filter('number')(this.lifetime / (24 * 365), 1)} years.`
        : ''
    }

    get title () {
      return `${this.typeHuman} — ${this.statusHuman()}`
    }

    get teaser () {
      return new Teaser(
        this.type,
        super.title,
        `${this.statusHuman()} At ${this.device}. ${this.lifetimeHuman()}`,
        this.created,
        this.severity
      )
    }
  }

  class StressTest extends Test {
  }

  class Benchmark extends EventWithOneDevice {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, elapsed = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device)
      this.elapsed = elapsed
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.elapsed)
    }
  }

  class BenchmarkDataStorage extends Benchmark {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, elapsed, readSpeed = null, writeSpeed = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, elapsed)
      this.readSpeed = readSpeed
      this.writeSpeed = writeSpeed
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.elapsed, data.readSpeed, data.writeSpeed)
    }
  }

  class BenchmarkWithRate extends Benchmark {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, elapsed, rate = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, device, elapsed)
      this.rate = rate
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.device, data.elapsed, data.rate)
    }
  }

  class BenchmarkProcessor extends BenchmarkWithRate {
  }

  class BenchmarkProcessorSysbench extends BenchmarkProcessor {
  }

  class BenchmarkRamSysbench extends BenchmarkWithRate {
  }

  class ToRepair extends EventWithMultipleDevices {
  }

  class Repair extends EventWithMultipleDevices {
  }

  class ReadyToUse extends EventWithMultipleDevices {
    static get icon () {
      return 'fa-check'
    }
  }

  class ToPrepare extends EventWithMultipleDevices {
  }

  class Prepare extends EventWithMultipleDevices {
  }

  class Organize extends EventWithMultipleDevices {
  }

  class Reserve extends Organize {
  }

  class CancelReservation extends Organize {
  }

  class Trade extends EventWithMultipleDevices {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, devices, shippingDate = null, invoiceNumber = null, price = null, to = null, confirms = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, devices)
      this.shippingDate = shippingDate
      this.invoiceNumber = invoiceNumber
      this.price = price
      this.to = to
      this.confirms = confirms
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.devices, data.shippingDate, data.invoiceNumber, data.price, data.to, data.confirms)
    }
  }

  class Sell extends Trade {
  }

  class Donate extends Trade {
  }

  class CancelTrade extends Trade {
  }

  class ToDisposeProduct extends Trade {
  }

  class DisposeProduct extends Trade {
  }

  class Receive extends EventWithMultipleDevices {
    constructor (sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, devices, role = null) {
      super(sameAs, updated, created, id, name, closed, severity, description, startTime, endTime, snaphsot, agent, author, components, parent, url, devices)
      this.role = role
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.closed, data.severity, data.description, data.startTime, data.endTime, data.snaphsot, data.agent, data.author, data.components, data.parent, data.url, data.devices, data.role)
    }
  }

  class Tag extends Thing {
    constructor (sameAs, updated, created, id = null, org = null, secondary = null, device = null) {
      super(sameAs, updated, created)
      this.id = id
      this.org = org
      this.secondary = secondary
      this.device = this.constructor._relationship(device)
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.org, data.secondary, data.device)
    }

    get title () {
      return !this.org || this.id.length <= this.org.length ? this.id : this.org
    }
  }

  /**
   * @alias module:resources.Lot
   */
  class Lot extends Thing {
    constructor (sameAs, updated, created, id = null, name = null, description = null, closed = null, devices = [], children = [], parents = [], url = null) {
      super(sameAs, updated, created)
      this.sameAs = sameAs
      this.updated = updated
      this.created = created
      this.id = id
      this.name = name
      this.description = description
      this.closed = closed
      this.devices = devices
      this.children = children
      this.parents = parents
      this.url = url
    }

    static get basePath () {
      return '/lots/'
    }

    static fromObject (data) {
      return new this(data.sameAs, data.updated, data.created, data.id, data.name, data.description, data.closed, data.devices, data.children, data.parents, data.url)
    }
  }

  class ResourceList extends Array {
    /**
     * @param {Thing[]} items
     * @param {object} pagination
     * @param {string} url
     */
    constructor (items, pagination, url) {
      super(...items)
      this.pagination = pagination
      console.assert(this.pagination.page)
      console.assert(this.pagination.perPage)
      console.assert(this.pagination.total)
      console.assert('previous' in this.pagination)
      console.assert('next' in this.pagination)
      this.url = url
    }

    /**
     *
     * @param {object[]} items
     * @param {object} pagination
     * @param {string} url
     */
    static fromServer (items, pagination, url) {
      const things = items.map(x => resourceClass(x.type).fromObject(x))
      return new this(things, pagination, url)
    }
  }

  /**
   * @alias module:resources.LotNode
   */
  class LotNode {
    constructor (id = null, nodes = []) {
      /** @type {string} */
      this.id = id
      /** @type {module:resources.LotNode[]} */
      this.nodes = nodes
      /**
       * Is the node visible
       * @type {boolean}
       * */
      this.isVisible = true
    }

    /**
     * @return {module:resources.Lot}
     */
    get lot () {
      const lot = cache.lots[this.id]
      console.assert(lot, '%s lot is not in cache.', this.id)
      return lot
    }

    hasText (text) {
      console.assert(_.isString(text), 'Can only search strings, not %s', text)
      return _.includes(this.lot.name.toLowerCase(), text.toLowerCase())
    }
  }

  class Lots extends Array {
    constructor (items, tree, url) {
      super(...items.map(x => resourceClass(x.type).fromObject(x)))
      this.tree = this._trees(tree)
      this.url = url

      cache.lots = {}
      this.forEach(lot => {
        cache.lots[lot.id] = lot
      })
    }

    _trees (objs) {
      return objs.map(obj => new LotNode(obj.id, this._trees(obj.nodes)))
    }
  }

  /**
   * Returns the subclass of Thing that represents type.
   * @param {string} type
   * @returns {Thing}
   */
  function resourceClass (type) {
    const cls = resources[type]
    if (!cls) throw new TypeError(`${type} is not a valid Resource.`)
    return cls
  }

  /** Restangular for resources */
  const RestangularConfigurerResource = Restangular.withConfig(RestangularProvider => {
    RestangularProvider.addResponseInterceptor((data, operation, ...other) => {
      let res
      if ('tree' in other[2].data) {
        console.assert(operation === 'getList')
        res = new Lots(data.items, other[2].data.tree, other[2].data.url)
      } else if ('items' in data) {
        console.assert(operation === 'getList')
        res = ResourceList.fromServer(data.items, data.pagination, data.url)
      } else {
        console.assert(operation !== 'getList')
        res = resourceClass(data)
      }
      return res
    })
  })

  class Teaser {
    constructor (type, title, description, date, severity) {
      this.type = utils.Naming.humanize(type)
      this.title = title
      this.description = description
      this.date = $filter('date')(date, 'shortDate')
      this.severity = severity
    }
  }

  const resources = /** @alias module:resources */{
    Thing: Thing,
    Device: Device,
    Computer: Computer,
    ComputerMonitor: ComputerMonitor,
    Desktop: Desktop,
    Laptop: Laptop,
    Component: Component,
    Event: Event,
    EventWithMultipleDevices: EventWithMultipleDevices,
    EventWithOneDevice: EventWithOneDevice,
    Add: Add,
    Remove: Remove,
    EraseBasic: EraseBasic,
    EraseSectors: EraseSectors,
    ErasePhysical: ErasePhysical,
    Step: Step,
    StepZero: StepZero,
    StepRandom: StepRandom,
    Rate: Rate,
    IndividualRate: IndividualRate,
    ManualRate: ManualRate,
    WorkbenchRate: WorkbenchRate,
    AggregateRate: AggregateRate,
    Price: Price,
    EreusePrice: EreusePrice,
    Install: Install,
    Snapshot: Snapshot,
    Test: Test,
    TestDataStorage: TestDataStorage,
    StressTest: StressTest,
    Benchmark: Benchmark,
    BenchmarkDataStorage: BenchmarkDataStorage,
    BenchmarkWithRate: BenchmarkWithRate,
    BenchmarkProcessor: BenchmarkProcessor,
    BenchmarkProcessorSysbench: BenchmarkProcessorSysbench,
    BenchmarkRamSysbench: BenchmarkRamSysbench,
    ToRepair: ToRepair,
    Repair: Repair,
    ReadyToUse: ReadyToUse,
    ToPrepare: ToPrepare,
    Prepare: Prepare,
    Organize: Organize,
    Reserve: Reserve,
    CancelReservation: CancelReservation,
    Trade: Trade,
    Sell: Sell,
    Donate: Donate,
    CancelTrade: CancelTrade,
    ToDisposeProduct: ToDisposeProduct,
    DisposeProduct: DisposeProduct,
    Receive: Receive,
    Tag: Tag,
    Lot: Lot,
    LotNode: LotNode,
    ResourceList: ResourceList,
    Lots: Lots,
    resourceClass: resourceClass
  }
  return resources
}

module.exports = resourceFactory
