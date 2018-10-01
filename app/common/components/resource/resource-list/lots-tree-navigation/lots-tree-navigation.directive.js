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
        let selectedLots = []
        $scope.treeTemplateURL = PATH + '/lots-tree.html'
        $scope.openLot = (lot) => {
          selectedLots = [lot]
          $scope.onLotSelectionChanged({ selectedLots: selectedLots })
        }
        $scope.toggle = function (scope) {
          scope.toggle()
        }
        $scope.data = [
          {
            'id': 1,
            'title': 'node1',
            'nodes': [
              {
                'id': 11,
                'title': 'node1.1',
                'nodes': [
                  {
                    'id': 111,
                    'title': 'node1.1.1',
                    'nodes': [
                      {
                        'id': 1111,
                        'title': 'node1.1',
                        'nodes': [
                          {
                            'id': 111,
                            'title': 'node1.1.1',
                            'nodes': []
                          }
                        ]
                      },
                      {
                        'id': 1112,
                        'title': 'node1.2',
                        'nodes': []
                      }
                    ]
                  }
                ]
              },
              {
                'id': 12,
                'title': 'node1.2',
                'nodes': []
              }
            ]
          },
          {
            'id': 2,
            'title': 'node2',
            'nodes': [
              {
                'id': 21,
                'title': 'node2.1',
                'nodes': []
              },
              {
                'id': 22,
                'title': 'node2.2',
                'nodes': []
              }
            ]
          },
          {
            'id': 3,
            'title': 'node3',
            'nodes': [
              {
                'id': 31,
                'title': 'node3.1',
                'nodes': []
              }
            ]
          },
          {
            'id': 1111,
            'title': 'node1.1',
            'nodes': [
              {
                'id': 111,
                'title': 'node1.1.1',
                'nodes': []
              }
            ]
          }
        ]
        // $scope.data = [
        //   {
        //     'nodes': [
        //       {
        //         'nodes': []
        //       },
        //       {
        //         'nodes': []
        //       }
        //     ]
        //   }
        // ]
      }
    }
  }
}

module.exports = lotsTreeNavigation
