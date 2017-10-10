function sharedWithMe (session, ResourceBreadcrumb) {
  return {
    template: require('./shared-with-me.directive.html'),
    restrict: 'E',
    replace: true,
    scope: false, // It should be {} but it doesn't work with replace
    link: $scope => {
      $scope.session = session
      $scope.sharedWithMe = {
        /**
         * Goes to (eg: opens) a resource.
         * @param {Object} sharedResource - The property 'shared' of the account
         * @param {string} sharedResource.db
         * @param {string} sharedResource.@type
         * @param {string} sharedResource.label
         * @param {string} sharedResource._id
         * @param {string} sharedResource.baseUrl - As for now we don't use this (See to-do below)
         */
        go: sharedResource => {
          // todo we assume we are in the same devicehub, in the future this will need to change
          const db = sharedResource.db
          if (session.db !== db) {
            session.changeDb(db).then(() => {
              // We wait for the first transition (db change) to happen before initiating another one
              goToResource(sharedResource, false)
            })
          } else {
            goToResource(sharedResource, false)
          }
          // We don't want some properties of the sharedResource object
        }
      }

      function goToResource (sharedResource) {
        const resource = _.pick(sharedResource, ['@type', 'label', '_id'])
        ResourceBreadcrumb.go(resource)
      }
    }
  }
}

module.exports = sharedWithMe
