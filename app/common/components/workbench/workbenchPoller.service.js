class WorkbenchPoller {
  constructor (poller, CONSTANTS, workbenchServer, session) {
    this.poller = poller
    this.server = workbenchServer
    this.delay = CONSTANTS.workbenchPollingDelay
    this.deviceHub = CONSTANTS.url
    this.session = session
    this.p = null
    this.argumentsArray = 'AndroidApp' in window ? [] : [{
      params: {
        'device-hub': this.deviceHub,
        db: this.session.db
      },
      headers: {
        Authorization: 'Basic ' + this.session.account.token
      }
    }]
  }

  start () {
    this.p = this.poller.get(this.server.host + '/info', {
      delay: this.delay,
      argumentsArray: this.argumentsArray
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
