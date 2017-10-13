
var app = angular.module('myApp', ['UtilService']);
app.controller('coachingClassSearchManagementController', function ($scope, $http, $window, Util) {
    $scope.baseApiUrl = Util.getBaseUrl();
	$scope.user = {};
	
	var user = $window.localStorage.getItem('loggedInUser');
	console.log('user is '+user);
	
		if(user == 'null'){
			user = null;
		}
	
	
		if(user != null){
		console.log('right');
		user = jQuery.parseJSON(user);
		console.log('user.userType is '+user.userType);
			if(user.userType != 'ADMIN'){
				console.log('not logged in as Admin');
				$window.location.href = 'index.html';
			}
		}
		else{
		console.log('not logged in as Admin');
		$window.location.href = 'index.html';
		}
	
	
	var gC = "(?i)A.*";
	gC = window.encodeURIComponent(gC);
	var url = $scope.baseApiUrl + '/ws/rest/coachingClassService/searchCoachingClass/name/'+gC+'/token/test';
	console.log(url);
	   $http.get(url).
	    success(function(data) {
		console.log('here ');
		   $scope.searchResponse = data;
		    
		   
	    });
	
	$scope.signOff = function(){
		console.log('in signoff method');
		
		$window.localStorage.setItem("loggedInUser", null);
		$window.location.href = 'index.html';
	}
	
	
	$scope.updateCoachingClass = function(coachingClass) {
	console.log('searchable '+coachingClass.searchable);
	var url = $scope.baseApiUrl + '/ws/rest/coachingClassService/updateKeyword/token/test';
		$http.post(url, coachingClass).
	    success(function(data) {
		alert('CoachingClass Search Status Updated');
		   
	    });
	};
	
	$scope.fetchCoachingClasss = function(startWith) {
		
		var gC = "(?i)"+startWith+".*";
		gC = window.encodeURIComponent(gC);
		var url = $scope.baseApiUrl + '/ws/rest/coachingClassService/searchCoachingClass/name/'+gC+'/token/test';
		console.log(url);
		   $http.get(url).
		    success(function(data) {
				console.log('classes '+JSON.stringify(data));
			    $scope.searchResponse = data;
			   
		    });
		
	};
		
	
	
});