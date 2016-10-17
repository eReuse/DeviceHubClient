var TIMEOUT = 5000
var MAXIMUM_AGE = 5000
var MARGIN = 0.0002
var DUMMY_LATITUDE = 41.732
var DUMMY_LONGITUDE = 1.848

function geoLocation ($geolocation) {
  this.path = null
  this.center = null
  var self = this
  this.getUserPosition = function (enableHighAccuracy) {
    return $geolocation.getCurrentPosition({
      timeout: TIMEOUT,
      maximumAge: MAXIMUM_AGE,
      enableHighAccuracy: enableHighAccuracy || true
    }).then(function (position) {
      self.path = setPath(position.coords.latitude, position.coords.longitude)
      self.center = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    })
  }
  this.getDummyPosition = function () {
    self.path = setPath(DUMMY_LATITUDE, DUMMY_LONGITUDE)
    self.center = {
      latitude: DUMMY_LATITUDE,
      longitude: DUMMY_LONGITUDE
    }
  }
  return this
}

function setPath (latitude, longitude) {
  return [
    {
      latitude: latitude,
      longitude: longitude
    },
    {
      latitude: latitude,
      longitude: longitude + MARGIN
    },
    {
      latitude: latitude + MARGIN,
      longitude: longitude + MARGIN
    },
    {
      latitude: latitude + MARGIN,
      longitude: longitude
    }
  ]
}

module.exports = geoLocation
