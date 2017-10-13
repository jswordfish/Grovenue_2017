
var app = angular.module('myApp', []);
app.controller('adminShortCutsController', function ($scope, $http, $window) {

    var user = $window.localStorage.getItem('loggedInUser') || null;
    console.log('user is ' + user);

    user = JSON.parse(user);
    if(user==null)
        $window.location.href = '../index.html';
    
    console.log('user.userType is ' + user.userType);
    if (user.userType != 'ADMIN') {
        $window.location.href = '../index.html';
    }

    $scope.signOff = function () {
        console.log('in signoff method');

        $window.localStorage.setItem("loggedInUser", null);
        $window.location.href = '../index.html';
    }


});