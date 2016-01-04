'use strict';
function placeNavDirective (Restangular, $rootScope, $uibModal) {
    return {
        templateUrl: window.COMPONENTS + '/place-nav/place-nav.directive.html',
        restrict: 'E',
        scope: {},
        link: function ($scope, $element, $attrs) {
            var getPlaces = function () {
                Restangular.all('places').getList().then(function (data) {
                    $scope.places = data;
                    $rootScope.$broadcast('get@placeNavWidget', data);
                });
            };
            getPlaces();
            $scope.broadcastSelectedPlace = function (place_id) {
                if ($scope.isSelected(place_id)) {
                    $rootScope.$broadcast('unselectedPlace@placeNavWidget');
                    $scope.selected_id = null;
                }
                else {
                    $rootScope.$broadcast('selectedPlace@placeNavWidget', place_id);
                    $scope.selected_id = place_id;
                }
            };
            $scope.$on('refresh@placeNavWidget', function () {
                getPlaces();
            });

            //$scope.$watchCollection($scope.places)


            $scope.isSelected = function (place_id) {
                return place_id == $scope.selected_id;
            };
            $scope.openModal = function (place) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: window.COMPONENTS + '/place-nav/place-modal.controller.html',
                    controller: 'placeModalCtrl',
                    size: 'lg',
                    keyboard: true,
                    windowClass: 'modal-xl',
                    backdrop: 'static',
                    resolve: {
                        place: function () {
                            return place
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    // $log.info('Modal dismissed at: ' + new Date());
                });
            };
        }
    }
}

module.exports = placeNavDirective;