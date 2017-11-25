class WorkbenchPoller {
  constructor (poller, CONSTANTS, workbenchServer) {
    this.poller = poller
    this.host = workbenchServer.host
    this.delay = CONSTANTS.workbenchPollingDelay
    this.p = null
  }

  start () {
    this.p = this.poller.get(this.host + '/info', {
      delay: this.delay
    })
  }

  stop () {
    this.p.stop()
  }

  callback (callback) {
    this.p.promise.then(null, null, callback)
  }

}

module.exports = WorkbenchPoller
