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
    link: function (scope, el, attrs) {
      el.find('input').attr('accept', scope.to.accept)
      el.on('change', function (e) {
        var files = e.target.files
        if (files && files[0]) {
          var file = files[0]
          var fileProp = {};
          for (var properties in file) {
            if (!angular.isFunction(file[properties])) {
              fileProp[properties] = file[properties];
            }
          }
          scope.fc.$setViewValue(fileProp);
          var reader = new FileReader()
          reader.onload = function (e) {
            fileProp.data = e.target.result
          }
          reader.readAsDataURL(files[0])
        } else scope.fc.$setViewValue(undefined)
      })
    },
    defaultOptions: {
      templateOptions: {
        accept: '*/*',
        type: 'file'
      }
    }
  })
}

module.exports = typeahead
