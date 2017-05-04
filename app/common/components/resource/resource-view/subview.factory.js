/**
 *
 * @param {ResourceSettings} ResourceSettings
 * @param RESOURCE_CONFIG
 * @param {ResourceViewGenerator} ResourceViewGeneratorFactory
 * @returns {Subview}
 * @constructor
 */
function SubviewFactory (ResourceViewGenerator, RESOURCE_CONFIG) {
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
      let body = `<uib-tabset id="subviews" type="pills" justified="true" active="tabs.active">`
      _.forEach(subviewsConfig, (option) => {
        let uid = option.view + option.resourceType
        $scope.tabs[uid] = {isActive: false}
        let icon = option.fa
          ? `<i class="fa ${option.fa} fa-fw fa-lg"></i>`
          : `<resource-icon resource-type="${option.resourceIcon}"></resource-icon>`
        body += `
          <uib-tab select="setActive(tabs['${uid}'])">
            <uib-tab-heading>
              ${icon}
              <span class="visible-sm-inline visible-md-inline visible-lg-inline view-tab-text">${option.name}</span>
            </uib-tab-heading>
            <div ng-if="tabs['${uid}'].isActive" class="container-fluid">
              <div class="row">
                <${option.view} resource-type="${option.resourceType}" 
                                type="{{type}}" 
                                parent-resource="resource" 
                                model="model"
                                class="${option.class} col-xs-12"
                >
                </${option.view}>
              </div>
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
