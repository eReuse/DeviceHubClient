var setImageGetter = require('./../../../utils').setImageGetter
function labelList (certificateReceiptFactory, ResourceSettings, session) {
  return {
    templateUrl: window.COMPONENTS + '/device/certificate/certificate-receipt/certificate-receipt.directive.html',
    restrict: 'E',
    scope: {
      devices: '='
    },
    link: function ($scope) {
      var account = session.account
      // For 'form' param in formly, if we use form.form as in loginController it doesn't work, we need to use a
      // standalone var. Why?
      $scope.form = {
        fields: [
          {
            key: 'date',
            templateOptions: {
              label: 'Date',
              description: 'The date where the receiver signes the document.',
              required: true
            },
            type: 'datepicker'
          },
          {
            key: 'city',
            templateOptions: {
              label: 'City',
              description: 'The city where the signature happens.',
              required: true
            },
            type: 'input'
          },
          {
            key: 'namePersonManager',
            templateOptions: {
              label: 'Name of the manager',
              required: true
            },
            type: 'input'
          },
          {
            key: 'positionPersonManager',
            templateOptions: {
              label: 'The position of the manager',
              required: true
            },
            type: 'input'
          },
          {
            key: 'nameCompanyManager',
            templateOptions: {
              label: 'Name of the organization of the manager',
              required: true
            },
            type: 'input'
          },
          {
            key: 'postalManager',
            templateOptions: {
              label: 'Postal direction of the organization of the manager',
              description: 'Street name, street number, city and country.',
              required: true
            },
            type: 'input'
          },
          {
            key: 'vatManager',
            templateOptions: {
              label: 'VAT the organization of the manager',
              description: 'The legal identification number, if needed.'
            },
            type: 'input'
          },
          {
            key: 'namePersonReceiver',
            templateOptions: {
              label: 'Name of the receiver',
              required: true
            },
            type: 'input'
          },
          {
            key: 'postalReceiver',
            templateOptions: {
              label: 'Postal direction of the receiver',
              description: 'Street name, street number, city and country.',
              required: true
            },
            type: 'input'
          },
          {
            key: 'vatReceiver',
            templateOptions: {
              label: 'Legal identification number of the receiver',
              description: 'The legal identification number, if needed.'
            },
            type: 'input'
          },
          {
            key: 'lan',
            templateOptions: {
              label: 'Language of the document',
              options: [{
                name: 'Español',
                value: 'ES'
              }]
            },
            type: 'select'
          },
          {
            key: 'logo',
            templateOptions: {
              label: 'Logo',
              accept: 'image/x-png, image/jpeg',
              required: true,
              description: 'Only PNG or JPG.'
            },
            type: 'upload'
          }
        ],
        model: {
          'namePersonManager': account.name,
          'nameCompanyManager': account.organization,
          'lan': 'ES',
          date: new Date()
        },
        print: function (devices, model) {
          $scope.formForm.triedSubmission = false
          if ($scope.formForm.$valid) (new certificateReceiptFactory(devices, model, model.logo.data)).generatePdf()
          else $scope.formForm.triedSubmission = true
        }
      }

      setCommonOwnerInModel()
      //setImageGetter($scope, '[id*=input_logo]', 'logo')

      function setCommonOwnerInModel () {
        var commonOwners = []
        _.forEach($scope.devices[0].owners, function (owner) {
          var isCommon = true
          _.forEach($scope.devices, function (device) {
            if (!_.includes(device.owners, owner)) isCommon = false
          })
          if (isCommon) commonOwners.push(owner)
        })
        // We get only the first owner todo let user decide which common owner use
        ResourceSettings('Account').server.one(commonOwners[0]).get().then(function (account) {
          $scope.form.model['name-person-receiver'] = account.name
        })
      }
    }
  }
}

module.exports = labelList
