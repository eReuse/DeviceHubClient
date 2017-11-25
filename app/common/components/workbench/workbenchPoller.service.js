class WorkbenchPoller {
  constructor (poller, CONSTANTS, workbenchServer) {
    this.poller = poller
    this.server = workbenchServer
    this.delay = CONSTANTS.workbenchPollingDelay
    this.p = null
  }

  start () {
    this.p = this.poller.get(this.server.host + '/info', {
      delay: this.delay
    })
  }

  stop () {
    this.p.stop()
  }

  callback (callback) {
    this.p.promise.then(null, null, callback)
  }

  change (host) {
    this.p.target = host + '/info'
  }

}

module.exports = WorkbenchPoller
