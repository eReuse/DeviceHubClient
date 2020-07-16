module.exports = angular.module('common.components.device', [])
  .directive('mergeDevicesButton', function (Notification, $translate) {
    return {
      template: require('./merge/merge-devices-button.directive.html'),
      restrict: 'E',
      scope: {
        devices: '='
      },
      /**
       * @param $scope
       * @param {module:resources.Device[]} $scope.devices
       */
      link: $scope => {
  
        $scope.merge = () => {
          const selectedDevices = $scope.devices
          if(selectedDevices.length !== 2) {
            Notification.warning($translate.instant('mergeDevices.wrongNumberDevices'))
            return
          }
          const baseDevice = selectedDevices[0]
          const mergedDevice = selectedDevices[1]
          
          const confirmed = confirm($translate.instant('mergeDevices.confirmMerge', {
            baseDevice: baseDevice.title,
            mergedDevice: mergedDevice.title,
          }));
    
          if (!confirmed) {
            Notification.warning($translate.instant('mergeDevices.mergeCancelled'))
            return
          } 

          const server = baseDevice.server
          const uri = baseDevice.id + '/merge/id=' + mergedDevice.id

          return server.post({}, uri).then(() => {
            Notification.success($translate.instant('mergeDevices.mergeSuccessfull'))
            $scope.$emit('devices:reload')
          })
        }
      }
    }
  })
