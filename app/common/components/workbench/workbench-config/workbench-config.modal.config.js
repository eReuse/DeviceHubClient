function workbenchConfigModal (dhModalProvider) {
  dhModalProvider.config.workbenchConfig = {
    templateUrl: require('./__init__').PATH + '/workbench-config.controller.html',
    controller: 'workbenchConfigCtl'
  }
}

module.exports = workbenchConfigModal
