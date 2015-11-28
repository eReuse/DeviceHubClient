/**
 * Created by busta on 22/8/2015.
 */
function getLabelsInPdf(){
    $firstLabel = $('#labels .labelWidget:first');
    //var width = parseInt($firstLabel.css('width'));
    //var height = parseInt($firstLabel.css('height'));
    var width = parseInt($('#width').val());
    var height = parseInt($('#height').val());
    var pdf = new jsPDF('l','mm',[width,height]);
    var get_label = function(i){
        var $labels = $('#labels .labelWidget');
        if(i < $labels.length){
            if(i != 0) pdf.addPage();
            $($labels.get(i)).css('padding','1mm');
            pdf.addHTML($labels.get(i), function() {
                $($labels.get(i)).css('padding',0);
                get_label(i + 1)
            });
        }
        else pdf.save('Labels.pdf');
    };
    get_label(0);
}

