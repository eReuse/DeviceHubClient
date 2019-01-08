/**
 * @param {module:resources} resources
 * @param {module:resourceListConfig} resourceListConfig
 * @param  progressBar
 * @param Notification
 * @param {module:LotsSelector} LotsSelector
 * @param {module:deviceGetter} deviceGetter
 */
function resourceList (resources, resourceListConfig, progressBar, Notification, LotsSelector, deviceGetter) {
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

        class DeviceListGetter extends deviceGetter.DeviceGetter {
          get (getNextPage, ...params) {
            return super.get(getNextPage, ...params).then(() => {
              selected.deselectDevicesNotIn(this.devices)
              if (!getNextPage) $topElem.scrollTop(0) // Scroll to top when loading from 0
            })
          }
        }

        const getter = $scope.getter = new DeviceListGetter()

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
