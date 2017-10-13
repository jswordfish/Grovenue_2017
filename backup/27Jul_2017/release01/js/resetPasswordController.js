var app = angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'UtilService', 'ModalService', 'authModule']);

app
    .controller('resetPasswordController',
        function ($scope, $http, $window, $sce, Util, Auth) {
            $scope.baseApiUrl = Util.getBaseUrl();
            
        $scope.isSuccess = false;
        $scope.reset = {};
        $scope.reset.user = "";
        $scope.reset.password = "";
        $scope.reset.confirmPassword = "";
        
        $scope.init = function () {
            var vars = Util.getUrlVars();
            console.log(vars);
            if(vars.length>0) {
                $scope.reset.user = atob(vars[vars[0]]);
            }
        }
        
        $scope.resetPassword = function () {
            console.log($scope.reset);
            if ($scope.reset.password.length < 5) {
                Util.alert('Alert', 'New Password should have atleast 5 characters');
            } else if ($scope.reset.password != $scope.reset.confirmPassword) {
                Util.alert('Alert', 'New and Repeat Passwords are not same.');
            } else {
                var data = {};
                data.user = $scope.reset.user;
                data.socialMedia = false;
                data.socialMediaType = "NONE";
                data.validated = true;
                data.newPassword = $scope.reset.password;
                $http
                    .post($scope.baseApiUrl + '/ws/rest/resourceService/saveResetPassword/token/test', data)
                    .then(function(response) {
                    console.log(response);
                    Util.alert('Alert', 'Congratulations! Your Password has been successfully updated.');
                    $scope.isSuccess = true;
                }, function(response) {
                    console.log(response);
                });
            }
        }

        });
