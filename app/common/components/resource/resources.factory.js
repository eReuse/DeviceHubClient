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
    constructor (args = {}) {
      this.define(args)
    }

    define ({sameAs = null, updated = null, created = null}) {
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
      return new this(data)
    }

    /** The URL path to access the resource. */
    static get basePath () {
      throw Error('Not implemented error.')
    }

    /** A connection to Devicehub. Ex. myThing.server.post() */
    static get server () {
      console.assert(resources.RestangularConfigurerResource,
        'No credentials for accessing Dhub; perform first login.')
      return resources.RestangularConfigurerResource.service(this.basePath)
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
    define ({id = null, hid = null, tags = [], model = null, manufacturer = null, serialNumber = null, weight = null, width = null, height = null, depth = null, events = [], problems = [], url = null, lots = [], rate = null, price = null, trading = null, physical = null, physicalPossessor = null, productionDate = null, working = [], ...rest}) {
      super.define(rest)
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

    static fromObject (data) {
      if (data.id && data.id in cache.lots) cache.devices[data.id].define(data)
      else {
        const device = super.fromObject(data)
        cache.devices[device.id] = device
        return device
      }
      return cache.lots[data.id]
    }
  }

  /**
   * @alias module:resources.Computer
   * @extends module:resources.Device
   */
  class Computer extends Device {
    define ({components = [], chassis = null, ramSize = null, dataStorageSize = null, processorModel = null, graphicCardModel = null, networkSpeeds = [], privacy = [], ...rest}) {
      /** @type {Components[]} */
      super.define(rest)
      this.components = components ? components.map(c => Component.fromObject(c)) : []
      this.chassis = chassis
      this.ramSize = ramSize
      this.datStorageSize = dataStorageSize
      this.processorModel = processorModel
      this.graphicCardModel = graphicCardModel
      this.networkSpeeds = networkSpeeds
      this.privacy = this.constructor._relationships(privacy)
    }

    static get icon () {
      return 'fa-building'
    }
  }

  /**
   * @alias {module:resources.ComputerMonitor}
   * @extends {module:resources.Device}
   */
  class ComputerMonitor extends Device {
    static get icon () {
      return 'fa-desktop'
    }
  }

  /**
   * @alias {module:resources.Desktop}
   * @extends {module:resources.Computer}
   */
  class Desktop extends Computer {
  }

  /**
   * @alias {module:resources.Laptop}
   * @extends {module:resources.Computer}
   */
  class Laptop extends Computer {
    static get icon () {
      return 'fa-laptop'
    }
  }

  /**
   * @alias {module:resources.Server}
   * @extends {module:resources.Computer}
   */
  class Server extends Computer {
    static get icon () {
      return 'fa-server'
    }
  }

  /**
   * @alias {module:resources.Mobile}
   * @extends {module:resources.Device}
   */
  class Mobile extends Device {
    define ({imei = null, meid = null, ...rest}) {
      super.define(rest)
      this.imei = imei
      this.meid = meid
    }
  }

  /**
   * @alias {module:resources.Smartphone}
   * @extends {module:resources.Mobile}
   */
  class Smartphone extends Mobile {
    static get icon () {
      return 'fa-mobile'
    }
  }

  /**
   * @alias {module:resources.Tablet}
   * @extends {module:resources.Mobile}
   */
  class Tablet extends Mobile {
    static get icon () {
      return 'fa-tablet'
    }
  }

  /**
   * @alias {module:resources.Cellphone}
   * @extends {module:resources.Mobile}
   */
  class Cellphone extends Mobile {
    static get icon () {
      return 'fa-mobile-alt'
    }
  }

  /**
   * @alias module:resources.Component
   * @extends module:resources.Device
   */
  class Component extends Device {
    define ({parent = null, ...rest}) {
      super.define(rest)
      this._parent = parent
    }

    get parent () {
      return _.get(cache.devices, this._parent, this._parent)
    }

    static get icon () {
      return 'fa-microchip'
    }

    get title () {
      return `${utils.Naming.humanize(this.type)} ${this.model} ${this.serialNumber}`
    }
  }

  /**
   * @alias {module:resources.GraphicCard}
   * @extends {module:resources.Component}
   */
  class GraphicCard extends Component {
    define ({memory = null, ...rest}) {
      super.define(rest)
      this.memory = memory
    }

    static get icon () {
      return 'fa-paint-brush'
    }
  }

  /**
   * @alias {module:resources.DataStorage}
   * @extends {module:resources.Component}
   */
  class DataStorage extends Component {
    define ({size = null, privacy = null, ...rest}) {
      super.define(rest)
      this.size = size
      this.privacy = privacy
      this.interface = rest.interface || null
    }

    static get icon () {
      return 'fa-hdd'
    }
  }

  /**
   * @alias {module:resources.HardDrive}
   * @extends {module:resources.DataStorage}
   */
  class HardDrive extends DataStorage {
  }

  /**
   * @alias {module:resources.SolidStateDrive}
   * @extends {module:resources.HardDrive}
   */
  class SolidStateDrive extends HardDrive {
  }

  /**
   * @alias {module:resources.Motherboard}
   * @extends {module:resources.Component}
   */
  class Motherboard extends Component {
    define ({slots = null, usb = null, firewire = null, serial = null, pcmcia = null, ...rest}) {
      super.define(rest)
      this.slots = slots
      this.usb = usb
      this.firewire = firewire
      this.serial = serial
      this.pcmcia = pcmcia
    }
  }

  /**
   * @alias {module:resources.NetworkAdapter}
   * @extends {module:resources.Component}
   */
  class NetworkAdapter extends Component {
    define ({speed = null, wireless = null, ...rest}) {
      super.define(rest)
      this.speed = speed
      this.wireless = wireless
    }

    static get icon () {
      return 'fa-ethernet'
    }
  }

  /**
   * @alias {module:resources.Processor}
   * @extends {module:resources.Component}
   */
  class Processor extends Component {
    define ({speed = null, cores = null, threads = null, address, ...rest}) {
      super.define(rest)
      this.speed = speed
      this.cores = cores
      this.threads = threads
      this.address = address
    }
  }

  /**
   * @alias {module:resources.RamModule}
   * @extends {module:resources.Component}
   */
  class RamModule extends Component {
    define ({size = null, speed = null, format = null, ...rest}) {
      super.define(rest)
      this.size = size
      this.speed = speed
      this.interface = rest.interface || null
      this.format = format
    }

    static get icon () {
      return 'fa-memory'
    }
  }

  /**
   * @alias {module:resources.SoundCard}
   * @extends {module:resources.Component}
   */
  class SoundCard extends Component {
    static get icon () {
      return 'fa-volume-up'
    }
  }

  /**
   * @alias {module:resources.Display}
   * @extends {module:resources.Component}
   */
  class Display extends Component {
  }

  /**
   * @alias {module:resources.ComputerAccessory}
   * @extends {module:resources.Device}
   */
  class ComputerAccessory extends Device {
    static get icon () {
      return 'fa-box'
    }
  }

  /**
   * @alias {module:resources.Mouse}
   * @extends {module:resources.ComputerAccessory}
   */
  class Mouse extends ComputerAccessory {
    static get icon () {
      return 'fa-mouse-pointer'
    }
  }

  /**
   * @alias {module:resources.MemoryCardReader}
   * @extends {module:resources.ComputerAccessory}
   */
  class MemoryCardReader extends ComputerAccessory {
    static get icon () {
      return 'fa-sd-card'
    }
  }

  /**
   * @alias {module:resources.SAI}
   * @extends {module:resources.ComputerAccessory}
   */
  class SAI extends ComputerAccessory {
    static get icon () {
      return 'fa-plug'
    }
  }

  /**
   * @alias {module:resources.Keyboard}
   * @extends {module:resources.ComputerAccessory}
   */
  class Keyboard extends ComputerAccessory {
    define ({layout = null, ...rest}) {
      super.define(rest)
      this.layout = layout
    }

    static get icon () {
      return 'fa-keyboard'
    }
  }

  /**
   * Class representing an event.
   * @alias module:resources.Event
   * @extends module:resources.Thing
   */
  class Event extends Thing {
    define ({id = null, name = null, closed = null, severity = null, description = null, startTime = null, endTime = null, snaphsot = null, agent = null, author = null, components = null, parent = null, url = null, ...rest}) {
      super.define(rest)
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
  }

  /**
   * @alias {resources:EventWithMultipleDevices}
   * @extends {resources:Event}
   */
  class EventWithMultipleDevices extends Event {
    define ({devices = [], ...rest}) {
      super.define(rest)
      this._devices = devices // todo we assume we only have a list of
                              //  ids here as we don't directly require events as of now
    }

    get devices () {
      return this._devices.map(id => _.get(cache.devices, id, id))
    }
  }

  /**
   * @alias {resources:EventWithOneDevice}
   * @extends {resources:Event}
   */
  class EventWithOneDevice extends Event {
    define ({device = null, ...rest}) {
      super.define(rest)
      this._device = device // todo see todo in multiple devices
    }

    get device () {
      return _.get(cache.devices, this._device, this._device)
    }
  }

  /**
   * @alias {resources:Add}
   * @extends {resources:EventWithOneDevice}
   */
  class Add extends EventWithOneDevice {
  }

  /**
   * @alias {resources:Remove}
   * @extends {resources:EventWithOneDevice}
   */
  class Remove extends EventWithOneDevice {
  }

  /**
   * @alias {resources:EraseBasic}
   * @extends {resources:EventWithOneDevice}
   */
  class EraseBasic extends EventWithOneDevice {
    define ({steps = [], standards = [], certificate = null, ...rest}) {
      super.define(rest)
      this.steps = steps
      this.standards = standards.map(std => new enums.ErasureStandard(std))
      this.certificate = certificate ? new URL(certificate, CONSTANTS.url) : null
    }

    get standardsHuman () {
      return this.standards.length ? this.standards : 'Non-standard'
    }

    get title () {
      return `${super.title} — ${this.constructor.method} ${this.standardsHuman}`
    }
  }

  EraseBasic.method = 'Shred'

  /**
   * @alias {resources:EraseSectors}
   * @extends {resources:EraseBasic}
   */
  class EraseSectors extends EraseBasic {
  }

  EraseSectors.method = 'Badblocks'

  /**
   * @alias {resources:ErasePhysical}
   * @extends {resources:EraseBasic}
   */
  class ErasePhysical extends EraseBasic {
    define ({method = null, ...rest}) {
      super.define(rest)
      this.method = method
    }
  }

  /**
   * @alias {resources:Step}
   * @extends {resources:Thing}
   */
  class Step extends Thing {
    define ({startTime = null, endTime = null, severity = null, ...rest}) {
      super.define(rest)
      this.startTime = startTime ? new Date(startTime) : null
      this.endTime = endTime ? new Date(endTime) : null
      this.severity = severity
    }
  }

  /**
   * @alias {resources:StepZero}
   * @extends {resources:Step}
   */
  class StepZero extends Step {
  }

  /**
   * @alias {resources:StepRandom}
   * @extends {resources:Step}
   */
  class StepRandom extends Step {
  }

  /**
   * @alias {resources:Rate}
   * @extends {resources:EventWithOneDevice}
   */
  class Rate extends EventWithOneDevice {
    define ({rating = null, software = null, version = null, appearance = null, functionality = null, ratingRange = null, ...rest}) {
      super.define(rest)
      this.rating = rating
      this.software = software
      this.version = version
      this.appearance = appearance
      this.functionality = functionality
      this.ratingRange = ratingRange
      this.ratingRangeHuman = ratingRange ? utils.Naming.humanize(ratingRange) : null
    }

    get title () {
      return this.ratingRangeHuman
    }
  }

  /**
   * @alias {resources:IndividualRate}
   * @extends {resources:Rate}
   */
  class IndividualRate extends Rate {
  }

  /**
   * @alias {resources:ManualRate}
   * @extends {resources:IndividualRate}
   */
  class ManualRate extends IndividualRate {
    define ({appearanceRange = null, functionalityRange = null, labelling = null, ...rest}) {
      super.define(rest)
      this.appearanceRange = appearanceRange ? new enums.AppearanceRange(appearanceRange) : null
      this.functionalityRange = functionalityRange ? new enums.FunctionalityRange(functionalityRange) : null
      this.labelling = labelling
    }
  }

  /**
   * @alias {resources:WorkbenchRate}
   * @extends {resources:ManualRate}
   */
  class WorkbenchRate extends ManualRate {
    define ({processor = null, ram = null, dataStorage = null, graphicCard = null, bios = null, biosRange = null, dataStorageRange = null, ramRange = null, processorRange = null, graphicCardRange = null, ...rest}) {
      super.define(rest)
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
  }

  /**
   * @alias {resources:AggregateRate}
   * @extends {resources:Rate}
   */
  class AggregateRate extends Rate {
    define ({workbench = null, manual = null, processor = null, ram = null, dataStorage = null, graphicCard = null, bios = null, biosRange = null, appearanceRange = null, functionalityRange = null, labelling = null, dataStorageRange = null, ramRange = null, processorRange = null, graphicCardRange = null, ...rest}) {
      super.define(rest)
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
  }

  /**
   * @alias {resources:Price}
   * @extends {resources:EventWithOneDevice}
   */
  class Price extends EventWithOneDevice {
    define ({currency, price, software, version, rating, ...rest}) {
      super.define(rest)
      this.currency = currency
      this.price = price
      this.software = software
      this.version = version
      this.rating = rating
    }

  }

  /**
   * @alias {resources:EreusePrice}
   * @extends {resources:Price}
   */
  class EreusePrice extends Price {
    define ({warranty2 = null, refurbisher = null, retailer = null, platform = null, ...rest}) {
      super.define(rest)
      this.warranty2 = warranty2
      this.refurbisher = refurbisher
      this.retailer = retailer
      this.platform = platform
    }
  }

  /**
   * @alias {resources:Install}
   * @extends {resources:EventWithOneDevice}
   */
  class Install extends EventWithOneDevice {
    define ({elapsed = null, address = null, ...rest}) {
      super.define(rest)
      this.elapsed = elapsed
      this.address = address
    }
  }

  /**
   * @alias {resources:Snapshot}
   * @extends {resources:EventWithOneDevice}
   */
  class Snapshot extends EventWithOneDevice {
    define ({uuid = null, software = null, version = null, events = null, expectedEvents = null, elapsed = null, components, ...rest}) {
      super.define(rest)
      this.uuid = uuid
      this.software = software
      this.version = version
      this.events = events
      this.expectedEvents = expectedEvents
      this.elapsed = elapsed
      this._components = components
    }

    get title () {
      return `${super.title} — ${this.software} ${this.version}`
    }
  }

  /**
   * @alias {resources:Test}
   * @extends {resources:EventWithOneDevice}
   */
  class Test extends EventWithOneDevice {
    define ({elapsed = null, ...rest}) {
      super.define(rest)
      this.elapsed = elapsed
    }
  }

  /**
   * @alias {resources:TestDataStorage}
   * @extends {resources:Test}
   */
  class TestDataStorage extends Test {
    define ({length = null, status = null, lifetime = null, assessment = null, reallocatedSectorCount = null, powerCycleCount = null, reportedUncorrectableErrors = null, commandTimeout = null, currentPendingSectorCount = null, offlineUncorrectable = null, remainingLifetimePercentage = null, ...rest}) {
      super.define(rest)
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

  /**
   * @alias {resources:StressTest}
   * @extends {resources:Test}
   */
  class StressTest extends Test {
  }

  /**
   * @alias {resources:Benchmark}
   * @extends {resources:EventWithOneDevice}
   */
  class Benchmark extends EventWithOneDevice {
    define ({elapsed = null, ...rest}) {
      super.define(rest)
      this.elapsed = elapsed
    }
  }

  /**
   * @alias {resources:BenchmarkDataStorage}
   * @extends {resources:Benchmark}
   */
  class BenchmarkDataStorage extends Benchmark {
    define ({readSpeed = null, writeSpeed = null, ...rest}) {
      super.define(rest)
      this.readSpeed = readSpeed
      this.writeSpeed = writeSpeed
    }
  }

  /**
   * @alias {resources:BenchmarkWithRate}
   * @extends {resources:Benchmark}
   */
  class BenchmarkWithRate extends Benchmark {
    define ({rate = null, ...rest}) {
      super.define(rest)
      this.rate = rate
    }
  }

  /**
   * @alias {resources:BenchmarkProcessor}
   * @extends {resources:BenchmarkWithRate}
   */
  class BenchmarkProcessor extends BenchmarkWithRate {
  }

  /**
   * @alias {resources:BenchmarkProcessorSysbench}
   * @extends {resources:BenchmarkProcessor}
   */
  class BenchmarkProcessorSysbench extends BenchmarkProcessor {
  }

  /**
   * @alias {resources:BenchmarkRamSysbench}
   * @extends {resources:BenchmarkWithRate}
   */
  class BenchmarkRamSysbench extends BenchmarkWithRate {
  }

  /**
   * @alias {resources:ToRepair}
   * @extends {resources:EventWithMultipleDevices}
   */
  class ToRepair extends EventWithMultipleDevices {
  }

  /**
   * @alias {resources:Repair}
   * @extends {resources:EventWithMultipleDevices}
   */
  class Repair extends EventWithMultipleDevices {
  }

  /**
   * @alias {resources:ReadyToUse}
   * @extends {resources:EventWithMultipleDevices}
   */
  class ReadyToUse extends EventWithMultipleDevices {
    static get icon () {
      return 'fa-check'
    }
  }

  /**
   * @alias {resources:ToPrepare}
   * @extends {resources:EventWithMultipleDevices}
   */
  class ToPrepare extends EventWithMultipleDevices {
  }

  /**
   * @alias {resources:Prepare}
   * @extends {resources:EventWithMultipleDevices}
   */
  class Prepare extends EventWithMultipleDevices {
  }

  /**
   * @alias {resources:Organize}
   * @extends {resources:EventWithMultipleDevices}
   */
  class Organize extends EventWithMultipleDevices {
  }

  /**
   * @alias {resources:Reserve}
   * @extends {resources:Organize}
   */
  class Reserve extends Organize {
  }

  /**
   * @alias {resources:CancelReservation}
   * @extends {resources:Organize}
   */
  class CancelReservation extends Organize {
  }

  /**
   * @alias {resources:Trade}
   * @extends {resources:EventWithMultipleDevices}
   */
  class Trade extends EventWithMultipleDevices {
    define ({shippingDate = null, invoiceNumber = null, price = null, to = null, confirms = null, ...rest}) {
      super.define(rest)
      this.shippingDate = shippingDate
      this.invoiceNumber = invoiceNumber
      this.price = price
      this.to = to
      this.confirms = confirms
    }
  }

  /**
   * @alias {resources:Sell}
   * @extends {resources:Trade}
   */
  class Sell extends Trade {
  }

  /**
   * @alias {resources:Donate}
   * @extends {resources:Trade}
   */
  class Donate extends Trade {
  }

  /**
   * @alias {resources:CancelTrade}
   * @extends {resources:Trade}
   */
  class CancelTrade extends Trade {
  }

  /**
   * @alias {resources:ToDisposeProduct}
   * @extends {resources:Trade}
   */
  class ToDisposeProduct extends Trade {
  }

  /**
   * @alias {resources:DisposeProduct}
   * @extends {resources:Trade}
   */
  class DisposeProduct extends Trade {
  }

  /**
   * @alias {resources:Receive}
   * @extends {resources:EventWithMultipleDevices}
   */
  class Receive extends EventWithMultipleDevices {
    define ({role = null, ...rest}) {
      super.define(rest)
      this.role = role
    }
  }

  /**
   * @alias {module:resources.Tag}
   * @extends {module:resources.Thing}
   */
  class Tag extends Thing {
    define ({id = null, org = null, secondary = null, device = null, ...rest}) {
      super.define(rest)
      this.id = id
      this.org = org
      this.secondary = secondary
      this.device = this.constructor._relationship(device)
    }

    get title () {
      return !this.org || this.id.length <= this.org.length ? this.id : this.org
    }
  }

  /**
   * @alias module:resources.Lot
   */
  class Lot extends Thing {
    define ({id = null, name = null, description = null, closed = null, devices = [], children = [], parents = [], url = null, ...rest}) {
      super.define(rest)
      this.id = id
      this.name = name
      this.description = description
      this.closed = closed
      this.devices = devices
      this.children = children
      this._parents = this.constructor._relationships(parents)
      this.url = url
    }

    get parents () {
      return this._parents.map(id => cache.lots[id])
    }

    static get basePath () {
      return '/lots/'
    }

    static fromObject (data) {
      if (data.id && data.id in cache.lots) cache.lots[data.id].define(data)
      else {
        const lot = super.fromObject(data)
        cache.lots[lot.id] = lot
        return lot
      }
      return cache.lots[data.id]
    }

    /**
     * Prepares the lot and posts it to Devicehub
     * @return {Promise}
     */
    create () {
      console.assert(!this.id, 'Cannot POST lot %s because it already has an ID', this.id)
      const parentsIds = this._parents
      return this.server.post(_.pick(this, ['name', 'description'])).then(obj => {
        this.define(obj)
        cache.lots[this.id] = this
        if (parentsIds.length) {
          return this.server.one(parentsIds[0]).post('children', null, {id: this.id})
        }
      })
    }
  }

  /**
   * @alias {module:resources.User}
   * @extends {module:resources.Thing}
   */
  class User extends Thing {
    define ({id = null, email = null, individuals = [], name = null, token = null, ...rest}) {
      super.define(rest)
      this.id = id
      this.email = email
      this.individuals = individuals
      this.name = name
      this.token = token
    }

    get icon () {
      return 'fa-user'
    }

    get title () {
      return this.name || this.email
    }
  }

  /**
   * @alias module:resources.ResourceList
   */
  class ResourceList extends Array {
    /**
     * @param {Thing[]} items
     * @param {object} pagination
     * @param {?string} url
     */
    constructor (items = [],
                 pagination = {page: null, perPage: null, total: null, previous: null, next: 1},
                 url = null) {
      super(...items)
      this.pagination = pagination
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

    /**
     *
     * @param {module:resources.ResourceList} other
     */
    add (other) {
      this.push(...other)
      this.pagination = other.pagination
      this.url = other.url
    }

    /**
     *
     * @param {module:resources.ResourceList} other
     */
    set (other) {
      this.length = 0
      this.add(other)
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
    /**
     *
     * @param {Object.<string, object>} items
     * @param {LotNode[]} tree
     * @param {string} url
     */
    constructor (items, tree, url) {
      items = _.mapValues(items, x => resourceClass(x.type).fromObject(x))
      super(..._.values(items))
      this.tree = this._trees(tree)
      this.url = url
    }

    _trees (objs) {
      return objs.map(obj => new LotNode(obj.id, this._trees(obj.nodes)))
    }

    addToTree (lotId) {
      this.tree.push(new LotNode(lotId))
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
    Server: Server,
    Mobile: Mobile,
    Smartphone: Smartphone,
    Tablet: Tablet,
    Cellphone: Cellphone,
    Component: Component,
    GraphicCard: GraphicCard,
    DataStorage: DataStorage,
    HardDrive: HardDrive,
    SolidStateDrive: SolidStateDrive,
    Motherboard: Motherboard,
    NetworkAdapter: NetworkAdapter,
    Processor: Processor,
    RamModule: RamModule,
    SoundCard: SoundCard,
    ComputerAccessory: ComputerAccessory,
    Mouse: Mouse,
    MemoryCardReader: MemoryCardReader,
    SAI: SAI,
    Keyboard: Keyboard,
    Display: Display,
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
    User: User,
    LotNode: LotNode,
    ResourceList: ResourceList,
    Lots: Lots,
    resourceClass: resourceClass,
    RestangularConfigurerResource: null
  }
  return resources
}

module.exports = resourceFactory
