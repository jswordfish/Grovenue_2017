var modalApp = angular.module('previewModule', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'
    , 'UtilService', 'ModalService']);
authApp
    .controller('previewController', function ($scope, $http, $window, $uibModalInstance, Util, Modal, Review) {
        $scope.titles = ['Sucks big time - 1 star','Kinda bad - 2 stars','Meh - 3 stars','Pretty good - 4 stars','Awesome - 5 stars'];
        $scope.review = Review;
        console.log($scope.review);
        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    
    });