function certificateErasure (certificateErasureFactory, SubmitForm) {
  return {
    template: require('./../certificate-form.html'),
    restrict: 'E',
    scope: {
      resources: '=',
      status: '='
    },
    link: {
      pre: $scope => {
        const form = {
          fields: [
            {
              key: 'lan',
              type: 'radio',
              templateOptions: {
                label: 'Language',
                options: [
                  {name: 'Español', value: 'ES'},
                  {name: 'English', value: 'EN'}
                ],
                required: true
              }
            },
            {
              key: 'useComputer',
              type: 'radio',
              templateOptions: {
                label: 'Add info about the computer',
                options: [
                  {name: 'Yes', value: true},
                  {name: 'No', value: false}
                ],
                required: true
              }
            },
            {
              key: 'org',
              type: 'input',
              templateOptions: {
                label: 'Organization that erased the devices',
                placeholder: 'ACME',
                description: 'This is only added into the resulting PDF certificate.',
                required: true
              }
            },
            {
              key: 'logo',
              type: 'upload',
              templateOptions: {
                label: 'Logo of the organization',
                description: 'This is only added into the resulting PDF certificate. Only PNG and JPG. Big images' +
                ' can take long to process.',
                accept: 'image/png, image/jpg',
                required: true
              }
            }
          ],
          model: {
            resources: $scope.resources,
            lan: 'EN',
            useComputer: true
          },
          submit: model => {
            if (submitForm.isValid()) {
              submitForm.prepare()
              const certificate = new certificateErasureFactory(model.resources, model, model.logo.data)
              const promise = certificate.generatePdf()
              submitForm.after(promise)
            }
          }
        }
        const submitForm = new SubmitForm(form, $scope.status)
        $scope.form = form
      }
    }
  }
}

module.exports = certificateErasure
