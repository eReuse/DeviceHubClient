function workbenchLinkModal (dhModalProvider) {
  dhModalProvider.config.workbenchLink = {
    templateUrl: require('./__init__').PATH + '/workbench-link.controller.html',
    controller: 'workbenchLinkCtl'
  }
}

module.exports = workbenchLinkModal
