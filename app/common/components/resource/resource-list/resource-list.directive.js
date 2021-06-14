/**
 * @param {module:resources} resources
 * @param {module:resourceListConfig} resourceListConfig
 * @param  progressBar
 * @param Notification
 * @param {module:deviceGetter} deviceGetter
 * @param {module:selection} selection
 */
function resourceList ($rootScope, $state, session, resourceListConfig, Notification, deviceGetter, selection, resources) {
  return {
    template: require('./resource-list.directive.html'),
    restrict: 'E',
    scope: {},
    link: {
      /**
       * @param {Object} $scope
       * @param {Object} $scope.Notification
       * @param {Object} $scope._sort
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

        $scope.user = session.user

        /**
         * State of the selection panel (shown/hidden) when in xs or
         * sm.
         *
         * This variable is only set to false when the user presses
         * a button only visible in xs / sm screens.
         * @type {boolean}
         */
        class VisibleXs {
          constructor () {
            this.visible = false
          }

          toggle () {
            this.visible = !this.visible
          }

          show () {
            this.visible = true
          }

          hide () {
            this.visible = false
          }
        }

        $scope.lotXs = new VisibleXs()
        $scope.selectionXs = new VisibleXs()

        class DeviceListGetter extends deviceGetter.DeviceGetter {
          get (getNextPage, ...params) {
            return super.get(getNextPage, ...params).then(() => {
              selected.deselectNotIn(this.devices)
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
         * @extends module:selection.Selected
         */
        class SelectedDevices extends selection.Selected {
          toggle (item, i, $event) {
            return super.toggle(item, i, $event, getter.devices)
          }

          deselectAll () {
            super.deselectAll()
            $scope.selectionPanelHiddenXS = true
          }

          selectAll () {
            super.selectAll(getter.devices)
          }
        }

        /** TODO new-trade: 
         *  create SelectedDocuments to allow selection of documents like so:
         *    class SelectedDocuments extends selection.Selected {
         *    ...
         *    }
         *    const selectedDocuments = $scope.selectedDocuments = new SelectedDocuments()
         */


        /** TODO new-trade: rename to selectedDevices */
        const selected = $scope.selected = new SelectedDevices()
        $scope.onLotsSelectionChanged = lots => {
          getter.setFilter('lot', {id: _.map(lots, 'id')})
        }

        class LotsManager {
          constructor () {
            /**
             * Selected lots
             * @type {module:selection.Selected}
             */
            this.lots = []
          }

          deleteLots (lots) {
            async function deleteLotsSerial(lots) {
              for(const lot of lots) {
                await lot.delete()
              }
              return new Promise(resolve => {
                resolve()
              })
            }

            deleteLotsSerial(lots)

            this.deselectAll()
            $rootScope.$broadcast('lots:reload')
          }

          createTradeForLot(lot, participants = {}) {
            console.log('creating trade for lot', lot, ', participants', participants)
            const action = new resources.Trade({devices: lot.devices, lot: lot, userToEmail: participants.to, userFromEmail: participants.from})
            $state.go('.newAction', {action: action})
          }

          addTradeDocument(lot) {
            const doc = new resources.TradeDocument({lot: lot})
            $state.go('.newTradeDocument', {doc: doc})
          }

          /**
           * @param {module:resources.Lot[]} lots
           */
          updateSelection (lots) {
            this.lots = lots
            this.title = _.map(lots, 'name').join(', ')
            // Update filter
            if (lots.length) {
              getter.setFilter('lot', {id: _.map(lots, 'id')})
            } else {
              getter.removeFilter('lot')
            }
          }

          deselectAll () {
            this.lots.deselectAll()
          }
        }

        $scope.lotsM = new LotsManager()

        $scope.$on('devices:reload', () => {
          selected.deselectAll()
          getter.reload()
        })
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
            if (tableBottom < almostWindowBottom) $scope.getter.gentlyGet(true, false)
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
