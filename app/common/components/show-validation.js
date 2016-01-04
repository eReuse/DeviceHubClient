'use strict';


/**
 * @ngdoc module
 * @name Show Validation
 * @description
 * Shows real-time invalid styled for HTML5 input.
 */
module.exports = angular.module('common.directives.showValidation', [])
    .directive('showValidation', [function() {
        return {
            restrict: "A",
            link: function(scope, element, attrs, ctrl) {

                if (element.get(0).nodeName.toLowerCase() === 'form') {
                    element.find('.form-group').each(function(i, formGroup) {
                        showValidation(angular.element(formGroup));
                    });
                } else {
                    showValidation(element);
                }

                function showValidation(formGroupEl) {
                    var input = formGroupEl.find('input[ng-model],textarea[ng-model]');
                    if (input.length > 0) {
                        scope.$watch(function() {
                            return input.hasClass('ng-invalid') && input.hasClass('ng-dirty');
                        }, function(isInvalid) {
                            formGroupEl.toggleClass('has-error', isInvalid);
                        });
                    }
                }
            }
        };
    }]);