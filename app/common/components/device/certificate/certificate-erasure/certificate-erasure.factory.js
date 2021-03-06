function certificateErasureFactory (CONSTANTS, CERTIFICATE_ERASURE_FACTORY_STRINGS, ResourceSettings, session,
                                    certificateFactory) {
  require('bower_components/pdfmake/build/pdfmake')
  require('bower_components/pdfmake/build/vfs_fonts')

  function CertificateErasure (__, model, logo) {
    var self = this
    model.title = 'Certificate of erasure'
    certificateFactory.apply(this, arguments)
    var pcsOrHdds = this.resources
    this.s = CERTIFICATE_ERASURE_FACTORY_STRINGS[model.lan]
    // We get the hard-drives whose parents are the passed-in computers
    this.reports = []
    var query = {embedded: {erasures: 1, parent: 1}, max_results: 1000}
    if (pcsOrHdds[0]['@type'] === 'HardDrive') {
      query['where'] = {_id: {'$in': _.map(pcsOrHdds, '_id')}}
    } else {
      query['where'] = {parent: {'$in': _.map(pcsOrHdds, '_id')}}
    }
    this.promise = ResourceSettings('HardDrive').server.getList(query).then(function (hardDrives) {
      _.forEach(hardDrives, function (hdd) {
        _.forEach(hdd.erasures, function (erasure) {
          var computer = hdd.parent
          var isBasic = erasure['@type'] === 'devices:EraseBasic'
          self.reports.push({computer: computer, erasure: erasure, hdd: hdd, isBasic: isBasic})
        })
      })
    })
  }

  CertificateErasure.prototype = Object.create(certificateFactory.prototype)
  CertificateErasure.prototype.constructor = CertificateErasure
  var proto = CertificateErasure.prototype

  proto.generatePdf = function () {
    var self = this
    return this.promise.then(function () {
      self._add(self._header(self.s.DOCU_TITLE))
      self._add(self._introduction())
      self._add(self._devicesResume(self.reports))
      self._breakPage()
      self._add(self._devicesFull(self.reports))
      certificateFactory.prototype.generatePdf.apply(self)
    })
  }
  /**
   * Adds a
   * @private
   */
  proto._introduction = function () {
    var content = [
      {
        columns: [
          this._field(this.s.ORG, this.model.org || CONSTANTS.appName),
          this._field(this.s.PRINT_DATE, (new Date()).toLocaleDateString())
        ]
      }
    ]
    if (this.model.org) {
      content.push(this.s.explanation({
        org: this.model.org,
        method: this.s.ERASURE_METHOD_EXPLANATION
      }))
    }
    return content
  }
  proto._devicesResume = function (reports) {
    var self = this
    var content = [
      this.ts(this.s.OUTLINE, 'h2'),
      {
        table: {
          headerRows: 1,
          widths: ['*', 30, 70, 55],
          body: [
            [this.ts(this.s.DISK, 'th'),
              this.ts(this.s.STATUS, 'th'), this.ts(this.s.DATE, 'th'), this.ts(this.s.ERASURE_TYPE, 'th')]
          ]
        },
        layout: 'lightHorizontalLines'
      }
    ]
    if (self.model.useComputer) {
      content[1].table.body[0].unshift(this.ts(this.s.GID, 'th'), this.ts(this.s.COMPUTER, 'th'))
      content[1].table.widths.unshift(40, '*')
    }

    _.forEach(reports, function (report) {
      var type = report.isBasic ? self.s.ERASURE_BASIC : self.s.ERASURE_SECTORS
      var row = []
      if (self.model.useComputer) {
        row.push(self.get(report.computer.gid), self.get(report.computer.serialNumber))
      }
      row.push(
        self.get(report.hdd.serialNumber),
        self.getStatus(report.erasure.success),
        report.erasure._updated.toLocaleDateString(),
        type)
      content[1].table.body.push(row)
    })

    return content
  }

  proto._devicesFull = function (reports) {
    var self = this
    var content = []
    var alternate = true
    _.forEach(reports, function (report) {
      if (alternate) content = content.concat(self._header(self.s.REPORT_TITLE))
      var startingTime = new Date(report.erasure.startingTime)
      var endingTime = new Date(report.erasure.endingTime)
      var reportContent = [
        self.ts(self.s.DISK + ' ' + report.hdd.serialNumber, 'h2'),
        {
          columns: [
            self._field(self.s.DATE, report.erasure._updated.toLocaleDateString()),
            self._field(self.s.ELAPSED_TIME, Math.floor((endingTime - startingTime) / (1000 * 60)) + ' min'),
          ]
        },
        {
          columns: [
            self._field(self.s.STEPS, self.get(report.erasure.steps.length)),
            self._field(self.s.ERASURE_TYPE, report.isBasic ? self.s.REPORT_BASIC : self.s.REPORT_PER_SECTORS)
          ]
        },
        self._field(self.s.ERASURE_TOOL, report.isBasic ? 'Shred' : 'Badblocks'),
        {
          columns: [
            self._field(self.s.STATUS, self.getStatus(report.erasure.success)),
            self._field(self.s.CLEAN_WITH_ZEROS, self.yesNo(report.erasure.cleanWithZeros))
          ]
        },
        self.ts(self.s.REPORT_TITLE_HDD, 'h3'),
        {
          columns: [
            self._field(self.s.DISK, self.get(report.hdd.serialNumber)),
            self._field(self.s.DISK_MODEL, self.get(report.hdd.model))
          ]
        },
        {
          columns: [
            self._field(self.s.DISK_MANUFACTURER, self.get(report.hdd.manufacturer)),
            self._field(self.s.DISK_SIZE, self.get(report.hdd.size) + ' GB')
          ]
        }
      ]
      if (self.model.useComputer) {
        reportContent.push(
          self.ts(self.s.REPORT_TITLE_COMPUTER, 'h3'),
          {
            columns: [
              self._field(self.s.COMPUTER, self.get(report.computer.serialNumber)),
              self._field(self.s.COMPUTER_MODEL, self.get(report.computer.model))
            ]
          },
          {
            columns: [
              self._field(self.s.COMPUTER_MANUFACTURER, self.get(report.computer.manufacturer)),
              self._field(self.s.GID, self.get(report.computer.gid))
            ]
          }
        )
      }
      if ((alternate = !alternate)) {
        _.last(reportContent).pageBreak = 'after'
      } else {
        _.last(reportContent).margin = [0, 0, 0, 50]
      }
      content = content.concat(reportContent)
    })
    return content
  }

  proto.getStatus = function (success) {
    return success
      ? this.ts(this.s.ERASURE_SUCCESS, 'statusSuccess')
      : this.ts(this.s.ERASURE_FAIL, 'statusFailure')
  }
  return CertificateErasure
}

module.exports = certificateErasureFactory
