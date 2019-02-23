const utils = require('./../utils')
const inflection = require('inflection')
const isEmpty = require('is-empty')

/**
 * Sets the field `name` of `obj` to be not enumerable
 *
 * Things use this for private elements, so they are hidden when
 * POSTing, JSONifying, and when iterating through keys.
 *
 * @param obj
 * @param name
 */
function setNotEnumerable (obj, name) {
  Object.defineProperty(obj, name, {'enumerable': false, 'writable': true})
}

/**
 * object used by Things to allow getters to be enumerable,
 * so using them when POSTing, JSONifying, and when iterating
 * through keys.
 * @type {{enumerable: boolean}}
 */
const ENUMERABLE = {'enumerable': true}

/**
 * Resources module
 * @module resources
 */

/**
 *
 * @param {module:server} server
 * @param CONSTANTS
 * @param $filter
 * @param {module:enums} enums
 */
function resourceFactory (server, CONSTANTS, $filter, enums) {
  /**
   * The models of Devicehub, mimicking Devicehub's `schema.Thing`.
   * Thing classes have generic methods that can communicate with
   * Devicehub (for example, Lot has a method to add devices to it,
   * adding it in both the angular and Devicehub).
   *
   * Some Things can have caches, avoiding having the same Thing
   * instance duplicated and allowing the programmer access
   * relationships in an easy way between them (ex. device.events).
   * Cache is optional and sometimes, like when building a new
   * Thing through a form, is desirable to deactivate them for
   * an instance. See `module:resources.Thing~init`.
   *
   * @memberOf module:resources
   *
   */
  class Thing {
    constructor (args = {}) {
      this.define(args)
    }

    define ({sameAs = null, updated = null, created = null, _useCache = false}) {
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
      /** @type {boolean} **/
      setNotEnumerable(this, '_useCache')
      this._useCache = _useCache
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
      return this.constructor.typeHuman
    }

    static get typeHuman () {
      return utils.Naming.humanize(this.type)
    }

    /**
     * A human way of addressing the resource.
     * @returns {string}
     */
    get title () {
      return utils.Naming.humanize(this.type)
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
     * A connection to Devicehub. Ex. myThing.server.post()
     * @return {module:server.DevicehubThing}
     */
    get server () {
      return this.constructor.server
    }

    /**
     * Creates a thing to Devicehub by POSTing it, asynchronously
     * updating the contents of this object with the result of
     * devicehub.
     *
     * Parameters are optional and usually not required.
     * @return {Promise}
     */
    post (uri, config) {
      console.assert(!this.id, '%s %s has already been posted.', this.type, this.id)
      return this.server.post(this._post(), uri, config).then(obj => {
        this.define(obj)
        return this
      })
    }

    /**
     * Returns a posteable version of the thing, complying with
     * Devicehub's API.
     * @return {Object.<string, Object>}
     * @private
     */
    _post () {
      return this
    }

    /**
     * Modifies the field names with a PATCH to the server.
     * @param {string} fields
     */
    patch (...fields) {
      // This patch is cumberstone and assumes the thing has a field id
      // Probably will require refactor
      console.assert(this.id, '%s must exist on the DB before PATCHing it.', this.type)
      const obj = _.pick(this, fields)
      return this.server.patch(obj, this.id).then(() => this)
    }

    toString () {
      return this.title
    }

    valueOf () {
      return this.toString()
    }

    /**
     * Instantiates this type of Thing from a plain object.
     *
     * Note that you can use `resources:init` as a more convenient
     * method, too.
     *
     * @param {object} thingLike -  The plain object.
     * @param {boolean} useCache - If true, reconcile this object
     * with the cache, otherwise do not link this object with the
     * cache. This is recursive: all relationships from this object
     * will have the same setting.
     * @return {Thing}
     */
    static init (thingLike, useCache) {
      console.assert(_.isPlainObject(thingLike))
      console.assert('type' in thingLike)

      let thing
      if (useCache && this.CACHE) {  // Use a cache and we have a cache to use
        const id = thingLike.id
        if (id) { // ...and our thingLike has an ID (so we can identify it in cache)
          if (id in this.CACHE) {  // Cache hit: update cache
            thing = this.CACHE[id]
            thing.define(thingLike)
          } else {  // Cache miss: add new entry to cache
            this.CACHE[id] = thing = new this(thingLike)
          }
        } else {  // Object has no ID; we cannot set it to a cache
          // Just instantiate it
          thing = new this(thingLike)
        }
      } else {  // Don't use cache; just instantiate it
        thing = new this(thingLike)
      }
      console.assert(thing instanceof this)
      // We avoid adding values
      Object.seal(thing)
      return thing
    }

    /**
     * Creates a relationship between `this` and a passed-in `other`,
     * instantiating it as a Thing and, if `this` is in the cache,
     * reconciling `other` with the cache too.
     *
     * @param {?object} other - An ID, a plain object or null. Plain
     * objects are initialized as a Thing, other types of values are
     * just returned as-is.
     * @return {string|number|object|Thing|null} - The ID of the object,
     * if the object is a Thing living in the cache, or the passed-in
     * value as-is.
     */
    _rel (other, idField = 'id') {
      console.assert(!(other instanceof Thing) && !(other instanceof Array))
      if (!_.isPlainObject(other)) return other

      const value = resources.init(other, this._useCache)
      return this._useCache ? _.get(value, idField, value) : value
    }

    /**
     * The same as `relationsihp` but with an array.
     * @param {array} others
     * @return {*}
     */
    _rels (others) {
      console.assert(others instanceof Array)
      return others.map(other => this._rel(other))
    }

    /**
     * Gets the full object from a relationship.
     *
     * @param cache - A cache where the object could potentially be.
     * @param value - The result of `module:resources.Thing._rel`
     * @return {*}
     * @private
     */
    _getRel (cls, value) {
      console.assert(!(cls instanceof Array))
      return this._useCache ? _.get(cls.CACHE, value, value) : value
    }

    _getRels (cls, value) {
      console.assert(value instanceof Array)
      return value.map(v => this._getRel(cls, v))
    }

    /**
     * Returns an array of `fields.Option` where each option is a
     * resource that is a subclass of this one.
     * @param {typeof module:fields.Option} Option - Option class to
     * use.
     * @return {module:fields.Option[]}
     */
    static options (Option, onlyLeafs = false, includeComponents = true) {
      const self = this
      // todo make test
      // eslint-disable-next-line no-proto
      const THING_GRANDCHILDREN = _.filter(resources, r => r.__proto__.__proto__ === Thing)

      function checkResource (r) {
        return self.isPrototypeOf(r) &&
          (onlyLeafs ? !_.find(resources, child => r.isPrototypeOf(child)) : true) &&
          (includeComponents ? true : !Component.isPrototypeOf(r))
      }

      function computeGroup (resource) {
        const r = _.find(THING_GRANDCHILDREN,
          category => category.isPrototypeOf(resource) || resource === category)
        return r || undefined
      }

      return _(resources)
        .filter(checkResource)
        .map(r => new Option(r.name, {group: computeGroup(r), namespace: 'r.l'}))
        .value()
    }

    static toString () {
      return this.typeHuman
    }

    toJSON () {
      return this.dump()
    }

    dump () {
      const dump = {}
      for (let key in this) {
        const v = this[key]
        if (v === 0 || !isEmpty(v)) dump[key] = v
      }
      return dump
    }
  }

  // See `module:resources.setNotEnumerable`
  Object.defineProperties(Thing.prototype, {
    type: ENUMERABLE
  })

  /** A connection to Devicehub. Ex. myThing.server.post() */
  Thing.server = null

  /** A cache for this resource and subresources to use */
  Thing.CACHE = null

  /**
   * Class representing a device
   * @memberOf module:resources
   * @extends module:resources.Thing
   */
  class Device extends Thing {
    define ({id = null, hid = null, tags = [], model = null, manufacturer = null, serialNumber = null, weight = null, width = null, height = null, depth = null, events = [], problems = [], url = null, rate = null, price = null, trading = null, physical = null, physicalPossessor = null, productionDate = null, working = [], ...rest}) {
      super.define(rest)
      /** @type {int} */
      this.id = id
      /** @type {?string} */
      this.hid = hid
      /** @type {Tag[]} */
      this.tags = tags
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
      this.events = events
      /** @type {Event[]} */
      this.problems = this._rels(problems)
      /** @type {string} */
      this.url = url ? new URL(url, CONSTANTS.url) : null
      /** @type {Rate} */
      this.rate = this._rel(rate)
      /** @type {Price} */
      this.price = this._rel(price)
      /** @type {string} */
      this.trading = trading
      /** @type {string} */
      this.physical = physical
      /** @type {string} */
      this.physicalPossessor = physicalPossessor
      /** @type {string} */
      this.productionDate = productionDate
      /** @type {Event} */
      this.working = this._rels(working)
      setNotEnumerable(this, '_events')
      setNotEnumerable(this, '_tags')
    }

    get events () {
      return this._getRels(Event, this._events)
    }

    set events (v) {
      this._events = this._rels(v)
    }

    get tags () {
      return this._getRels(Tag, this._tags)
    }

    set tags (v) {
      this._tags = this._rels(v)
    }

    static get icon () {
      return ''
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
      return `${utils.Naming.humanize(this.type)} ${this.model} ${tags}`
    }
  }

  Object.defineProperties(Device.prototype, {
    events: ENUMERABLE,
    tags: ENUMERABLE
  })

  /** @type {Object.<int, Device>} */
  Device.CACHE = {}

  /**
   * @alias module:resources.Computer
   * @extends module:resources.Device
   */
  class Computer extends Device {
    define ({components = [], chassis = null, ramSize = null, dataStorageSize = null, processorModel = null, graphicCardModel = null, networkSpeeds = [], privacy = [], ...rest}) {
      /** @type {Components[]} */
      super.define(rest)
      this.components = components
      this.chassis = chassis ? new enums.Chassis(chassis) : null
      this.ramSize = ramSize
      this.datStorageSize = dataStorageSize
      this.processorModel = processorModel
      this.graphicCardModel = graphicCardModel
      this.networkSpeeds = networkSpeeds
      this.privacy = this._rels(privacy)
      setNotEnumerable(this, '_components')
    }

    get components () {
      return this._getRels(Component, this._components)
    }

    set components (v) {
      this._components = this._rels(v)
    }

    static get icon () {
      return 'fa-building'
    }
  }

  Object.defineProperties(Computer.prototype, {
    components: ENUMERABLE
  })

  /**
   * @alias module:resources.ComputerMonitor
   * @extends module:resources.Device
   */
  class ComputerMonitor extends Device {
    static get icon () {
      return 'fa-desktop'
    }
  }

  /**
   * @alias module:resources.Desktop
   * @extends module:resources.Computer
   */
  class Desktop extends Computer {
  }

  /**
   * @alias module:resources.Laptop
   * @extends module:resources.Computer
   */
  class Laptop extends Computer {
    static get icon () {
      return 'fa-laptop'
    }
  }

  /**
   * @alias module:resources.Server
   * @extends module:resources.Computer}
   */
  class Server extends Computer {
    static get icon () {
      return 'fa-server'
    }
  }

  /**
   * @alias module:resources.Mobile
   * @extends module:resources.Device}
   */
  class Mobile extends Device {
    define ({imei = null, meid = null, ...rest}) {
      super.define(rest)
      this.imei = imei
      this.meid = meid
    }
  }

  /**
   * @alias module:resources.Smartphone
   * @extends module:resources.Mobile}
   */
  class Smartphone extends Mobile {
    static get icon () {
      return 'fa-mobile'
    }
  }

  /**
   * @alias module:resources.Tablet
   * @extends module:resources.Mobile}
   */
  class Tablet extends Mobile {
    static get icon () {
      return 'fa-tablet'
    }
  }

  /**
   * @alias module:resources.Cellphone
   * @extends module:resources.Mobile}
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
      this.parent = parent
      setNotEnumerable(this, '_parent')
    }

    get parent () {
      return this._getRel(Computer, this._parent)
    }

    set parent (v) {
      this._parent = this._rel(v)
    }

    static get icon () {
      return 'fa-microchip'
    }

    get title () {
      return `${utils.Naming.humanize(this.type)} ${this.model} ${this.serialNumber}`
    }
  }

  /**
   * @alias module:resources.GraphicCard
   * @extends module:resources.Component
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
   * @alias module:resources.DataStorage
   * @extends module:resources.Component
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
   * @alias module:resources.HardDrive
   * @extends module:resources.DataStorage
   */
  class HardDrive extends DataStorage {
  }

  /**
   * @alias module:resources.SolidStateDrive
   * @extends module:resources.HardDrive
   */
  class SolidStateDrive extends HardDrive {
  }

  /**
   * @alias module:resources.Motherboard
   * @extends module:resources.Component
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
   * @alias module:resources.NetworkAdapter
   * @extends module:resources.Component
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
   * @alias module:resources.Processor
   * @extends module:resources.Component
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
   * @alias module:resources.RamModule
   * @extends module:resources.Component
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
   * @alias module:resources.SoundCard
   * @extends module:resources.Component
   */
  class SoundCard extends Component {
    static get icon () {
      return 'fa-volume-up'
    }
  }

  /**
   * @alias module:resources.Display
   * @extends module:resources.Component
   */
  class Display extends Component {
  }

  /**
   * @alias module:resources.ComputerAccessory
   * @extends module:resources.Device
   */
  class ComputerAccessory extends Device {
    static get icon () {
      return 'fa-box'
    }
  }

  /**
   * @alias module:resources.Mouse
   * @extends module:resources.ComputerAccessory
   */
  class Mouse extends ComputerAccessory {
    static get icon () {
      return 'fa-mouse-pointer'
    }
  }

  /**
   * @alias module:resources.MemoryCardReader
   * @extends module:resources.ComputerAccessory
   */
  class MemoryCardReader extends ComputerAccessory {
    static get icon () {
      return 'fa-sd-card'
    }
  }

  /**
   * @alias module:resources.SAI
   * @extends module:resources.ComputerAccessory
   */
  class SAI extends ComputerAccessory {
    static get icon () {
      return 'fa-plug'
    }
  }

  /**
   * @alias module:resources.Keyboard
   * @extends module:resources.ComputerAccessory
   */
  class Keyboard extends ComputerAccessory {
    define ({layout = null, ...rest}) {
      super.define(rest)
      this.layout = layout ? new enums.Layouts(layout) : null
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
    define ({id = null, name = null, closed = null, severity = null, description = null, startTime = null, endTime = null, snaphsot = null, agent = null, author = null, components = [], parent = null, url = null, ...rest}) {
      super.define(rest)
      /** @type {?string} */
      this.id = id
      /** @type {?string} */
      this.name = name
      /** @type {?boolean} */
      this.closed = closed
      /** @type {?module:enums.Severity} */
      this.severity = severity ? enums.Severity.get(severity) : null
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
      this.components = components
      this.parent = parent
      /** @type {?URL} */
      this.url = url ? new URL(url, CONSTANTS.url) : null
      setNotEnumerable(this, '_components')
      setNotEnumerable(this, '_parent')
    }

    /**
     *
     * @return {Component[]}
     */
    get components () {
      return this._getRels(Component, this._components)
    }

    set components (v) {
      this._components = this._rels(v)
    }

    set parent (v) {
      this._parent = this._rel(v)
    }

    /**
     *
     * @return {Computer}
     */
    get parent () {
      return this._getRel(Computer, this._parent)
    }

    static get icon () {
      return 'fa-bookmark'
    }

    /**
     * A way of addressing the event without exposing the device.
     * @return {string}
     */
    get title () {
      return `${this.typeHuman}: ${this.severity}`
    }
  }

  Object.defineProperties(Event.prototype, {
    components: ENUMERABLE,
    parent: ENUMERABLE
  })

  /**
   * @alias module:resources.EventWithMultipleDevices
   * @extends module:resources.Event
   */
  class EventWithMultipleDevices extends Event {
    define ({devices = [], ...rest}) {
      super.define(rest)
      // Devices can be either a Device[] or a int[]. We only want the int[]
      this.devices = devices
      setNotEnumerable(this, '_devices')
    }

    set devices (v) {
      this._devices = this._rels(v)
    }

    get devices () {
      return this._getRels(Device, this._devices)
    }

  }

  Object.defineProperties(EventWithMultipleDevices.prototype, {
    devices: ENUMERABLE
  })

  /**
   * @alias module:resources.EventWithOneDevice
   * @extends module:resources.Event
   */
  class EventWithOneDevice extends Event {
    define ({device = null, ...rest}) {
      super.define(rest)
      this.device = device
      setNotEnumerable(this, '_device')
    }

    get device () {
      return this._getRel(Device, this._device)
    }

    set device (v) {
      this._device = this._rel(v)
    }
  }

  Object.defineProperties(EventWithOneDevice.prototype, {
    device: ENUMERABLE
  })

  /**
   * @alias module:resources.Add
   * @extends module:resources.EventWithOneDevice
   */
  class Add extends EventWithOneDevice {
  }

  /**
   * @alias module:resources.Remove
   * @extends module:resources.EventWithOneDevice
   */
  class Remove extends EventWithOneDevice {
  }

  /**
   * @alias module:resources.EraseBasic
   * @extends module:resources.EventWithOneDevice
   */
  class EraseBasic extends EventWithOneDevice {
    define ({steps = [], standards = [], certificate = null, ...rest}) {
      super.define(rest)
      this.steps = steps
      this.standards = standards.map(std => enums.ErasureStandard.get(std))
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
   * @alias module:resources.EraseSectors
   * @extends module:resources.EraseBasic
   */
  class EraseSectors extends EraseBasic {
  }

  EraseSectors.method = 'Badblocks'

  /**
   * @alias module:resources.ErasePhysical
   * @extends module:resources.EraseBasic
   */
  class ErasePhysical extends EraseBasic {
    define ({method = null, ...rest}) {
      super.define(rest)
      this.method = method
    }
  }

  /**
   * @alias module:resources.Step
   * @extends module:resources.Thing
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
   * @alias module:resources.StepZero
   * @extends module:resources.Step
   */
  class StepZero extends Step {
  }

  /**
   * @alias module:resources.StepRandom
   * @extends module:resources.Step
   */
  class StepRandom extends Step {
  }

  /**
   * @alias module:resources.Rate
   * @extends module:resources.EventWithOneDevice
   */
  class Rate extends EventWithOneDevice {
    define ({rating = null, software = null, version = null, appearance = null, functionality = null, ratingRange = null, ...rest}) {
      super.define(rest)
      this.rating = rating ? new enums.RatingRange(rating) : null
      this.software = software
      this.version = version
      this.appearance = appearance
      this.functionality = functionality
      this.ratingRange = ratingRange
      this.ratingRangeHuman = ratingRange ? utils.Naming.humanize(ratingRange) : null
    }

    get title () {
      return this.rating
    }
  }

  /**
   * @alias module:resources.IndividualRate
   * @extends module:resources.Rate
   */
  class IndividualRate extends Rate {
  }

  /**
   * @alias module:resources.ManualRate
   * @extends module:resources.IndividualRate
   */
  class ManualRate extends IndividualRate {
    define ({appearanceRange = null, functionalityRange = null, labelling = null, ...rest}) {
      super.define(rest)
      this.appearanceRange = appearanceRange ? enums.AppearanceRange.get(appearanceRange) : null
      this.functionalityRange = functionalityRange ? enums.FunctionalityRange.get(functionalityRange) : null
      this.labelling = labelling
    }
  }

  /**
   * @alias module:resources.WorkbenchRate
   * @extends module:resources.ManualRate
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
   * @alias module:resources.AggregateRate
   * @extends module:resources.Rate
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
      this.appearanceRange = appearanceRange ? enums.AppearanceRange.get(appearanceRange) : null
      this.functionalityRange = functionalityRange ? enums.FunctionalityRange.get(functionalityRange) : null
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
   * @alias module:resources.Price
   * @extends module:resources.EventWithOneDevice
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
   * @alias module:resources.EreusePrice
   * @extends module:resources.Price
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
   * @alias module:resources.Install
   * @extends module:resources.EventWithOneDevice}
   */
  class Install extends EventWithOneDevice {
    define ({elapsed = null, address = null, ...rest}) {
      super.define(rest)
      this.elapsed = elapsed
      this.address = address
    }
  }

  /**
   * @alias module:resources.Snapshot
   * @extends module:resources.EventWithOneDevice
   */
  class Snapshot extends EventWithOneDevice {
    define ({uuid = null, software = null, version = null, events = null, expectedEvents = null, elapsed = null, ...rest}) {
      super.define(rest)
      this.uuid = uuid
      this.software = software
      this.version = version
      this.events = events
      this.expectedEvents = expectedEvents
      this.elapsed = elapsed
    }

    get title () {
      return `${super.title} — ${this.software} ${this.version}`
    }

  }

  /**
   * @alias module:resources.Test
   * @extends module:resources.EventWithOneDevice
   */
  class Test extends EventWithOneDevice {
    define ({elapsed = null, ...rest}) {
      super.define(rest)
      this.elapsed = elapsed
    }
  }

  /**
   * @alias module:resources.TestDataStorage
   * @extends module:resources.Test
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
      if (this.severity === this.severity.constructor.Warning) {
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
  }

  /**
   * @alias module:resources.StressTest
   * @extends module:resources.Test
   */
  class StressTest extends Test {
  }

  /**
   * @alias module:resources.Benchmark
   * @extends module:resources.EventWithOneDevice
   */
  class Benchmark extends EventWithOneDevice {
    define ({elapsed = null, ...rest}) {
      super.define(rest)
      this.elapsed = elapsed
    }
  }

  /**
   * @alias module:resources.BenchmarkDataStorage
   * @extends module:resources.Benchmark
   */
  class BenchmarkDataStorage extends Benchmark {
    define ({readSpeed = null, writeSpeed = null, ...rest}) {
      super.define(rest)
      this.readSpeed = readSpeed
      this.writeSpeed = writeSpeed
    }
  }

  /**
   * @alias module:resources.BenchmarkWithRate
   * @extends module:resources.Benchmark
   */
  class BenchmarkWithRate extends Benchmark {
    define ({rate = null, ...rest}) {
      super.define(rest)
      this.rate = rate
    }
  }

  /**
   * @alias module:resources.BenchmarkProcessor
   * @extends module:resources.BenchmarkWithRate
   */
  class BenchmarkProcessor extends BenchmarkWithRate {
  }

  /**
   * @alias module:resources.BenchmarkProcessorSysbench
   * @extends module:resources.BenchmarkProcessor
   */
  class BenchmarkProcessorSysbench extends BenchmarkProcessor {
  }

  /**
   * @alias module:resources.BenchmarkRamSysbench
   * @extends module:resources.BenchmarkWithRate
   */
  class BenchmarkRamSysbench extends BenchmarkWithRate {
  }

  /**
   * @alias module:resources.ToRepair
   * @extends module:resources.EventWithMultipleDevices
   */
  class ToRepair extends EventWithMultipleDevices {
  }

  /**
   * @alias module:resources.Repair
   * @extends module:resources.EventWithMultipleDevices
   */
  class Repair extends EventWithMultipleDevices {
  }

  /**
   * @alias module:resources.ReadyToUse
   * @extends module:resources.EventWithMultipleDevices
   */
  class ReadyToUse extends EventWithMultipleDevices {
    static get icon () {
      return 'fa-check-double'
    }
  }

  /**
   * @alias module:resources.ToPrepare
   * @extends module:resources.EventWithMultipleDevices
   */
  class ToPrepare extends EventWithMultipleDevices {
    static get icon () {
      return 'fa-tools'
    }
  }

  /**
   * @alias module:resources.Prepare
   * @extends module:resources.EventWithMultipleDevices
   */
  class Prepare extends EventWithMultipleDevices {
    static get icon () {
      return 'fa-check'
    }
  }

  /**
   * @alias module:resources.Organize
   * @extends module:resources.EventWithMultipleDevices
   */
  class Organize extends EventWithMultipleDevices {
  }

  /**
   * @alias module:resources.Reserve
   * @extends module:resources.Organize
   */
  class Reserve extends Organize {
  }

  /**
   * @alias module:resources.CancelReservation
   * @extends module:resources.Organize
   */
  class CancelReservation extends Organize {
  }

  /**
   * @alias module:resources.Trade
   * @extends module:resources.EventWithMultipleDevices
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
   * @alias module:resources.Sell
   * @extends module:resources.Trade
   */
  class Sell extends Trade {
    static get icon () {
      return 'money-bill-alt'
    }
  }

  /**
   * @alias module:resources.Donate
   * @extends module:resources.Trade
   */
  class Donate extends Trade {
    static get icon () {
      return 'money-bill'
    }
  }

  /**
   * @alias module:resources.CancelTrade
   * @extends module:resources.Trade
   */
  class CancelTrade extends Trade {

  }

  /**
   * @alias module:resources.ToDisposeProduct
   * @extends module:resources.Trade
   */
  class ToDisposeProduct extends Trade {
    static get icon () {
      return 'fa-dumpster'
    }
  }

  /**
   * @alias module:resources.DisposeProduct
   * @extends module:resources.Trade
   */
  class DisposeProduct extends Trade {
    static get icon () {
      return 'fa-dumpster'
    }
  }

  /**
   * @alias module:resources.Receive
   * @extends module:resources.EventWithMultipleDevices
   */
  class Receive extends EventWithMultipleDevices {
    define ({role = null, ...rest}) {
      super.define(rest)
      this.role = role
    }

    static get icon () {
      return 'fa-map-pin'
    }
  }

  /**
   * @alias module:resources.Tag
   * @extends module:resources.Thing
   */
  class Tag extends Thing {
    define ({id, org = null, secondary = null, device = null, printable = null, url, provider = null, ...rest}) {
      console.assert(id, 'Tag requires an ID.')
      super.define(rest)
      this.id = id
      this.org = org
      this.secondary = secondary
      this.printable = printable
      this.device = device
      this.url = new URL(url, CONSTANTS.url)
      /**
       * The provider, represented as a base URL.
       * @type {?URL}
       */
      this.provider = provider ? new URL(provider) : null
      /**
       * The URL of the tag in the provider.
       * @type {?URL}
       */
      this.providerUrl = provider ? new URL(id, provider) : null
      /**
       * The URL that is to be printed.
       * @type {URL}
       */
      this.printableUrl = this.providerUrl || this.url
      setNotEnumerable(this, '_device')
    }

    get device () {
      return this._getRel(Device, this._device)
    }

    set device (v) {
      this._device = this._rel(v)
    }

    get title () {
      // We replace a regular hyphen with a non-breaking hyphen
      return this.id.toUpperCase().replace('-', '‑')
    }

    _post () {
      return _.pick(this, ['type', 'id'])
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
      this.parents = parents
      this.children = children
      this.url = url
      setNotEnumerable(this, '_children')
      setNotEnumerable(this, '_parents')
    }

    get children () {
      return this._getRels(Lot, this._children)
    }

    set children (v) {
      this._children = this._rels(v)
    }

    get parents () {
      return this._getRels(Lot, this._parents)
    }

    set parents (v) {
      this._parents = this._rels(v)
    }

    get title () {
      return this.name
    }

    post () {
      const parentsIds = this._parents
      return super.post().then(() => {
        this.constructor.CACHE[this.id] = this
        if (parentsIds.length) {
          return this.server.post({}, parentsIds[0] + '/children', {params: {id: this.id}})
        }
      })
    }

    _post () {
      return _.pick(this, ['name', 'description', 'type'])
    }

    hasText (text) {
      return _.includesText(this.name, text)
    }

    /**
     * Add devices to this lot (regardless if the devices where
     * already in the lot).
     * @param {int[]} ids
     * @return {Promise}
     */
    addDevices (ids) {
      return this.server.post({}, this.id + '/devices', {params: {id: ids}}).then(lot => {
        this.define(lot)
      })
    }

    /**
     * Remove devices from this lot (regardless if the devices
     * where not in the lot to start with).
     * @param {int[]} ids
     * @return {Promise}
     */
    removeDevices (ids) {
      return this.server.delete(this.id + '/devices', {params: {id: ids}}).then(r => {
        this.define(r.data)
      })
    }

    /**
     * Add lots to this lot.
     *
     * This method does not throw error for lots that are already
     * previously in this lot.
     * @param {string[]} ids
     * @return {Promise}
     */
    addChildren (...ids) {
      return this.server.post({}, this.id + '/children', {params: {id: ids}}).then(lot => {
        this.define(lot)
      })
    }

    /**
     * Remove direct children lots from this lot.
     *
     * This method does not throw error for lots that are not inside
     * the lot.
     * @param {string[]} ids
     * @return {Promise}
     */
    removeChildren (...ids) {
      return this.server.delete(this.id + '/children', {params: {id: ids}}).then(r => {
        this.define(r.data)
      })
    }
  }

  /** @type {Object.<int, module:resources.Lot>} */
  Lot.CACHE = {}

  /**
   * @alias module:resources.User
   * @extends module:resources.Thing
   */
  class User extends Thing {
    define ({id = null, email = null, individuals = [], name = null, token = null, inventories = [], ...rest}) {
      super.define(rest)
      this.id = id
      this.email = email
      this.individuals = individuals
      this.name = name
      this.token = token
      this.inventories = inventories.map(inventory => new Inventory(inventory))
    }

    get icon () {
      return 'fa-user'
    }

    get title () {
      return this.name || this.email
    }
  }

  class Inventory extends Thing {
    define ({id, name, tagProvider, tagToken, ...rest}) {
      super.define(rest)
      this.id = id
      this.name = name
      this.tagProvider = tagProvider
      this.tagToken = tagToken
    }

    get title () {
      return this.name
    }
  }

  /**
   * A list of resources fetched from the server, with pagination.
   * @alias module:resources.ResourceList
   */
  class ResourceList extends Array {
    /**
     * @param {Thing[]} items
     * @param {object} pagination
     * @param {?string} url
     */
    constructor (items = [],
                 {
                   pagination = {page: null, perPage: null, total: null, previous: null, next: 1},
                   url = null
                 } = {}) {
      super(...items)
      this.pagination = pagination
      this.url = url
    }

    /**
     *
     * @param {object[]} items
     * @param rest
     * @param {boolean} useCache
     */
    static fromServer ({items, ...rest}, useCache) {
      const things = items.map(x => resources.init(x, useCache))
      return new this(things, rest)
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

    toString () {
      return this.join(', ')
    }

    valueOf () {
      return this.toString()
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
      const lot = Lot.CACHE[this.id]
      console.assert(lot, '%s lot is not in cache.', this.id)
      return lot
    }

    hasText (text) {
      return this.lot.hasText(text)
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
      items = _.mapValues(items, x => init(x, true))
      super(..._.values(items))
      this.tree = this._trees(tree)
      this.url = url
    }

    _trees (objs) {
      return objs.map(obj => new LotNode(obj.id, this._trees(obj.nodes)))
    }

    addToTree (lotId) {
      console.assert(lotId)
      this.tree.push(new LotNode(lotId))
    }
  }

  /**
   * Instantiates Things from a plain object.
   * @alias module:resources.init
   * @param {object} thingLike - The plain object.
   * @param {boolean} useCache - Should the cache be used to retreive
   * the value? This setting affects the whole lifespan of the thing
   * and its relationships.
   * @return {Thing}
   */
  function init (thingLike, useCache) {
    return resources[thingLike.type].init(thingLike, useCache)
  }

  const resources = new Proxy({
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
    init: init
  }, utils.unforgivingHandler)
  // Init servers
  /**
   * @type {module:server.DevicehubThing}
   */
  Device.server = new server.DevicehubThing('/devices/', resources)
  /**
   *
   * @type {module:server.DevicehubThing}
   */
  Event.server = new server.DevicehubThing('/events/', resources)
  /**
   * @memberOf {module:resources.Lot}
   * @type {module:server.DevicehubThing}
   */
  Lot.server = new server.DevicehubThing('/lots/', resources)
  /**
   * @alias {module:resources.Tag.server}
   * @type {module:server.DevicehubThing}
   */
  Tag.server = new server.DevicehubThing('/tags/', resources)
  window.res = resources
  return resources
}

module.exports = resourceFactory

