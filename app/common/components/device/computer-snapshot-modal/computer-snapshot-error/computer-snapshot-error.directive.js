function registerErrorProcessor (ResourceSettings) {
  var TEMPLATE_NEEDS_ID_URL = require('./__init__').PATH + '/computer-snapshot-error-needs-id.directive.html'
  var TEMPLATE = require('./__init__').PATH + '/computer-snapshot-error.directive.html'
  var TEMPLATE_RESULT_OK = require('./__init__').PATH + '/computer-snapshot-error-result-ok.directive.html'
  var TEMPLATE_ALREADY_UPLOADED = require('./__init__').PATH + '/computer-snapshot-error-already-uploaded.directive.html'
  return {
    template: '<ng-include src="templateUrl"/>',
    restrict: 'E',
    scope: {
      status: '=',
      error: '='
    },
    link: function ($scope) {
      processError($scope, $scope.error.object.data)
      $scope.update = update($scope, $scope.error.fileContent)
      $scope.insert = insert($scope, $scope.error.fileContent)
      $scope.$on('modal.closing')
    }
  }

  function processError ($scope, content) {
    $scope.error.solved = $scope.type === 'json'
    $scope.content = content
    $scope.cannotCreateId = cannotCreateId(content)
    if (needsId(content) || $scope.cannotCreateId) {
      $scope.templateUrl = TEMPLATE_NEEDS_ID_URL
    } else if (alreadyUploaded(content)) {
      $scope.templateUrl = TEMPLATE_ALREADY_UPLOADED
      $scope.error.solved = true
    } else {
      $scope.templateUrl = TEMPLATE
    }
    if ($scope.error.solved) --$scope.status.unsolved
  }

  function needsId (content) {
    /**
     * @param {object} errors An object with the following structure: {_issues:{_id: ['stringRepresentingObject', '...']}} This
     * method will return false if the structure is not followed.
     */
    try {
      return _.find(content._issues._id, function (error) {
        return _.includes(error, 'NeedsId')
      })
    } catch (error) {
      return false
    }
  }

  function cannotCreateId (content) {
    try {
      return _.find(content._issues._id, function (error) {
        return _.includes(error, 'CannotCreateId')
      })
    } catch (error) {
      return false
    }
  }

  function alreadyUploaded (content) {
    try {
      return _.find(content._issues._uuid, function (error) {
        return _.includes(error, 'NotUnique')
      })
    } catch (error) {
      return false
    }
  }

  function update ($scope, snapshot) {
    return function (identifier) {
      snapshot.device._id = identifier
      submit($scope, snapshot)
    }
  }

  function insert ($scope, snapshot) {
    return function () {
      snapshot.device.forceCreation = true
      submit($scope, snapshot)
    }
  }

  function submit ($scope, snapshot) {
    ResourceSettings('devices:Snapshot').server.post(snapshot).then(function () {
      resultOk($scope)
    }, function (response) {
      delete snapshot.device._id // We leave the snapshot in original state
      delete snapshot.device.forceCreation
      processError($scope, response.data)
    })
  }

  function resultOk ($scope) {
    $scope.error.solved = true
    --$scope.status.unsolved
    $scope.templateUrl = TEMPLATE_RESULT_OK
  }
}

module.exports = registerErrorProcessor
