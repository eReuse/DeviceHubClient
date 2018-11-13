function lotsTreeNavigation (resourceListConfig, ResourceListGetter, progressBar, $rootScope, LotsSelector, ResourceSettings) {
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
        $scope.data = []
        $scope.selector = LotsSelector

        $scope.findNodes = function (filter) {
          function markAsVisible (node) {
            let oneChildVisible = false
            node.nodes && node.nodes.forEach((child) => {
              let childIsVisible = markAsVisible(child)
              if (childIsVisible) {
                oneChildVisible = true
              }
            })
            node.isVisible = !filter ||
                            filter.length === 0 ||
                            node.name.indexOf(filter) !== -1 ||
                            oneChildVisible
            return node.isVisible
          }

          $scope.data.forEach((node) => markAsVisible(node))
        }

        $scope.treeOptions = {
          // beforeDrop : function ($event) {
          // },
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
          /*
          TODO implement shift select
          if ($event.shiftKey) {
            let lastSelectedIndex = $scope.lastSelectedIndex || 0
            let start = Math.min(lastSelectedIndex, $index)
            let end = Math.max(lastSelectedIndex, $index)
            let devicesToSelect = $scope.lots.slice(start, end + 1)
            selector.selectAll(devicesToSelect)
          } else
          */
          if ($event.ctrlKey) {
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
                .post('children', null, { id: childLot._id })
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

        // get data
        $scope.data = []
        // Set up getters for lots
        const getterLots = new ResourceListGetter('Lot', $scope.data, config, progressBar, null, 'UiTree')
        getterLots.updateSort('name')
        getterLots.callbackOnGetting(() => {
          $scope.totalNumberOfLots = getterLots.getTotalNumberResources()
          $scope.moreLotsAvailable = $scope.totalNumberOfLots > $scope.data.length
          $scope.findNodes()
        })

        function reload () {
          return getterLots.getResources()
        }

        $scope.$on('lots:reload', () => {
          reload()
        })
      }
    }
  }
}

module.exports = lotsTreeNavigation
