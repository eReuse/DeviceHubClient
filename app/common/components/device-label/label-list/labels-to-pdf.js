require('resources/jspdf.min.js');

/**
 * Created by busta on 22/8/2015.
 */
module.exports = function() {
        $firstLabel = $('#labels .labelWidget:first');
        //var width = parseInt($firstLabel.css('width'));
        //var height = parseInt($firstLabel.css('height'));
        var width = parseInt($('#width').val());
        var height = parseInt($('#height').val());
        var pdf = new jsPDF('l', 'mm', [width, height]);
        var get_label = function (i) {
            var $labels = $('#labels .labelWidget');
            if (i < $labels.length) {
                if (i != 0) pdf.addPage();
                //$($labels.get(i)).css('padding','1mm');
                pdf.addHTML($labels.get(i), function () {
                    //$($labels.get(i)).css('padding',0);
                    var $label = $($labels.get(i));
                    $label.css('display', 'none'); //We keep removing labels so others can be onscreen and thus, printed
                    get_label(i + 1);
                    if (i == $labels.length - 1) { //When we reach the bottom we put all the labels visible again
                        for (var j = 0; j < $labels.length; j++) {
                            $($labels.get(j)).css('display', 'block');
                        }
                    }
                });
            }
            else pdf.save('Labels.pdf');
        };
        get_label(0);
    };
