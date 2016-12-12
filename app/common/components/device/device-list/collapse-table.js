/**
 * Checks if it should collapse part of the columns the device-list-table, depending on how
 * constrained they are.
 */
function triggerCollapseFactory ($scope) {
  return function () {
    var $table = $('#device-list-table')
    var width = $(window).width()
    var collapseUntil // Counting from right
    var offsetLeft = 2
    var offsetRight = 1
    if (width <= 450 && !_.isEmpty($scope.viewingDevice)) {
      collapseUntil = offsetLeft
    } else {
      if (!_.isEmpty($scope.viewingDevice)) {
        width -= 400
      }
      collapseUntil = Math.floor(width / 150 - 1)
      collapseUntil = collapseUntil > 0 ? collapseUntil : 0
      collapseUntil += offsetLeft
    }
    var $th = $table.find('>thead>tr>th')
    var i
    for (i = $th.length - offsetRight - 1; i >= collapseUntil; i--) {
      // Let's collapse the column
      $($th[i]).hide()
      var j = i + 1
      $table.find('>tbody>tr>td:nth-child(' + j + ')').hide()
    }
    for (;i >= offsetLeft; i--) {
      $($th[i]).show()
      j = i + 1
      $table.find('>tbody>tr>td:nth-child(' + j + ')').show()
    }
  }
}

module.exports = triggerCollapseFactory