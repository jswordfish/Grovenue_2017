
var app = angular.module('myApp', []);
app.controller('adminShortCutsController', function ($scope, $http, $window) {

    $scope.user = {};

    var user = $window.localStorage.getItem('loggedInUser');
    console.log('user is ' + user);

    if(user==null)
        $window.location.href = 'index.html';
    
    
    user = JSON.parse(user);
    console.log('user.userType is ' + user.userType);
    //below comparison must be with ADMIN instead of SYSTEM
    if (user.userType != 'SYSTEM') {
        $window.location.href = 'index.html';
    }

    $scope.signOff = function () {
        console.log('in signoff method');

        $window.localStorage.setItem("loggedInUser", null);
        $window.location.href = 'index.html';
    }


});