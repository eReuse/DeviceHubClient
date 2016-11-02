/**
 *
 *  device needs _id
 * @param {FormlyConfigProvider}
 */
function typeahead (formlyConfigProvider) {
  // Gets only one value!
  formlyConfigProvider.setType({
    name: 'upload', //
    extends: 'input',
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    link: function (scope, el) {
      el.find('input').attr('accept', scope.to.accept).prop('multiple', scope.to.multiple)
      el.on('change', function (e) {
        var files = e.target.files
        var model = []
        scope.fc.$setViewValue(undefined)
        _.forEach(files, function (file) {
          var fileProp = {}
          for (var properties in file) {
            if (!angular.isFunction(file[properties])) {
              fileProp[properties] = file[properties];
            }
          }
          model.push(fileProp)
          scope.fc.$setViewValue(model)
          var reader = new FileReader()
          reader.onload = function (e) {
            fileProp.data = e.target.result
          }
          reader[scope.to.readAs](file)
        })
      })
    },
    defaultOptions: {
      templateOptions: {
        accept: '*/*',
        type: 'file',
        multiple: false,
        readAs: 'readAsDataUrl' // see http://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
      }
    }
  })
}

module.exports = typeahead
