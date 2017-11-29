function workbenchNameModal (dhModalProvider) {
  dhModalProvider.config.workbenchName = {
    templateUrl: require('./__init__').PATH + '/workbench-name.controller.html',
    controller: 'workbenchNameCtl'
  }
}

module.exports = workbenchNameModal
