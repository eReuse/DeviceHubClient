/**
 * @param {module:resources} resources
 * @param {module:resourceListConfig} resourceListConfig
 * @param  progressBar
 * @param Notification
 * @param {module:LotsSelector} LotsSelector
 */
function resourceList (resources, resourceListConfig, progressBar, Notification, LotsSelector) {
  return {
    template: require('./resource-list.directive.html'),
    restrict: 'E',
    scope: {},
    link: {
      /**
       * @param {Object} $scope
       * @param {Object} $scope.Notification
       * @param {Object} $scope._sort
       * @param {function} $scope.showLots
       * @param {boolean} $scope.selectionPanelHiddenXS
       * @param {boolean} $scope.lotsSelectionHiddenXS
       * @param {LotsManager} $scope.lotsM
       * @param {module:resourceListConfig} $scope.config
       * @param {SelectedDevices} $scope.selected
       * @param $element
       */
      pre: ($scope, $element) => {
        // We load on 'pre' to initialize before our child
        // (or inner) directives so they get real config values
        $scope.Notification = Notification
        $scope.config = resourceListConfig
        const $topElem = $element.find('.fill-height-bar')

        $scope._sort = {} // Sort directive uses this internally

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
              /** @type {object.<string, object>} */
              filter: null, // null only when not initialized
              /** @type {string} */
              search: '',
              /** @type {object.<string, boolean>} */
              sort: null, // null only when not initialized
              /**
               * The page requested or null.
               * @type {?number}
               */
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

          /** Are the initial filters / sort being set already? */
          get ready () {
            return this.q.filter != null && this.q.sort != null
          }

          /** Override the filters and, if ready, get new devices. */
          setFilters (filters) {
            this.q.filter = filters
            if (this.ready) this.get(false)
          }

          /** Set a filter and, if ready, get new devices. */
          setFilter (key, value) {
            this.q.filter = this.q.filter || {}
            this.q.filter[key] = value
            if (this.ready) this.get(false)
          }

          /**
           * Set the search text and, if ready, get new devices.
           * @param {string} text - Search text.
           * */
          setSearch (text) {
            console.assert(_.isString(text))
            this.q.search = text
            if (this.ready) this.get(false)
          }

          /**
           * Override the sort and, if ready, get new devices.
           * @param {string} key
           * @param {boolean} order
           */
          setSort (key, order) {
            console.assert(_.isBoolean(order), 'Order must be boolean, not %s', order)
            this.q.sort = {[key]: order}
            this.get()
          }

          /**
           * Reload the devices.
           * @param showProgressBar
           * @return {*}
           */
          reload (showProgressBar = true) {
            return this.get(false, showProgressBar)
          }

          /**
           * Get new devices.
           *
           * This starts a new petition for more devices,
           * independently if there was another one before.
           *
           * @param {boolean} getNextPage - Fetch the next page.
           * @param {boolean} showProgressBar - Should we show the
           * progress bar?
           * @throws {NoMorePagesAvailable} - If `getNextPage`
           * but not next pages to get from.
           * @return {$q}
           */
          get (getNextPage = true, showProgressBar = true) {
            console.assert(this.ready, 'Getter is not yet ready to get devices.')
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
              if (!getNextPage) $topElem.scrollTop(0) // Scroll to top when loading from 0
            }).finally(() => {
              this.working = false
            })
          }

          /**
           * Get devices only if there are more pages and there is
           * not an already existing petition.
           * @return {?$q}
           */
          gentlyGet (getNextPage, showProgressBar) {
            if (!this.working && this.nextPage) return this.get(getNextPage, showProgressBar)
          }
        }

        class NoMorePagesAvailable extends Error {
        }

        const getter = $scope.getter = new DeviceGetter()

        /**
         * The devices that the user has selected.
         *
         * This is a normal array of devices that has extra methods
         * to select, deselect, and toggle selection.
         */
        class SelectedDevices extends Array {
          constructor (...devices) {
            super(...devices)
            this.lastSelectedIndex = 0
            /**
             * Is the user selecting multiple devices through
             *  long-pressing?
             *  */
            this.selectingMultiple = false
          }

          /**
           * Select or unselected a device or several, if
           * *shift* or *ctrl* are pressed.
           *
           * @param {Device} device
           * @param {number} i
           * @param {module:jquery.Event} $event
           */
          toggle (device, i, $event) {
            $event.stopPropagation()
            if ($event.shiftKey) {
              const start = Math.min(this.lastSelectedIndex, i)
              const end = Math.max(this.lastSelectedIndex, i)
              const devicesToSelect = _.slice(getter.devices, start, end + 1)
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
            // todo this is not used
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
            else this.select(device)
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
            // todo if length = 0 shouldn't we do like in 'deselectAll'?
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
            // $rootScope.$broadcast('lots:reload')
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

        $scope.lotsM = new LotsManager()
      },
      post: ($scope, $element) => {
        /**
         * Gets new devices under the Infinite scrolling.
         */
        class InfiniteScrolling {
          /**
           *
           * @param {string} container - The element that has the overflow
           * property.
           * @param {string} selector - The element that has the list of
           * things. It is inside container.
           */
          constructor (container, selector) {
            this.$window = $(window)
            this.$container = $element.find(container)
            this.$el = this.$container.find(selector)
            console.assert(this.$el.length === 1)
            this.$container.scroll(() => this.getIfNecessary())
          }

          getIfNecessary () {
            const tableBottom = this.$el.position().top + this.$el.height()
            const windowBottom = this.$window.height()
            const almostWindowBottom = windowBottom + (windowBottom * 0.3)
            if (tableBottom < almostWindowBottom) $scope.getter.gentlyGet()
          }
        }

        $scope.scrolling = new InfiniteScrolling(
          '#main-row .fill-height-bar',
          '#device-list-table'
        )
      }
    }
  }
}

module.exports = resourceList
