/**
 *
 * @param $state
 * @param {module:server} server
 */
function headerNav ($state, server) {
  return {
    template: require('./header-nav.directive.html'),
    restrict: 'E',
    link: $scope => {
      $scope.$state = $state
      $scope.showWorkbench = server.Workbench.exists
      $scope.stampUrl = new server.DevicehubThing('/documents/stamps/')

      class Element {
        constructor (key, icon, sref) {
          this.textPath = `nav.${key}`
          this.icon = icon
          this.sref = sref
        }

        get active () {
          return $state.current.name === this.sref
        }
      }

      $scope.nav = [
        new Element('inventory', 'fa-desktop', 'auth.inventory'),
        new Element('tags', 'fa-tags', 'auth.tags')
      ]

      $scope.wbActive = () => _.includes($state.current.name, 'auth.workbench')
    }
  }
}

module.exports = headerNav
