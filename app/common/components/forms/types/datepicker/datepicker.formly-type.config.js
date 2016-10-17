function datepicker (formlyConfigProvider) {
  // noinspection JSUnusedGlobalSymbols
  formlyConfigProvider.setType({
    name: 'datepicker',
    templateUrl: window.COMPONENTS + '/forms/types/datepicker/datepicker.formly-type.config.html',
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    apiCheck: function (check) {
      return {
        templateOptions: {
          datepickerOptions: check.object
        }
      }
    },
    defaultOptions: {
      templateOptions: {
        datepickerOptions: {
          format: 'shortDate'
        }
      }
    },
    controller: ['$scope', function ($scope) {
      $scope.datepicker = {}
      $scope.datepicker.opened = false
      $scope.datepicker.open = function ($event) {
        $scope.datepicker.opened = !$scope.datepicker.opened
      }
      $scope.$watch('model[options.key]', function (newV) {
        if (typeof newV !== 'undefined') {
          if (newV == null) {
            delete $scope.model[$scope.options.key]
          }
        }
      })
    }]
  })
}

module.exports = datepicker
