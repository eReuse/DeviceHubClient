function certificateReceiptFactory (CERTIFICATE_RECEIPT_FACTORY_STRINGS, certificateFactory) {
  require('bower_components/pdfmake/build/pdfmake')
  require('bower_components/pdfmake/build/vfs_fonts')

  function CertificateReceipt (devices, model, logo) {
    model.day = model.date.getDate()
    model.year = model.date.getFullYear()
    model.vatManager = model.vatManager || ''
    model.vatReceiver = model.vatReceiver || ''
    certificateFactory.apply(this, arguments)
    this.s = CERTIFICATE_RECEIPT_FACTORY_STRINGS[model.lan]
    this.pdf.styles['p+'] = {
      margin: [0, 60, 0, 10]
    }
    model.title = this.s.TITLE
    model.month = this.s.MONTHS[model.date.getMonth()]
    this.body = CERTIFICATE_RECEIPT_FACTORY_STRINGS[model.lan + '_BODY']
  }

  CertificateReceipt.prototype = Object.create(certificateFactory.prototype)
  CertificateReceipt.prototype.constructor = CertificateReceipt
  var proto = CertificateReceipt.prototype

  proto.generatePdf = function () {
    var self = this
    this._add(this._header(this.model.title))
    _.forEach(this.body, function (text) {
      self.content.push({text: _.template(text)(self.model), style: 'p'})
    })
    _.nth(self.content, -1).style = _.nth(self.content, -2).style = 'p+'
    this._breakPage()
    this._add(this._header(this.s.ANNEX))
    this._add(this._devicesResume(this.resources))
    certificateFactory.prototype.generatePdf.apply(this)
  }

  proto._devicesResume = function (devices) {
    var self = this
    var content = [
      this.ts(this.s.OUTLINE, 'h2'),
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*', '*'],
          body: [
            [this.ts(this.s.MANUFACTURER, 'th'), this.ts(this.s.MODEL, 'th'), this.ts(this.s.SN, 'th'),
              this.ts(this.s.ID, 'th'), this.ts(this.s.TYPE, 'th')]
          ]
        },
        layout: 'lightHorizontalLines'
      }
    ]

    _.forEach(devices, function (device) {
      var row = [self.get(device.manufacturer), self.get(device.model),
        self.get(device.serialNumber), self.get(device._id), self.get(device['@type'])]
      content[1].table.body.push(row)
    })

    return content
  }

  return CertificateReceipt
}

module.exports = certificateReceiptFactory
