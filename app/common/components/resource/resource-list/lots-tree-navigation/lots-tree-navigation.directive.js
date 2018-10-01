function lotsTreeNavigation () {
  const PATH = require('./__init__').PATH
  // const PATH = 'common/components/resource/resource-list/lots-tree-navigation'
  return {
    template: require('./lots-tree-navigation.directive.html'),
    restrict: 'E',
    scope: {
      onLotSelectionChanged: '&'
    },
    link: {
      pre: ($scope) => {
        $scope.selectedNodes = {}
        $scope.treeTemplateURL = PATH + '/lots-tree.html'
        $scope.searchQuery
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
            $scope.selectedNodes[lot.id] = lot
          } else { // normal click
            let isSelected = !!$scope.selectedNodes[lot.id]
            $scope.selectedNodes = {}
            if (!isSelected) {
              $scope.selectedNodes[lot.id] = lot
            }
          }
          $scope.onLotSelectionChanged({ selectedLots: Object.values($scope.selectedNodes) })
        }

        $scope.toggleExpand = function (scope) {
          scope.toggle()
        }
        $scope.data = [
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
        ]
        // $scope.data = [
        //   {
        //     'lots': [
        //       {
        //         'lots': []
        //       },
        //       {
        //         'lots': []
        //       }
        //     ]
        //   }
        // ]
      }
    }
  }
}

module.exports = lotsTreeNavigation
