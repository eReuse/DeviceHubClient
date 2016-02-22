'use strict';

var model = {"rows":[{"columns":[{"styleClass":"col-md-6","cid":"1456137636259-6","$$hashKey":"object:4593","widgets":[{"type":"numberDevicesEvents","config":{"subject":"receiverOrganization","event":"Receive","receiverType":"CollectionPoint"},"$$hashKey":"object:4623","title":"Number or collected devices per organization and month","titleTemplateUrl":"../src/templates/widget-title.html","wid":"1456137872395-9"}]},{"styleClass":"col-md-6","cid":"1456137636260-7","$$hashKey":"object:4594"}],"$$hashKey":"object:4589"}],"structure":"6-6","title":"","titleTemplateUrl":"../src/templates/dashboard-title.html"}

function reportsController ($scope){
    $scope.model = model;
}

module.exports = reportsController;