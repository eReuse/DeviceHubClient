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
        $scope.popover.title = $translate.instant('lot.device.add')
        $scope.form = new LotDeviceAddForm(true)
      }
      $scope.openRemove = () => {
        $scope.popover.isOpen = true
        $scope.popover.title = $translate.instant('lot.device.remove')
        $scope.form = new LotDeviceRemoveForm(false)
      }

      class LotDeviceForm extends fields.Form {
        constructor (add, ...args) {
          super(...args)
          this.add = add
        }

        _submit () {
          const ids = _.map($scope.devices, 'id')
          const lot = resources.Lot.CACHE[this.model.lotId]
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

      class LotDeviceAddForm extends LotDeviceForm {
        constructor () {
          super(true, {}, new fields.Typeahead('lotId', {
              resources: resources.cache.lots,
              namespace: 'lot.device',
              required: true
            })
          )
        }
      }

      class LotDeviceRemoveForm extends LotDeviceForm {
        constructor () {
          super(false, {}, new fields.Select('lotId', {
            options: _($scope.devices)
              .flatMap('lots')
              .uniq()
              .sortBy(['name'])
              .map(l => new fields.Option(l.id, {name: l.name}))
              .value(),
            namespace: 'lot.device',
            required: true
          }))
        }
      }
    }
  }
}

module.exports = lotDeviceButton
