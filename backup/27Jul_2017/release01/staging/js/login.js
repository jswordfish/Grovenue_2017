var app = angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'UtilService', 'AuthService', 'UserService', 'ModalService', 'ngImgCrop', 'authModule', 'FeedbackModule']);
app.controller('loginController', function ($scope, $http, $window, Util, Auth, Feedback, Modal) {
    $scope.baseApiUrl = Util.getBaseUrl();
	
	$scope.feedback = {};	
	$scope.submitted = "";
	$scope.searchString = '';
	$scope.contactus = {};
	$scope.cities = [];
	$scope.states = Util.getStates();
	console.log($scope.states);
	$scope.loggedInUser = Util.getLoggedInUser();
	//$scope.cities = Util.getCities($scope.loggedInUser.state);
	//console.log("State", $scope.loggedInUser.state);
	//console.log("Cities", $scope.cities);
    if($scope.loggedInUser!=null)
       $scope.cities = Util.getCities($scope.loggedInUser.state);
    $scope.isLoggedin = function () {
        if ($scope.loggedInUser === null || $scope.loggedInUser === undefined) {
            return false;
        }
        else if ($scope.loggedInUser.constructor != {}.constructor) {
            return false;
        }
        else if (!$scope.loggedInUser.hasOwnProperty('user')) {
            return false;
        }
        else {
            return true;
        }
    }

    $scope.stateChanged = function () {
        if ($scope.loggedInUser != null)
            $scope.cities = Util.getCities($scope.loggedInUser.state);
    }

    
    $scope.signOff = function () {
                console.log('in signoff method');
                var modalOptions = {
                    closeButtonText: 'No',
                    actionButtonText: 'Yes',
                    headerText: 'Continue?',
                    bodyText: 'Are you sure you want to sign off?'
                };
                Modal.showModal({}, modalOptions)
                    .then(function (result) {
                        $window.localStorage.setItem("loggedInUser", null);
                        $scope.loggedInUser = null;
                    });
            }

    // modal open section
    $scope.openLoginSignupModal = function () {
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            size: 'lg',
            controller: 'authController',
            templateUrl: 'partials/login-signup-modal.html',
            windowClass: 'modal-window-extension'
        };
        Modal.showModal(modalDefaults, {})
            .then(function (result) {
                $scope.loggedInUser = result;
            });
    }

    $scope.showEditProfile = function () {
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            size: 'lg',
            controller: 'authController',
            templateUrl: 'partials/profile-modal.html',
            windowClass: 'profile-modal-window-extension'
        };
        Modal.showModal(modalDefaults, {})
            .then(function (result) {
                console.log("Ok clicked");
            });
    }

    $scope.showChangePassword = function () {
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            size: 'lg',
            controller: 'authController',
            templateUrl: 'partials/change-password-modal.html',
            windowClass: 'modal-window-extension'
        };
        Modal.showModal(modalDefaults, {})
            .then(function (result) {
                console.log("Ok clicked");
            });
    }

    $scope.showInviteFriends = function () {
        if ($scope.loggedInUser.socialMedia === false) {
            Util.alert("Alert","You are not logged in via Social Media account, hence cannot use this functionality.");
        }
        else {
                var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                controller: 'authController',
                templateUrl: 'partials/invite-friend-modal.html',
                windowClass: 'modal-window-extension'
            };
            Modal.showModal(modalDefaults, {});
        }

    }

    $scope.openTakeABreakModal = function () {
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            size: 'lg',
            templateUrl: 'partials/take-a-break-modal.html',
            windowClass: 'modal-window-extension'
        };
        Modal.showModal(modalDefaults, {})
            .then(function (result) {

            });
    }
    
    $scope.open = function(url) {
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            size: 'lg',
            templateUrl: url,
            windowClass: 'modal-window-extension'
        };
        Modal.showModal(modalDefaults, {})
            .then(function (result) {

            });
    }
    // modal open section end
	$scope.contactus.name="";
    $scope.contactus.email="";
    $scope.contactus.city="";
    $scope.contactussubmit = function () {
        console.log($scope.contactus);
        if ($scope.contactus.name === null || $scope.contactus.name === "") {
            alert("Please enter name");
            return false;
        }
        if ($scope.contactus.email === null || $scope.contactus.email === "") {
            alert("Please enter email");
            return false;
        }
        if ($scope.contactus.city === null || $scope.contactus.city === "") {
            alert("Please select city");
            return false;
        }
	    $scope.contactus.message = $scope.contactus.message + "City : " + $scope.contactus.city + "Contact : " + $scope.contactus.contactno;
	    $scope.submitted = Feedback
                .feedbacksubmit($scope.contactus);
	    $scope.contactus.name = "";
	    $scope.contactus.email = "";
	    $scope.contactus.message = "";
	    $scope.contactus.City = "";
	    $scope.contactus.contactno = "";

	    alert("Your Request is submitted. Thanks");
	    return $scope.submitted;
	}
	$scope.AdvBooks = function () {
	    $scope.AdvBooks.message = "Book Name : " + $scope.AdvBooks.BookName + "Author : " + $scope.AdvBooks.Author + "ISBN No. : " + $scope.AdvBooks.ISBN + "Publication Date : " + $scope.AdvBooks.PublicationDate;
	    $scope.submitted = Feedback
                .feedbacksubmit($scope.AdvBooks);
	    $scope.AdvBooks.BookName = "";
	    $scope.AdvBooks.Author = "";
	    $scope.AdvBooks.ISBN = "";
	    $scope.AdvBooks.PublicationDate = "";
	    $scope.AdvBooks.message = "";

	    alert("Your Request is submitted. Thanks");
	    return $scope.submitted;
	}
	$scope.AdvCoachClass = function () {
	    $scope.AdvCoachClass.message = "Class Name : " + $scope.AdvCoachClass.ClassName + "Owner : " + $scope.AdvCoachClass.Owner + "Year Founded : " + $scope.AdvCoachClass.YFounded + "Website URL : " + $scope.AdvCoachClass.website;
	    $scope.submitted = Feedback
                .feedbacksubmit($scope.AdvCoachClass);
	    $scope.AdvCoachClass.ClassName = "";
	    $scope.AdvCoachClass.Owner = "";
	    $scope.AdvCoachClass.YFounded = "";
	    $scope.AdvCoachClass.website = "";
	    $scope.AdvCoachClass.message = "";

	    alert("Your Request is submitted. Thanks");
	    return $scope.submitted;
	}
	$scope.AdvTools = function () {
	    $scope.AdvTools.message = "Tool Name : " + $scope.AdvTools.ToolName + "Year Founded : " + $scope.AdvTools.YFounded + "Website URL : " + $scope.AdvTools.WebUrl + "App URL : " + $scope.AdvTools.AppUrl;
	    $scope.submitted = Feedback
                .feedbacksubmit($scope.AdvTools);
	    $scope.AdvTools.ToolName = "";
	    $scope.AdvTools.YFounded = "";
	    $scope.AdvTools.WebUrl = "";
	    $scope.AdvTools.AppUrl = "";
	    $scope.AdvTools.message = "";

	    alert("Your Request is submitted. Thanks");
	    return $scope.submitted;
	}
	
	$scope.search = function(){
		console.log(' in search function search string is '+$scope.searchString);
			if($scope.searchString == '' || $scope.searchString == 'null' || $scope.searchString == null){
				return;
			}
			else{
				$window.localStorage.setItem("searchString", $scope.searchString);
				$window.location.href = 'write_review.html';
				$scope.searchString = '';
			}
		
	}
	
	$scope.redirectAndSearch = function() {
		window.localStorage.setItem("isRedirectedSearch", true);
		window.localStorage.setItem("redirectSearchKeyword",
				$scope.searchText);
		$window.location.href = 'prepare_for_greatness.html';
	}
});