var modalApp = angular.module('modalModule', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'
    , 'UtilService', 'ModalService']);
authApp
    .controller('areaModalController', function ($scope, $http, $window, $uibModalInstance, Util, Modal) {

        $scope.statesAndCities = {};
	    $scope.cities = [];
	    $scope.states = [];
//    $scope.selectedState = "";
//    $scope.selectedCity = "";
//    
	    $scope.getstates = function () {
            Util.getStatesFromAPI().then(function(response){
                $scope.statesAndCities = response.data;
                var stateCounter = 0;
                for (var i in $scope.statesAndCities) {
                    $scope.states.push(i);
                    // console.log("states : " +
                    // JSON.stringify($scope.states))
                    if (stateCounter == 0) {
                        $scope.selectedState = i;
                        stateCounter++;
                    }
                }
                var cityCounter = 0;
                for (var j in $scope.statesAndCities[$scope.selectedState]) {
                    $scope.cities.push($scope.statesAndCities[$scope.selectedState][j]);
                    if (cityCounter == 0) {
                        $scope.selectedCity = $scope.statesAndCities[$scope.selectedState][j];
                        cityCounter++;
                    }

                }
            },
            function(response){
                console.log(JSON.stringify(response));
            });
        };
    
        $scope.updateCity = function() {
            var cityCounter = 0;
            $scope.cities = [];
            for (var j in $scope.statesAndCities[$scope.selectedState]) {
                $scope.cities.push($scope.statesAndCities[$scope.selectedState][j]);
                if (cityCounter == 0) {
                    $scope.selectedCity = $scope.statesAndCities[$scope.selectedState][j];
                    cityCounter++;
                }
            }
        };
    
        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    
    $scope.done = function() {
        var result = {};
        result.selectedState = $scope.selectedState;
        result.selectedCity = $scope.selectedCity;
        $uibModalInstance.close(result);
    };
    
        $scope.getstates();
    });