/**
 *
 * @param progressBar
 * @param $rootScope
 * @param {module:selection} selection
 * @param {module:resources} resources
 */
function lotsTreeNavigation (progressBar, $rootScope, $state, selection, resources, session) {
  /**
   * @ngdoc directive
   * @name lotsTreeNavigation
   * @restrict E
   * @element lots-tree-navigation
   * @param {expression} onSelection
   */

  return {
    template: require('./lots-tree-navigation.directive.html'),
    restrict: 'E',
    scope: {
      onSelection: '&'
    },
    link: {
      pre: $scope => {
        /**
         * Finds lots containing text and makes them visible
         * @param {string} text
         */
        $scope.filterLots = text => {
          $scope.lots.forEach((lot) => {
            lot.isVisible = !text || lot.hasText(text)
          })
        }

        class LotsSelector extends selection.Selected {
          toggle (lot, $event) {
            $event.shiftKey = false // We avoid the shift key
            super.toggle(lot, undefined, $event, $scope.lots)
          }

          _after () {
            $scope.onSelection({lots: this})
          }
        }

        $scope.selected = new LotsSelector()

        $scope.newDeliverynote = () => {
          $state.go('auth.createDeliveryNote')
        }

        $scope.newLot = $event => {
          $event && $event.preventDefault()
          $event && $event.stopPropagation()

          const lot = new resources.Lot({
            name: 'New lot'
          })
          lot.post().then(() => {
            reload()
          })
        }

        function reload () {
          resources.Lot.server.get('').then(lots => {
            const arrayLots = new Array(...lots)
            $scope.lots = lots
            $scope.incoming = arrayLots.filter(l => l.deliverynote && l.deliverynote.receiver.id === session.user.id)
            $scope.outgoing = arrayLots.filter(l => l.deliverynote && l.deliverynote.supplier.id === session.user.id)
            $scope.temporary = arrayLots.filter(l => !l.deliverynote)
          })
        }

        reload()
        $scope.$on('lots:reload', () => {
          reload()
        })
      }
    }
  }
}

module.exports = lotsTreeNavigation
