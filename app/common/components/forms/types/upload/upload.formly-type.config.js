const utils = require('./../../../utils')

/**
 * Provides an input type file to select a file or mulritple files.
 */
function upload (formlyConfigProvider) {
  formlyConfigProvider.setType({
    name: 'upload',
    extends: 'input',
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    link: ($scope, $element) => {
      const $input = $element.find('input')
      $input.attr('accept', $scope.to.accept).prop('multiple', $scope.to.multiple)
      $element.on('change', e => {
        const files = _.map(e.target.files, f => new utils.DataFile(f, $scope.to.readAs))
        Promise.all(_.map(files, 'loaded')).then(() => {
          $scope.fc.$setViewValue($scope.to.multiple ? files : _.first(files, null))
        })
      })
      // We monkeypatch resetModel (which is called when form has to be reset) to remove the input
      // Note that by default it removes model[] but not the html's input
      const resetModel = $scope.formOptions.resetModel
      $scope.formOptions.resetModel = () => {
        $input.val('')
        resetModel.apply(this, arguments)
      }
    },
    defaultOptions: {
      // See module fields' Upload for info
      templateOptions: {
        accept: '*/*',
        type: 'file',
        multiple: false,
        files: [],
        readAs: 'readAsDataURL'
      }
    }
  })
}

module.exports = upload
