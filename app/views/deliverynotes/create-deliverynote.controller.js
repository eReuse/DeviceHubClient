/**
 *
 * @param $scope
 * @param {module:fields} fields
 * @param {module:android} android
 */
function createDeliveryCtrl ($scope, $window, fields, $state, enums, resources) {
  const XLSX = $window.XLSX
  
  $scope.username = 'Hello Stephan'

  $scope.SelectFile = function (file) {
    console.log('selected file', file)
    $scope.SelectedFile = file
  };

  $scope.Upload = function () {
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    $scope.SelectedFile = document.getElementById('filename').files[0]
    if (regex.test($scope.SelectedFile.name.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
        var reader = new FileReader();
        //For Browsers other than IE.
        if (reader.readAsBinaryString) {
            reader.onload = function (e) {
                $scope.ProcessExcel(e.target.result);
            };
            reader.readAsBinaryString($scope.SelectedFile);
        } else {
            //For IE Browser.
            reader.onload = function (e) {
                var data = "";
                var bytes = new Uint8Array(e.target.result);
                for (var i = 0; i < bytes.byteLength; i++) {
                    data += String.fromCharCode(bytes[i]);
                }
                $scope.ProcessExcel(data);
            };
            reader.readAsArrayBuffer($scope.SelectedFile);
        }
      } else {
          $window.alert("This browser does not support HTML5.");
      }
    } else {
        $window.alert("Please upload a valid Excel file.");
    }
  };

  $scope.ProcessExcel = function (data) {
      //Read the Excel File data.
      var workbook = XLSX.read(data, {
          type: 'binary'
      });

      //Fetch the name of First Sheet.
      var firstSheet = workbook.SheetNames[0];

      //Read all rows from First Sheet into an JSON array.
      var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

      //Display the data from Excel file in Table.
      $scope.$apply(function () {
          $scope.uploadedDevices = excelRows

          //TODO instead, here set to formly form
          //$scope.form.devices = excelRows
      });
  };

  class CreateDeliveryNoteForm extends fields.Form {
    constructor () {
      super(
        null,
        new fields.String('deliveryNote.supplier', {
          namespace: 'r',
        }),
        new fields.Datepicker('deliveryNote.date', {
          namespace: 'r',
        }),
        new fields.String('deliveryNote.documentID', {
          namespace: 'r'
        }),
        new fields.String('deliveryNote.deposit', {
          namespace: 'r',
        })
      )
    }

    _submit () {
      const devices = $scope.uploadedDevices && $scope.uploadedDevices.map((device) => {
        return device
        // return new resources.Device(device)
      })
      const model = _.assign({ expectedDevices : devices }, this.model.deliveryNote)
      const deliveryNote = new resources.DeliveryNote(model, {_useCache: false})
      return deliveryNote.post()
    }

    _success (...args) {
      super._success(...args)
      this.reset()
    }

    cancel () {
      $state.go('^')
    }
  }

  $scope.form = new CreateDeliveryNoteForm()
}

module.exports = createDeliveryCtrl

