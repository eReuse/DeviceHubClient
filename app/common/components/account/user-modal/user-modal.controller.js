function userModalCtrl ($scope, $uibModalInstance, ResourceSettings, session) {
  // $scope.account = session.account
  $scope.account = $.extend(true, {}, session.getAccount())
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel')
  }
  $scope.ok = function () {
    $('#accountForm').submit()
  }
  $scope.update = function (account) {
    // We will copy stuff to session once it is validated through the server.
    ResourceSettings('Account').server.one(session.getAccount()._id).customOperation('patch', '', {}, {}, {
      email: account.email,
      password: account.password,
      name: account.name
    }).then(function () {
      session.update(account.email, account.password, account.name)
    }, function (data) {
      alert('Verify that the data is correct and try again.')
    })
  }
  $scope.logout = function () {
    session.destroy()
    location.reload()
  }
}

module.exports = userModalCtrl
