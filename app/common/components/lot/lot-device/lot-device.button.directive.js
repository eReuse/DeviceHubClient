const PATH = require('./__init__').PATH

/**
 *
 * @param $translate
 * @param {module:fields} fields
 * @param {module:resources} resources
 */
function lotDeviceButton ($translate, fields, resources) {
  /**
   * @ngdoc directive
   * @name lotDeviceButton
   * @restrict E
   * @element lot-device-button
   * @param {expression} devices
   * @param {expression} allLots
   */
  return {
    template: require('./lot-device.button.directive.html'),
    restrict: 'E',
    scope: {
      devices: '=',
      allLots: '='
    },
    link: $scope => {
      $scope.popover = {
        templateUrl: `${PATH}/popover.html`,
        isOpen: false,
        title: ''
      }
      $scope.openAdd = () => {
        $scope.popover.isOpen = true
        $scope.popover.title = $translate.instant('lot.button.add')
        $scope.form = new LotDeviceForm(true)
      }
      $scope.openRemove = () => {
        $scope.popover.isOpen = true
        $scope.popover.title = $translate.instant('lot.button.remove')
        $scope.form = new LotDeviceForm(false)
      }

      class LotDeviceForm extends fields.Form {
        constructor (add) {
          super({},
            new fields.Typeahead('lotId', {
              resources: resources.cache.lots,
              namespace: 'lot.button'
            })
          )
          this.add = add
        }

        _submit () {
          const ids = _.map($scope.devices, 'id')
          const lot = resources.cache.lots[this.model.lotId]
          if (this.add) {
            return lot.addDevices(ids)
          } else {
            return lot.removeDevices(ids)
          }
        }

        _success (op, response, namespace) {
          super._success(op, response, namespace)
          $scope.popover.isOpen = false
        }
      }
    }
  }
}

module.exports = lotDeviceButton
