/**
 *
 * @param {ResourceSettings} ResourceSettings
 * @param RESOURCE_CONFIG
 * @param {ResourceViewGenerator} ResourceViewGeneratorFactory
 * @returns {Subview}
 * @constructor
 */
function SubviewFactory (ResourceViewGenerator, RESOURCE_CONFIG, ResourceSettings) {
  class Subview extends ResourceViewGenerator {

    /**
     * Generates a subview
     * @param resourceType
     * @param $scope
     * @returns {Array}
     */
    static generate ($scope, resourceType = null) {
      let subviewsConfig = resourceType ? this.getSetting(resourceType, 'subviews') : RESOURCE_CONFIG.inventory.subviews
      return this.compile(subviewsConfig, $scope)
    }

    static _template (subviewsConfig, $scope) {
      let body = `<uib-tabset id="subviews">`
      let firstTime = false
      _.forEach(subviewsConfig, (option) => {
        let uid = option.view + option.resourceType
        if (!firstTime) {
          $scope.tabs[uid] = {isActive: firstTime = true}
        } else {
          $scope.tabs[uid] = {isActive: false}
        }
        body += `
          <uib-tab select="setActive(tabs['${uid}'])">
            <uib-tab-heading>${option.name}</uib-tab-heading>
            <div ng-if="tabs['${uid}'].isActive">
              <${option.view} resource-type="${option.resourceType}" type="{{type}}" parent-resource="resource">
              </${option.view}>
            </div>
          </uib-tab>
        `
      })
      return body + '</uib-tabset>'
    }
  }
  return Subview
}

module.exports = SubviewFactory
