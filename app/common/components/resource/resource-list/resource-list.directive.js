/**
 * @param {module:resources} resources
 * @param {resourceListConfig} resourceListConfig
 * @param {ResourceListGetter} ResourceListGetter
 * @param {ResourceListSelector} ResourceListSelector
 * @param {ResourceSettings} ResourceSettings
 * @param {progressBar} progressBar
 * @param {ResourceBreadcrumb} ResourceBreadcrumb
 * @param {Session} session
 * @param UNIT_CODES
 * @param CONSTANTS
 * @param SearchService
 * @param $filter
 * @param $rootScope
 * @param Notification
 * @param {module:LotsSelector} LotsSelector
 */
function resourceList (resources, resourceListConfig, ResourceListGetter, ResourceListSelector, ResourceSettings, progressBar, ResourceBreadcrumb, session, UNIT_CODES, CONSTANTS, SearchService, $filter, $rootScope, Notification, LotsSelector) {
  return {
    template: require('./resource-list.directive.html'),
    restrict: 'E',
    scope: {},
    link: {
      /**
       * @param {Object} $scope
       * @param {module:resources.Device[]} $scope.devices
       * @param $element
       */
      pre: ($scope, $element) => {
        // We load on 'pre' to initialize before our child
        // (or inner) directives so they get real config values
        $scope.Notification = Notification
        const config = _.cloneDeep(resourceListConfig)
        const $topElem = $element.find('.fill-height-bar')

        $scope._sort = {}

        /**
         * State of the selection panel (shown/hidden) when in xs or
         * sm.
         *
         * This variable is only set to false when the user presses
         * a button only visible in xs / sm screens.
         * @type {boolean}
         */
        $scope.selectionPanelHiddenXS = true
        $scope.lotsSelectionHiddenXS = true
        $scope.showLots = () => {
          $scope.lotsSelectionHiddenXS = false
        }

        // Set up getters and selectors for devices
        class DeviceGetter {
          constructor () {
            /**
             * @type {module:resources.ResourceList}
             */
            this.devices = new resources.ResourceList()
            this.q = {
              filter: {},
              search: '',
              sort: {},
              page: null
            }
            /**
             * Is the getter on the process of getting new devices?
             * @type {boolean}
             */
            this.working = false
            this.progressBar = progressBar
          }

          /**
           * Return the next page or null if no available.
           * @return {?number}
           */
          get nextPage () {
            return this.devices.pagination.next
          }

          setFilters (filters) {
            this.q.filter = filters
            this.get()
          }

          setFilter (key, value) {
            this.q.filter[key] = value
            this.get()
          }

          setSearch (text) {
            this.q.search = text
            this.get()
          }

          /**
           *
           * @param {string} key
           * @param {boolean} order
           */
          setSort (key, order) {
            console.assert(_.isBoolean(order), 'Order must be boolean, not %s', order)
            this.q.sort = {key: order}
            this.get()
          }

          reload (showProgressBar = true) {
            return this.get(false, showProgressBar)
          }

          get (getNextPage = true, showProgressBar = true) {
            if (getNextPage) {
              if (!this.nextPage) throw new NoMorePagesAvailable()
              else this.q.page = this.nextPage
            }
            if (!getNextPage) this.q.page = 1
            if (showProgressBar) this.progressBar.start()
            this.working = true
            return resources.Device.server.getList(this.q).then(devices => {
              this.progressBar.complete()
              if (getNextPage) this.devices.add(devices)
              else this.devices.set(devices)
              selected.deselectDevicesNotIn(this.devices)
              if (!this.nextPage) $topElem.scrollTop(0) // Scroll to top when loading from 0
            }).finally(() => {
              this.working = false
            })
          }

          gentlyGet (getNextPage, showProgressBar) {
            if (!this.working) return this.get(getNextPage, showProgressBar)
          }
        }

        class NoMorePagesAvailable extends Error {
        }

        const getter = $scope.getter = new DeviceGetter()

        class SelectedDevices extends Array {
          constructor () {
            super()
            this.lastSelectedIndex = 0
            /**
             * Is the user selecting multiple devices through
             *  long-pressing?
             *  */
            this.selectingMultiple = false
          }

          /**
           *
           * @param {Device} device
           * @param {number} i
           * @param  $event
           */
          toggle (device, i, $event) {
            $event.stopPropagation()
            if ($event.shiftKey) {
              const start = Math.min(this.lastSelectedIndex, i)
              const end = Math.max(this.lastSelectedIndex, i)
              const devicesToSelect = getter.devices.slice(start, end + 1)
              this.select(...devicesToSelect)
            } else if ($event.ctrlKey || $event.metaKey) {
              this._toggle(device)
            } else if (this.selectingMultiple) {
              this._toggle(device)
              if (!this.length) this.selectingMultiple = false
            } else { // Normal click
              if (this.isSelected(device) && this.length === 1) {
                this.deselect(device) // todo this differs from orig
              } else {
                this.deselectAll()
                this.select(device)
              }
            }
            this.lastSelectedIndex = i
          }

          multi (device) {
            // detect touch screen
            // https://stackoverflow.com/questions/29747004/find-if-device-is-touch-screen-then-apply-touch-event-instead-of-click-event
            // https://hacks.mozilla.org/2013/04/detecting-touch-its-the-why-not-the-how/ links
            // above do not work on Windows 10 due to:
            // https://bugs.chromium.org/p/chromium/issues/detail?id=676808 TODO needs testing on
            // different devices + OS
            let supportsTouch = $scope.supportsTouch = (!!window.ontouchstart) || navigator.msMaxTouchPoints
            if (supportsTouch) {
              return
            }
            this.selectingMultiple = true
            // change to multi-select (changes normal click/touch behaviour)
            if (!this.isSelected()) this._toggle(device)
          }

          _toggle (device) {
            if (this.isSelected(device)) this.deselect(device)
            else this.add(device)
          }

          isSelected (device) {
            return !!_.find(this, device, {id: device.id})
          }

          deselectAll () {
            this.length = 0
            this.lastSelectedIndex = 0 // todo review
            $scope.selectionPanelHiddenXS = true
          }

          select (...devices) {
            this.deselect(...devices)
            this.push(...devices)
          }

          deselect (...devices) {
            _.pullAllBy(this, devices, 'id')
          }

          /**
           * Deselects the devices that are not in the provided
           * array.
           * @param {Device[]} devices
           */
          deselectDevicesNotIn (devices) {
            const intersection = _.intersectionBy(this, devices, 'id')
            this.length = 0
            this.push(...intersection)
          }
        }

        const selected = $scope.selected = new SelectedDevices()

        class LotsManager {
          constructor () {
            this.selector = LotsSelector
            this.selector.callbackOnSelection(x => this.updateSelection(x))
            /**
             * Selected lots
             * @type {module:resources.Lot[]}
             */
            this.lots = []
          }

          /**
           * @param {module:resources.Lot[]} selectedLots
           */
          updateSelection (selectedLots = []) {
            this.lots = selectedLots
            this.title = _.map(selectedLots, 'name').join(', ')
            // Update filter
            getter.setFilter('lot', {id: _.map(selectedLots, 'id')})
          }

          reload () {
            // todo review
            this.selector.deselectAll()
            $rootScope.$broadcast('lots:reload')
          }

          deleteSelection () {
            // todo do
            Promise
              .all(this.lots.map(lot => lot.delete()))
              .then(() => {
                Notification.success('Successfully deleted ' + this.lots.length + ' lots.')
                this.reload()
              })
          }
        }

        const lotsM = $scope.lotsM = new LotsManager()

        // As we touch config in the init, we add it to $scope at the end to avoid $watch
        // triggering multiple times
        $scope.config = config
      }
    }
  }
}

module.exports = resourceList
