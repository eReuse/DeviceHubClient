/**
 *
 * @param progressBar
 * @param $rootScope
 * @param {module:selection} selection
 * @param {module:resources} resources
 */
function lotsTreeNavigation (progressBar, $rootScope, $state, selection, resources) {
  const PATH = require('./__init__').PATH
  // const PATH = 'common/components/resource/resource-list/lots-tree-navigation'

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
        $scope.treeTemplateURL = PATH + '/lots-tree.html'

        /**
         * Finds nodes containing text and makes them visible
         * @param {string} text
         */
        $scope.makeNodesWithTextVisible = text => {
          /** @param {module:resources.LotNode} node */
          function visibleIfHasText (node) {
            let atLeastOneChildVisible = false
            node.nodes.forEach(child => {
              let childIsVisible = visibleIfHasText(child)
              if (childIsVisible) atLeastOneChildVisible = true
            })
            node.isVisible = !text || node.hasText(text) || atLeastOneChildVisible
            return node.isVisible
          }

          $scope.lots.tree.forEach(visibleIfHasText)
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

        function newIncomingLot (parentLotId = null) {
          $state.go('auth.createDeliveryNote')
        }

        $scope.newIncomingLot = newIncomingLot

        /**
         * Creates a new lot.
         * @param {?string} parentLotId
         */
        function newLot (parentLotId = null) {
          const lot = new resources.Lot({
            name: 'New lot',
            parents: parentLotId ? [parentLotId] : undefined
          })
          lot.post().then(() => {
            if (parentLotId) {
              reload()
            } else {
              $scope.lots.addToTree(lot.id)
            }
          })
        }

        $scope.newLot = newLot

        $scope.newChildLot = parentLotId => {
          newLot(parentLotId)
        }

        $scope.newLot = $event => {
          $event && $event.preventDefault()
          $event && $event.stopPropagation()
          newLot()
        }

        function reload () {
          resources.Lot.server.get('', {params: {format: 'UiTree'}}).then(lots => {
            $scope.lots = lots
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
