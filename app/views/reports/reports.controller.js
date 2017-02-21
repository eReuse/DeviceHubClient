var model = {
  'rows': [{
    'columns': [{
      'styleClass': 'col-md-6',
      'cid': '1458229350713-2',
      'widgets': [{
        'type': 'numberDevicesEvents',
        'config': {'subject': 'receiverOrganization', 'event': 'Receive', 'receiverType': 'CollectionPoint'},
        'title': 'Number of devices per event, subject and month',
        'titleTemplateUrl': '../src/templates/widget-title.html',
        'wid': '1458229378498-5',
        '$$hashKey': 'object:1425'
      }],
      '$$hashKey': 'object:1407'
    }],
    '$$hashKey': 'object:1402'
  }],
  'structure': '6-6',
  'title': '',
  'titleTemplateUrl': '../src/templates/dashboard-title.html'
}

function reportsController ($scope) {
  $scope.model = model
}

module.exports = reportsController
