
var app = angular.module('myApp', ['UtilService']);
app.controller('bookSearchManagementController', function ($scope, $http, $window, Util) {
    $scope.baseApiUrl = Util.getBaseUrl();
    var redirectUrl = "http://www.grovenue.co/";
    $scope.user = {};

    var user = $window.localStorage.getItem('loggedInUser');
    console.log('user is ' + user);

    if (user == 'null') {
        user = null;
    }


    if (user != null) {
        console.log('right');
        user = jQuery.parseJSON(user);
        console.log('user.userType is ' + user.userType);
        if (user.userType != 'ADMIN') {
            console.log('not logged in as Admin');
            $window.location.href = 'index.html';
        }
    }
    else {
        console.log('not logged in as Admin');
        $window.location.href = 'index.html';
    }


    var gC = "(?i)A.*";
    gC = window.encodeURIComponent(gC);
    var url = $scope.baseApiUrl + '/ws/rest/bookService/searchBook/title/' + gC + '/token/test';
    console.log(url);
    $http.get(url).
     success(function (data) {
         console.log('here ');
         $scope.searchResponse = data;


     });

    $scope.signOff = function () {
        console.log('in signoff method');

        $window.localStorage.setItem("loggedInUser", null);
        $window.location.href = 'index.html';
    }


    $scope.updateBook = function (book) {
        console.log('searchable ' + book.searchable);
        var url = $scope.baseApiUrl + '/ws/rest/bookService/updateKeywordAndSearchableParam/book/token/test';
        $http.post(url, book).
	    success(function (data) {
	        alert('Book Search Status Updated');

	    });
    };

    $scope.fetchBooks = function (startWith) {

        var gC = "(?i)" + startWith + ".*";
        gC = window.encodeURIComponent(gC);
        var url = $scope.baseApiUrl + '/ws/rest/bookService/searchBook/title/' + gC + '/token/test';
        console.log(url);
        $http.get(url).
         success(function (data) {
             console.log('books ' + JSON.stringify(data));
             $scope.searchResponse = data;

         });

    };



});