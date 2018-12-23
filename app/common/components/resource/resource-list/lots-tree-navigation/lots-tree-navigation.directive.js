function lotsTreeNavigation (resourceListConfig, ResourceListGetter, progressBar, $rootScope, LotsSelector, ResourceSettings, resources) {
  const PATH = require('./__init__').PATH
  // const PATH = 'common/components/resource/resource-list/lots-tree-navigation'
  return {
    template: require('./lots-tree-navigation.directive.html'),
    restrict: 'E',
    scope: {
      resourceType: '@'
    },
    link: {
      pre: ($scope) => {
        const config = _.cloneDeep(resourceListConfig)
        $scope.treeTemplateURL = PATH + '/lots-tree.html'
        $scope.selector = LotsSelector

        /**
         * Finds nodes containing text and makes them visible
         * @param {string} text
         */
        function makeNodesWithTextVisible (text) {
          /** @param {module:resources.LotNode} node */
          function visibleIfHasText (node) {
            let atLeastOneChildVisible = false
            node.nodes.forEach(child => {
              let childIsVisible = visibleIfHasText(child)
              if (childIsVisible) atLeastOneChildVisible = true
              node.isVisible = !text || node.hasText(text) || atLeastOneChildVisible
              return node.isVisible
            })
          }

          $scope.lots.tree.forEach((node) => visibleIfHasText(node))
        }

        $scope.makeNodesWithTextVisible = makeNodesWithTextVisible

        $scope.treeOptions = {
          dropped: function ($event) {
            // if element was not moved, use click event
            if ($event.source.index === $event.dest.index) {
              $scope.toggleLot($event.source.nodeScope.$modelValue, $event)
              return true
            }

            let lot = _.get($event, 'source.nodeScope.$modelValue')
            let previousParent = _.get($event, 'source.nodeScope.$parentNodeScope.node')
            let selectedParent = _.get($event, 'dest.nodesScope.node')

            if (!lot) {
              return false
            } else if (!selectedParent && !previousParent) {
              return false
            }
            const query = {
              id: lot._id
            }
            let promises = []
            if (previousParent) {
              promises.push(ResourceSettings('Lot').server.one(previousParent._id).all('children').remove(query))
            }
            if (selectedParent) {
              promises.push(ResourceSettings('Lot').server.one(selectedParent._id).all('children').post(null, query))
            }
            Promise.all(promises).then(() => {
              reload()
            })
          }
        }

        $scope.toggleLot = (lot, $event) => {
          if ($event.ctrlKey || $event.metaKey) {
            $scope.selector.toggleMultipleSelection(lot)
          } else { // normal click
            $scope.selector.toggle(lot)
          }
        }

        $scope.toggleExpand = function (scope) {
          scope.toggle()
        }

        function newLot (parentLot) {
          function startEditing (lot) {
            reload().then(() => {
              // TODO set newly created lot's resource-field-edit to editing
            })
          }

          ResourceSettings('Lot').server.post({name: 'New lot'}).then(childLot => {
            if (parentLot) {
              ResourceSettings('Lot').server
                .one(parentLot._id)
                .post('children', null, {id: childLot._id})
                .then(() => {
                  startEditing(childLot)
                })
            } else {
              startEditing(childLot)
            }
          })
        }

        $scope.newChildLot = (parentLot) => {
          newLot(parentLot)
        }

        $scope.newLot = ($event) => {
          $event && $event.preventDefault()
          $event && $event.stopPropagation()
          newLot()
        }

        function reload () {
          resources.Lot.server.getList({format: 'UiTree'}).then(lots => {
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
