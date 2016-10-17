/* globals pdfMake */
function certificateFactory (CONSTANTS) {
  function Certificate (resources, model, logo) {
    this.resources = _.cloneDeep(resources)
    this.model = model
    this.logo = logo
    this.content = []
    this.s = {}
    this.pdf = {
      pageMargins: [40, 10, 40, 60],
      info: {
        title: model.title,
        author: model.org || CONSTANTS.appName,
        keywords: 'report,certificate,eReuse.org,' + CONSTANTS.appName
      },
      styles: {
        h1: {
          fontSize: 22,
          bold: true,
          margin: [0, 25, 0, 10]
        },
        h2: {
          fontSize: 18,
          bold: true,
          margin: [0, 30, 0, 5]
        },
        h3: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 5]
        },
        field: {
          color: 'grey'
        },
        th: {
          bold: true,
          margin: [0, 0, 0, 5]
        },
        statusSuccess: {
          color: 'green'
        },
        statusFailure: {
          color: 'red'
        },
        p: {
          margin: [5, 5]
        }
      }
    }
  }

  var proto = Certificate.prototype

  proto.generatePdf = function () {
    this.pdf.content = this.content
    pdfMake.createPdf(this.pdf).open()
  }

  proto._header = function (title) {
    return {
      columns: [
        this.ts(title, 'h1'),
        {image: this.logo, fit: [150, 100], alignment: 'right'}
      ]
    }
  }

  // Utilities
  proto.get = function (value) {
    if (angular.isUndefined(value)) return ''
    if (!_.isString(value)) return value.toString()
    return value
  }

  proto.yesNo = function (bool) {
    return bool ? this.s.YES : this.s.NO
  }
  /**
   * Shortcut to add text and style
   * @param text
   * @param style
   * @return {{text: *, style: *}}
   */
  proto.ts = function (text, style) {
    return {text: text, style: style}
  }

  proto._add = function (content) {
    this.content = this.content.concat(content)
  }

  proto._field = function (name, value) {
    return {
      text: [
        this.ts(name + ': ', 'field'),
        value
      ]
    }
  }
  /**
   * Adds a new page.
   * @private
   */
  proto._breakPage = function () {
    _.last(this.content).pageBreak = 'after'
  }
  /**
   *
   * @param {Element} img
   * @return {string} base64 representation of the image
   * @private
   * From http://stackoverflow.com/a/15761420/2710757
   */
  proto._getBase64Image = function (img) {
    var canvas = $('<canvas/>').get(0)
    canvas.getContext('2d').drawImage(img, 10, 10)
    return canvas.toDataUrl()
  }

  return Certificate
}

module.exports = certificateFactory
