/**
 * Created by busta on 3/11/2015.
 */


angular.module('Places',['ui.bootstrap','Device','ngAnimate','uiGmapgoogle-maps', 'ngGeolocation'] )
    .directive('placeNavWidget', ['Restangular','$rootScope','$modal', function (Restangular, $rootScope,$modal) {
        return {
            templateUrl: 'app/places/placeNavWidget.html',
            restrict: 'E',
            scope:{},
            css: 'app/places/places.css',
            link: function ($scope, $element, $attrs) {
                $scope.places = Restangular.all('places').getList().$object;
                $scope.broadcastSelectedPlace = function(place_id){
                    if ($scope.isSelected(place_id)){
                        $rootScope.$broadcast('unselectedPlace@placeNavWidget');
                        $scope.selected_id = null;
                    }
                    else {
                        $rootScope.$broadcast('selectedPlace@placeNavWidget', place_id);
                        $scope.selected_id = place_id;
                    }
                };
                $scope.isSelected = function(place_id){
                    return place_id == $scope.selected_id;
                };
                $scope.openModal = function(place){
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'app/places/placeModal.html',
                        controller: 'placeModalCtrl',
                        size: 'lg',
                        keyboard: true,
                        windowClass: 'modal-xl',
                        backdrop : 'static',
                        resolve: {
                            place: function(){return place}
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
    }])
    .controller('placeModalCtrl', ['$scope','$modalInstance','Restangular','place','$rootScope','$geolocation', function($scope,$modalInstance,Restangular,place,$rootScope,$geolocation) {
        $scope.place = place;
        try{$scope.title = 'Place ' + $scope.place['_id']}
        catch(err){$scope.title = 'Create a new place'}
        $scope.map = null;


        /*$scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };*/



        $geolocation.getCurrentPosition({
            timeout: 60000,
            maximumAge: 250,
            enableHighAccuracy: true
        }).then(function(position) {
            $scope.map = {
                center: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                zoom: 20
            };
            var margin = 0.0001;
            $scope.polygons = [
                {
                    id: 1,
                    path: [
                        {
                            latitude: position.coords.latitude-margin,
                            longitude: position.coords.longitude-margin
                        },
                        {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude+margin
                        },
                        {
                            latitude: position.coords.latitude+margin,
                            longitude: position.coords.longitude+margin
                        }
                    ],
                    stroke: {
                        color: '#6060FB',
                        weight: 3
                    },
                    editable: true,
                    draggable: true,
                    geodesic: false,
                    visible: true,
                    fill: {
                        color: '#ff0000',
                        opacity: 0.8
                    }
                }
            ];
        });
        $scope.ok = function(){

        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);