/**
 * @param {module:resources} resources
 * @param {module:resourceListConfig} resourceListConfig
 * @param  progressBar
 * @param Notification
 * @param {module:LotsSelector} LotsSelector
 * @param {module:deviceGetter} deviceGetter
 * @param {module:selection} selection
 */
function resourceList (resources, resourceListConfig, progressBar, Notification, LotsSelector, deviceGetter, selection) {
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
