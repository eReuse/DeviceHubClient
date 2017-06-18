const utils = require('../../utils')
const isPresent = require('is-present')

function labelEdit (CONSTANTS, ResourceSettings) {
  const SIZE = {
    normal: {
      width: 97,
      height: 59,
      minHeight: 49,
      minWidth: 52
    },
    small: {
      width: 97,
      height: 32,
      minHeight: 28,
      minWidth: 52
    },
    smallWarning: {
      width: 60,
      height: 35
    }
  }
  return {
    template: require('./label-edit.directive.html'),
    restrict: 'E',
    scope: {
      resource: '=',
      model: '=',
      api: '='
    },
    link: {
      pre: $scope => {
        // We take the root ancestor to ensure getting a schema with all fields
        const rSettings = ResourceSettings($scope.resource['@type']).rootAncestor
        const schema = rSettings.schema
        const labelSettings = rSettings.getSetting('label')
        const LOCAL_STORAGE_KEY = `resourceLabelEdit.${rSettings.type}`
        const FIELDS = _(labelSettings.fields).map(fieldName => ({
          name: fieldName,
          humanName: utils.Naming.humanize(fieldName),
          short: schema[fieldName].short,
          type: schema[fieldName].type
        })).value()
        const DEFAULT_MODEL = {
          size: SIZE.normal,
          useLogo: true,
          logo: CONSTANTS.defaultLabelLogo,
          showFieldNames: true,
          fields: _.filter(FIELDS, field => _.includes(labelSettings.defaultFields, field.name))
        }
        $scope.smallWarning = SIZE.smallWarning
        $scope.fields = FIELDS

        function setDefaults () {
          _.assign($scope.model, _.cloneDeep(DEFAULT_MODEL))
        }

        $scope.$watch('model.useLogo', useLogo => {
          $scope.model.size = _.clone(useLogo ? SIZE.normal : SIZE.small)
        })

        function saveToLocalStorage () {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify($scope.model))
        }

        function getFromLocalStorage () {
          const item = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
          const present = isPresent(item)
          if (present) $scope.model = item
          return present
        }

        window.onbeforeunload = saveToLocalStorage
        $scope.$on('$destroy', () => {
          saveToLocalStorage()
          window.onbeforeunload = _.noop
        })
        $scope.api.reset = setDefaults
        utils.setImageGetter($scope, '#logoUpload', 'model.logo')
        if (!getFromLocalStorage()) setDefaults()
      }
    }
  }
}

module.exports = labelEdit
