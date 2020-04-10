const fullContents = {
  type: require('./aggregates.full.html'),
  status: require('./aggregates.full.html'),
  issues: require('./issues.full.html'),
  rate: require('./rate.full.html'),
  privacy: require('./privacy.full.html'),
  traceability: require('./traceability.full.html'),
  lots: require('./lots.full.html'),
  components: require('./components.full.html')
}

/**
 *
 * @param $filter
 * @param CONSTANTS
 * @param {module:enums} enums
 */
function deviceListSummary ($filter, CONSTANTS, enums) {
  const directive = {
    template: require('./device-list-summary.directive.html'),
    restrict: 'E',
    scope: {
      devices: '<'
    },
    /**
     * @param {$scope} $scope
     * @param {module:resources.Device[]} $scope.devices
     * @param {Property[]} $scope.props
     * @param $element
     */
    link: ($scope, $element) => {
      /**
       * The name of the Property class the user clicked or null.
       * @type {?Property}
       */
      const $deviceListFull = $element.find('#device-list-full')
      $scope.activeProp = null

      function currency (amount) {
        return $filter('currency')(amount, CONSTANTS.currency)
      }

      $scope.$watchCollection('devices', devices => {
        // Set summary pane properties
        $scope.props = [new Type(devices), new Status(devices)]
        pushIfValues($scope.props, Issues, devices)
        /* pushIfValues($scope.props, Price, devices, currency) */
        pushIfValues($scope.props, Rate, devices)
        pushIfValues($scope.props, Privacy, devices)
        $scope.props.push(new Traceability(devices))
        /* $scope.props.push(new Lots(devices)) */
        pushIfValues($scope.props, Components, devices)
        if ($scope.activeProp) {
          // activeProp has an old property
          // As a prop is a singleton, we replace it with the new
          // updated prop of the same class
          // activeProp can be set back to null if none of the actual
          // devices can have this property
          $scope.activeProp = _.find($scope.props, {'constructor': $scope.activeProp.constructor})
          $scope.activeModel = $scope.activeProp ? $scope.activeProp.full() : null
          if (!$scope.activeProp) $deviceListFull.removeClass('opened')
        }
      })
      /**
       * @param {Property} prop
       */
      $scope.open = prop => {
        $scope.activeProp = prop
        $scope.activeModel = $scope.activeProp.full()
        $deviceListFull.addClass('opened')
      }
      $scope.close = () => {
        $scope.activeProp = null
        $deviceListFull.removeClass('opened')
      }
    }
  }

  function pushIfValues (props, Prop, devices, filter) {
    try {
      props.push(new Prop(devices, filter))
    } catch (e) {
      if (!(e instanceof NoValuesForProperty)) throw e
    }
  }

  /**
   * A pane in the device list summary. It offers a resumed vision
   * of a device value, or property.
   */
  class Property {
    /**
     * @param {module:resources.Device[]} devices
     * @param {string} title
     */
    constructor (devices, title) {
      /** @type {module:resources.Device[]} */
      this.devices = devices
      /**
       * The title of the property.
       * @type {string}
       */
      this.title = title
      /**
       * Angular HTML template with the content of the property when
       * seen as a summary.
       * @type {?string}
       */
      this.content = null // Fulfill this through the subclasses
      this.cssClass = `${this.constructor.name}-property`
    }

    /**
     * Angular HTML template to show when the property is being
     * seen in full view.
     * @return {string}
     */
    get fullContent () {
      return fullContents[this.constructor.name.toLowerCase()]
    }

    /**
     * Returns a list of aggregate entries.
     *
     * This method counts the value repetitions for the given property
     * for all devices.
     * @param {string} pathToProp
     * @param options
     * @param {?string} key - The key used to consider if two
     * things are the same (a repetition).
     * @returns {AggregateEntry[]}
     */
    aggregatesOne (pathToProp, options = {}, key) {
      return _(this.devices)
        .map(pathToProp)
        .compact()
        .filter((prop) => { 
          if (!key) {
            return true
          }
          return typeof prop[key] !== 'undefined' 
        }) 
        .groupBy(key)
        // todo future version could use groupBy and hold
        //  an array of values instead of length
        .map((values, key) => new AggregateEntry(values, key, pathToProp, options))
        .value()
    }

    aggregates (pathToProp, options = {}, key) {
      return _(this.devices)
        .map(pathToProp)
        .flatten()
        .compact()
        .uniqBy('id')
        .groupBy(key)
        .map((values, key) => new AggregateEntry(values, key, pathToProp, options))
        .value()
    }

    /**
     * Returns a tuple with the minimum and maximum Thing of
     * path's value of all devices, by using the property at rangedBy.
     * @param {string} path
     * @param {string} rangedBy
     * @returns {Thing[]}
     */
    range (path, rangedBy) {
      const prices = _(this.devices).map(path)
      const min = prices.minBy(rangedBy)
      if (_.isUndefined(min)) {
        throw new NoValuesForProperty(`No range values for ${this.constructor.name}.`)
      }
      return [min, prices.maxBy(rangedBy)]
    }

    /**
     * Given a path of a value containing a list of things,
     * this method iterates through all devices returning a global set
     * of those things.
     * @param {string} path - The path to a property.
     * @returns {Thing[]} — No null values included.
     */
    set (path) {
      return _(this.devices).map(path).flatten().compact().uniqBy('id').value()
    }

    /**
     * As set but for values not containing a list.
     * @param {string} path
     * @return {Thing[]} — No null values included.
     */
    setOne (path) {
      return _(this.devices).map(path).compact().uniqBy('id').value()
    }

    /**
     * Returns a string representation of an array of aggregate entries.
     * @param {AggregateEntry[]} aggregate
     * @returns {string}
     */
    aggregateToString (aggregate) {
      return aggregate.join(', ')
    }

    rangeToString (min, max, filter = _.identity) {
      if (min === max) {
        return filter(min)
      } else {
        return `${filter(min)} — ${filter(max)}`
      }
    }

    /**
     * Get a representation of how many Things have the same property
     * value.
     * @param {Thing[]} things
     * @param {string} prop
     * @return {string}
     */
    numberOf (things, prop = 'title') {
      return _(things).countBy(prop).map((count, value) => `${value} (${count})`).join(', ')
    }

    /**
     * Returns an object that the full template internally uses.
     */
    full () {
      throw Error('Not implemented.')
    }
  }

  Property.fullBig = false

  /**
   * The result of an aggregation.
   */
  class AggregateEntry {
    constructor (values, key, pathToProp, options) {
      this.postfix = options.postfix
      this.prefix = options.prefix
      /** @type{Thing[]} */
      this.things = values
      /** @type {number} */
      this.count = values.length
      /** @type {*} */
      this.value = key
      /** @type {string} */
      this.property = pathToProp
    }

    toString () {
      const count = this.count.length > 1 ? `(${this.count})` : ''
      return this.value === 'Yes'
        ? `${this.value} ${count}`
        : `${this.prefix || ''} ${this.value} ${this.postfix || ''} ${count}`
    }

    valueOf () {
      return this.toString()
    }
  }

  class Type extends Property {
    constructor (devices) {
      super(devices, 'Type, manufacturer & model')
      this.typeAggr = this.aggregatesOne('typeHuman')
      this.manufacturerAggr = this.aggregatesOne('manufacturer')
      this.modelAggr = this.aggregatesOne('model')
      const args = ['[0].value', '']
      const type = _.get(this.typeAggr, ...args)
      const man = _.get(this.manufacturerAggr, ...args)
      const mod = _.get(this.modelAggr, ...args)

      if (this.typeAggr.length > 1) {
        this.content = 'Various types'
      } else if (this.manufacturerAggr.length > 1) {
        this.content = `${type} Various manufacturers`
      } else if (this.modelAggr.length > 1) {
        this.content = `${type} ${man} Various models`
      } else if (this.modelAggr) {
        this.content = `${type} ${man} ${mod}`
      }
    }

    full () {
      return [
        ['Type', this.typeAggr],
        ['Manufacturer', this.manufacturerAggr],
        ['Model', this.modelAggr],
        ['serial Number', this.aggregatesOne('serialNumber')]
      ]
    }
  }

  class Status extends Property {
    constructor (devices) {
      super(devices, 'Status')
      this.physicals = this.aggregatesOne('physical')
      this.tradings = this.aggregatesOne('trading')
      this.content = 'Registered'
      if (this.physicals.length || this.tradings.length) {
        const textTrading = this.aggregateToString(this.tradings)
        const textPhysical = this.aggregateToString(this.physicals)
        this.content = this.physicals.length && this.tradings.length
          ? `${textTrading} / ${textPhysical}`
          : textTrading || textPhysical
      }
    }

    full () {
      return [
        ['Physical states', this.physicals],
        ['Trading states', this.tradings]
      ]
    }
  }

  class Issues extends Property {
    constructor (devices) {
      super(devices, 'Issues')
      this.problems = this.set('problems')
      this.working = this.set('working')
      const issues = this.problems.concat(this.working)
      if (!issues.length) throw new NoValuesForProperty()
      this.content = this.numberOf(issues)
    }

    full () {
      return [
        ['Working', 'Wrong last tests.', this.working],
        ['Problems', 'Regular events that have warnings or errors.', this.problems]
      ]
    }
  }

  Issues.fullBig = true

  class Price extends Property {
    constructor (devices, currency) {
      super(devices, 'Price')
      const range = this.range('price', 'price')
      this.min = range[0] // unpack messes eslint
      this.max = range[1]
      this.content = this.rangeToString(this.min, this.max, currency)
    }
  }

  class Rate extends Property {
    constructor (devices) {
      super(devices, 'Rate')
      const rates = this.setOne('rate')
      if (!rates.length) throw new NoValuesForProperty()
      this.content = this.numberOf(rates)
    }

    // todo handle rating software / versions
    full () {
      return [
        ['Rating', this.aggregatesOne('rate', undefined, 'ratingRangeHuman')],
        [
          'Appearance',
          this._reAddRate(this.aggregatesOne('rate', undefined, 'appearance'), enums.AppearanceRange)
        ],
        [
          'Functionality',
          this._reAddRate(this.aggregatesOne('rate', undefined, 'functionality'), enums.FunctionalityRange)
        ],
        ['Processor', this.aggregatesOne('rate', undefined, 'processorRangeHuman')],
        ['RAM', this.aggregatesOne('rate', undefined, 'ramRangeHuman')],
        ['Data storage', this.aggregatesOne('rate', undefined, 'dataStorageRangeHuman')]
      ]
    }

    /**
     * Re-adds the enum to the aggregate value, as internal countBy
     * method returns a string, not the original object value enum.
     * @param {AggregateEntry[]} aggregates
     * @param {typeof module:enums.Enum} Cls
     * @private
     */
    _reAddRate (aggregates, Cls) {
      aggregates.forEach(aggr => {
        aggr.value = new Cls(aggr.value)
      })
      return aggregates
    }
  }

  class Privacy extends Property {
    constructor (devices) {
      super(devices, 'Disk erasure')
      const privacies = this.set('privacy')
      if (!privacies.length) throw new NoValuesForProperty()
      this.content = this.numberOf(privacies)
    }

    full () {
      // todo is this going to work directly with hdds?
      return this.aggregates('privacy', undefined, 'severity')
    }
  }

  Privacy.fullBig = true

  class Traceability extends Property {
    constructor (devices) {
      super(devices, 'Traceability log')
      this.events = this.set('events')
      this.content = `${this.events.length} events`
    }

    full () {
      return this.events
    }
  }

  class Lots extends Property {
    constructor (devices) {
      super(devices, 'Lots')
      this.lots = this.aggregates('lots')
      this.content = `${this.lots.length} lots`
    }

    full () {
      return this.lots
    }
  }

  class Components extends Property {
    constructor (devices) {
      super(devices, 'Components')
      
      this.components = _(devices)
                        .map('components')
                        .flatten()
                        .value()
    
      this.content = `${this.components.length} components`
    }

    aggregateComponentType (componentType, pathToProp, options = {}) {
      return _(this.components)
        .filter((component) => { 
          const type = component.type
          if (type === componentType) {
            return true
          }
        })
        .map((component) => {
          return component[pathToProp]
        })
        .compact()
        .groupBy()
        .map((values, key) => new AggregateEntry(values, key, pathToProp, options))
        .value()
    }

    full () {
      return [
        ['Processor', this.aggregateComponentType('Processor', 'model')],
        ['RAM', this.aggregateComponentType('RamModule', 'size', { postfix: 'GB' })],
        ['Data storage', this.aggregateComponentType('HardDrive', 'size', { postfix: 'GB' })],
        ['Graphic card', this.aggregateComponentType('GraphicCard', 'manufacturer')],
        ['Sound card', this.aggregateComponentType('SoundCard', 'manufacturer')],
        ['Motherboard', this.aggregateComponentType('Motherboard', 'manufacturer')]
      ]
    }
  }

  class NoValuesForProperty extends Error {
  }

  return directive
}

module.exports = deviceListSummary
