/* global jsPDF */
/* eslint new-cap: ["error", { "newIsCapExceptions": ["jsPDF"] }] */

function labelsToPdfService ($q) {
  this.execute = function ($labels) {
    var $labelEdit = $('resource-label-edit')
    var $labelTitle = $('.label-title')
    var deferred = $q.defer()
    $labelEdit.hide()
    $labelTitle.hide()
    try {
      require('resources/jspdf.min.js')
      var width = parseInt($('#width').val())
      var height = parseInt($('#height').val())
      var pdf = new jsPDF('l', 'mm', [width, height])
      var getLabel = function (i) {
        if (i < $labels.length) {
          if (i !== 0) pdf.addPage()
          // $($labels.get(i)).css('padding','1mm')
          pdf.addHTML($labels.get(i), function () {
            // $($labels.get(i)).css('padding',0)
            var $label = $($labels.get(i))
            $label.css('display', 'none') // We keep removing labels so others can be onscreen and thus, printed
            getLabel(i + 1)
            if (i === $labels.length - 1) { // When we reach the bottom we put all the labels visible again
              for (var j = 0; j < $labels.length; j++) {
                $($labels.get(j)).css('display', 'table')
              }
            }
          })
        } else {
          pdf.save('Labels.pdf')
          $labelEdit.show()
          $labelTitle.show()
          deferred.resolve()
        }
      }
      getLabel(0)
    } catch (err) {
      deferred.reject()
      throw err
    }
    return deferred.promise
  }
}

module.exports = labelsToPdfService
