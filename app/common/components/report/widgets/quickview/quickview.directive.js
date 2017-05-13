function quickview (ResourceServer) {
  const SERVER_SETTINGS = {
    url: 'inventory',
    useDefaultDatabase: false
  }
  const server = ResourceServer(SERVER_SETTINGS)
  const SETTINGS = {
    devicesMoreThanWeekWithoutBeingProcessed: {
      title: 'Devices from last week to prepare',
      subtitle: 'Devices more than one week older that are placeholders or have only been registered. Perform an' +
      ' event to them, like <em>Ready</em>, <em>ToRepair</em> or <em>ToDispose</em> to dismiss this message.'
    },
    hardDrivesWithErrors: {
      title: 'Hard drives with errors',
      subtitle: '&hellip;that are not yet disposed.',
      warning: 1
    },
    devicesNotFullyProcessed: {
      title: 'Devices not fully processed',
      subtitle: '&hellip;that are not <em>ready</em> or <em>disposed</em>.',
      warning: 20
    },
    placeholders: {
      title: 'Placeholders',
      subtitle: '&hellip;not yet discovered.'
    }
  }
  return {
    templateUrl: require('./__init__').PATH + '/quickview.directive.html',
    restrict: 'E',
    scope: {
      resources: '='
    },
    link: {
      pre: $scope => {
        $scope.data = {}
        $scope.SETTINGS = SETTINGS
        server.one().get().then(response => {
          _.assign($scope.data, response.plain())
        })
      }
    }
  }
}

module.exports = quickview
