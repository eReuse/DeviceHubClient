function labelEdit (CONSTANTS, ResourceSettings) {
  var utils = require('../../../utils')
  return {
    templateUrl: require('./__init__').PATH + '/label-edit.directive.html',
    restrict: 'E',
    scope: {
      device: '=',
      set: '=',
      api: '='
    },
    link: function ($scope) {
      $scope.api.reset = () => {
        $scope.minHeight = 49
        _.assign($scope.set, {
          width: 97,
          height: 59,
          useLogo: true,
          logo: CONSTANTS.siteLogo,
          fields: []
        })
        const schema = ResourceSettings('Device').schema
        const fields = [
          'serialNumber', 'pid', 'model', 'manufacturer', 'labelId', 'hid', '_id', 'totalRamSize', 'totalHardDriveSize'
        ]
        $scope.fields = _.map(fields, value => {
          const field = {
            name: value,
            humanName: utils.Naming.humanize(value),
            short: schema[value].short,
            type: schema[value].type
          }
          if (value === 'labelId' || value === '_id') $scope.set.fields.push(field) // Generate defaults
          return field
        })
      }
      $scope.api.reset()
      utils.setImageGetter($scope, '#logoUpload', 'set.logo')
      $scope.$watch('set.useLogo', function (newV) {
        if (newV === false) {
          oldHeight = $scope.set.height
          $scope.set.height = 32
          $scope.minHeight = 29
        } else {
          $scope.set.height = oldHeight
          $scope.minHeight = 49
        }
      })

      var LOCAL_STORAGE_KEY = 'deviceLabelEdit'

      function saveToLocalStorage () {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify($scope.set))
      }

      function getFromLocalStorage () {
        var item = localStorage.getItem(LOCAL_STORAGE_KEY)
        _.extend($scope.set, JSON.parse(item))
      }

      window.onbeforeunload = saveToLocalStorage
      $scope.$on('$destroy', function () {
        saveToLocalStorage()
        window.onbeforeunload = _.noop
      })
      getFromLocalStorage()
      var oldHeight = $scope.set.height
    }
  }
}

module.exports = labelEdit
