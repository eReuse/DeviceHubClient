var utils = require('./../../utils.js')
var OPERATION = {
  put: 'updated',
  post: 'created',
  delete: 'deleted'
}

function formSchema (cerberusToFormly, ResourceSettings, $rootScope, Notification) {
  return {
    templateUrl: window.COMPONENTS + '/forms/form-schema/form-schema.directive.html',
    restrict: 'E',
    scope: {
      model: '=',
      options: '=',
      status: '=' // list
    },
    link: function ($scope) {
      var rSettings = ResourceSettings($scope.model['@type'])
      $scope.form
      window.fss = $scope // todo remove
      var options = setOptions($scope.model['@type'], $scope.options, rSettings)
      $scope.fields = cerberusToFormly.parse($scope.model, $scope, options) // parse adds 'nonModifiable' to options
      $scope.submit = submitFactory($scope.fields, $scope.form, $scope.status, rSettings, $rootScope, Notification)
      $scope.options.canDelete = 'remove' in $scope.model
      $scope.options.delete = deleteFactory($scope.model, $rootScope, $scope.status, Notification)
    }
  }
}

function submitFactory (fields, form, status, rSettings, $rootScope, Notification) {
  return function (originalModel) {
    status.errorFromLocal = false
    if (isValid(form, fields)) {
      status.working = true
      var model = utils.copy(originalModel) // We are going to change stuff in model
      removeHelperValues(model)
      upload(rSettings, model, $rootScope).then(
        succeedSubmissionFactory($rootScope, status, Notification, OPERATION['put' in model ? 'put' : 'post'], model),
        failedSubmissionFactory(status)
      )
    } else {
      status.errorFromLocal = true
    }
  }
}

function removeHelperValues (model) {
  for (var fieldName in model) {
    if (_.includes(fieldName, 'exclude_')) {
      delete model[fieldName]
    }
  }
}

function upload (rSettings, model) {
  return 'put' in model ? model.put() : rSettings.server.post(model)
}

function succeedSubmissionFactory ($rootScope, status, Notification, operationName, model) {
  return function (response) {
    var resource = _.isUndefined(response) ? model : response // DELETE operations do not answer with the result
    $rootScope.$broadcast('refresh@' + utils.Naming.resource(model['@type']))
    status.working = false
    status.done = true
    Notification.success(utils.getResourceTitle(resource) + ' successfully ' + operationName + '.')
  }
}

function failedSubmissionFactory (status) {
  return function (response) {
    status.working = false
    status.errorListFromServer = response.data._issues
  }
}

function setOptions (type, options, rSettings) {
  var settings = {
    excludeLabels: { // In fact we do not need to pass always all labels, just the ones we want to use
      receiver: 'Check if the receiver has already an account',
      to: 'Check if the new possessor has already an account'
    }
  }
  settings.doNotUse = options.doNotUse || []
  try {
    settings.doNotUse += rSettings.settings.doNotUse
  } catch (error) {}
  return settings
}

function isValid (form, schema) {
  if (!form.$valid) {
    return false
  } else {
    var valid = true
    schema.forEach(function (field) {
      try {
        if (!field.validators.or()) {
          valid = false
        }
      } catch (err) {}
    })
    return valid
  }
}

function deleteFactory (model, $rootScope, status, Notification) {
  return function () {
    if (confirm('Are you sure you want to delete it?')) {
      model.remove().then(
        succeedSubmissionFactory($rootScope, status, Notification, OPERATION.delete, model),
        failedSubmissionFactory(status)
      )
    }
  }
}

module.exports = formSchema
