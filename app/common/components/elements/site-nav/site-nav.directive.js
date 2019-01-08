function siteNav ($translate, $state) {
  return {
    template: require('./sire-nav.directive.html'),
    restrict: 'E',
    replace: true,
    scope: {},
    link: $scope => {
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

      if ('WorkbenchServer' in window || 'AndroidApp' in window) {
        $scope.nav.push(new Element('workbenchPc', 'fa-wrench', 'auth.workbench'))
      }
    }
  }
}

module.exports = siteNav
