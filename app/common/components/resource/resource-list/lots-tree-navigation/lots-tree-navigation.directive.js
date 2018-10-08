function lotsTreeNavigation (resourceListConfig, ResourceListGetter, progressBar, $rootScope, LotsSelector) {
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

        // get data
        $scope.lots = [] // TODO rename to data
        // Set up getters for lots
        const getterLots = new ResourceListGetter('Lot', $scope.lots, config, progressBar, null)
        getterLots.updateSort('label')
        getterLots.callbackOnGetting(() => {
          $scope.totalNumberOfLots = getterLots.getTotalNumberResources()
          $scope.moreLotsAvailable = $scope.totalNumberOfLots > $scope.lots.length
          // TODO set lots to $scope.data

          $scope.findNodes()
        })
        // TODO delete as soon as getter works
        _.assign($scope.data, [
          {
            'id': 1,
            'name': 'Donación BCN Activa',
            'nodes': [
              {
                'id': 11,
                'name': '2017',
                'nodes': [
                  {
                    'id': 111,
                    'name': 'Febrero',
                    'nodes': []
                  },
                  {
                    'id': 112,
                    'name': 'Marzo',
                    'nodes': []
                  }
                ]
              },
              {
                'id': 12,
                'name': '2018',
                'nodes': []
              }
            ]
          },
          {
            'id': 2,
            'name': 'Banc de Recurs',
            'nodes': []
          },
          {
            'id': 3,
            'name': 'Salidas',
            'nodes': [
              {
                'id': 2,
                'name': 'Banc de Recurs',
                'nodes': []
              }
            ]
          }
        ])
        $scope.findNodes()
      }
    }
  }
}

module.exports = lotsTreeNavigation
