'use strict';

var model = {"rows":[{"columns":[{"styleClass":"col-md-6","widgets":[{"type":"actualPositions","config":{},"title":"Actual positions of the devices","titleTemplateUrl":"../src/templates/widget-title.html","wid":"1458229428621-6","$$hashKey":"object:1416"}],"cid":"1458229350709-1","$$hashKey":"object:1406"},{"styleClass":"col-md-6","cid":"1458229350713-2","widgets":[{"type":"numberDevicesEvents","config":{"subject":"receiverOrganization","event":"Receive","receiverType":"CollectionPoint"},"title":"Number of devices per event, subject and month","titleTemplateUrl":"../src/templates/widget-title.html","wid":"1458229378498-5","$$hashKey":"object:1425"}],"$$hashKey":"object:1407"}],"$$hashKey":"object:1402"}],"structure":"6-6","title":"","titleTemplateUrl":"../src/templates/dashboard-title.html"}

function reportsController ($scope){
    $scope.model = window.model = model;
}

module.exports = reportsController;