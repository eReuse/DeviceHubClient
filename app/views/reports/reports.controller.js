'use strict';

var model = {"rows":[{"columns":[{"styleClass":"col-md-6","$$hashKey":"object:4593","widgets":[{"type":"numberDevicesEvents","config":{"subject":"receiverOrganization","event":"Receive","receiverType":"CollectionPoint"},"title":"Number or collected devices per organization and month","titleTemplateUrl":"../src/templates/widget-title.html"}]},{"styleClass":"col-md-6"}]}],"structure":"6-6","title":"","titleTemplateUrl":"../src/templates/dashboard-title.html"}

function reportsController ($scope){
    $scope.model = model;
}

module.exports = reportsController;