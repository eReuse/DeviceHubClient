const saveAs = require('file-saver').saveAs

function sellView ($http, CONSTANTS, session) {
  return {
    template: require('./sell-view.directive.html'),
    restrict: 'E',
    scope: {
      resource: '='
    },
    link: $scope => {
      $scope.download = (name, uri, mimeType) => {
        $http({
          method: 'GET',
          url: CONSTANTS.url + '/' + session.db + uri,
          headers: {Accept: mimeType, Authorization: 'Basic ' + session.account.token},
          responseType: 'arraybuffer'
        }).success(data => {
          const file = new File([data], name, {type: mimeType})
          saveAs(file)
        })
      }
    }
  }
}

module.exports = sellView
