function resourceMapsLocations (ResourceSettings) {
  const CLUSTER_OPTIONS = {
    'title': 'Click to see more devices.',
    'gridSize': 60,
    'ignoreHidden': true,
    'minimumClusterSize': 2
  }
  return {
    template: require('./resource-maps-locations.directive.html'),
    restrict: 'E',
    scope: {},
    link: {
      pre: $scope => {
        const promise = ResourceSettings('Event').server.getList({where: {'geo': {'$exists': true}}})
        promise.then(() => { $scope.loaded = true })
        $scope.key = $scope.key || 'geo'
        let map = {
          markers: {
            models: promise.$object,
            clusterOptions: CLUSTER_OPTIONS,
            events: {
              click: (markers, eventName, model) => {
                map.window.coords = model.geo
                map.window.show = true
                map.window.model = model
              }
            }
          },
          window: {
            marker: {},
            show: false,
            closeClick: () => {
              map.window.show = false
            },
            options: {
              pixelOffset: {
                height: -25,
                width: 0
              }
            },
            templateUrl: require('./__init__').PATH + '/resource-maps-locations.window.directive.html'
          },
          options: {
            clickableIcons: false
          },
          // We do not use them as we set 'fit' to 'markers' directive, but they are required by angular-google-maps
          center: {latitude: 0, longitude: 0},
          zoom: 1
        }
        ensureMapIsDisplayed(map)
        $scope.map = map
      }
    }
  }
}

/**
 * Ensures, when displaying the map for second time, that this is showed, as there is a bug that prevents so.
 */
function ensureMapIsDisplayed (map) {
  map.control = {} // angular-google-maps populates this
  setTimeout(() => {
    try { window.google.maps.event.trigger(map.control.getGMap(), 'resize') } catch (e) {}
  }, 300)
}

module.exports = resourceMapsLocations
