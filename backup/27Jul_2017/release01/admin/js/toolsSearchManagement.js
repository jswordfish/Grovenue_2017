
var app = angular.module('myApp', ['UtilService']);
app.controller('toolsSearchManagementController', function ($scope, $http, $window, Util) {
    $scope.baseApiUrl = Util.getBaseUrl();
	
	var user = $window.localStorage.getItem('loggedInUser') || null;
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
	var url = $scope.baseApiUrl + '/ws/rest/digitalToolService/searchDigitalTool/name/'+gC+'/token/test';
	console.log(url);
	   $http.get(url).
	    success(function(data) {
		console.log('here ');
		   $scope.searchResponse = data;
		    
		   
	    });
	
	$scope.signOff = function(){
		console.log('in signoff method');
		
		$window.localStorage.setItem("loggedInUser", null);
		$window.location.href = '../index.html';
	}
	
	
	$scope.updateDigitalTool = function(digitalTool) {
	console.log('searchable '+digitalTool.searchable);
	var url = $scope.baseApiUrl + '/ws/rest/digitalToolService/updateKeyword/token/test';
		$http.post(url, digitalTool).
	    success(function(data) {
		alert('DigitalTool Search Status Updated');
		   
	    });
	};
	
	$scope.fetchDigitalTools = function(startWith) {
		
		var gC = "(?i)"+startWith+".*";
		gC = window.encodeURIComponent(gC);
		var url = $scope.baseApiUrl + '/ws/rest/digitalToolService/searchDigitalTool/name/'+gC+'/token/test';
		console.log(url);
		   $http.get(url).
		    success(function(data) {
				console.log('classes '+JSON.stringify(data));
			    $scope.searchResponse = data;
			   
		    });
		
	};
		
	
	
});