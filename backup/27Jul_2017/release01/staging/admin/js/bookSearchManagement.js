
var app = angular.module('myApp', ['UtilService']);
app.controller('bookSearchManagementController', function ($scope, $http, $window, Util) {
    $scope.baseApiUrl = Util.getBaseUrl();
    var redirectUrl = "http://www.grovenue.co/";

    var user = $window.localStorage.getItem('loggedInUser')||null;
    console.log('user is ' + user);

    user = JSON.parse(user);
    if(user==null)
        $window.location.href = '../index.html';
    
    console.log('user.userType is ' + user.userType);
    if (user.userType != 'ADMIN') {
        $window.location.href = '../index.html';
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
        $window.location.href = '../index.html';
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