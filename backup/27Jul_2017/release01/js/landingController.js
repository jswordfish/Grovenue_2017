var app = angular.module('myApp', []);
var register = angular.module('myApp', ['FeedbackService', 'UserService',
		'ngImgCrop']);
app
		.controller(
				'landingController',
				function($scope, $http, $window) {

					$scope.tempUser = '';
					$scope.user = '';
					$scope.password = '';

					$scope.sendUser = function() {
						var url = 'ws/rest/utilService/tempUser/email/'
								+ $scope.tempUser + '/token/test';
						$http
								.post(url, null)
								.success(
										function(data) {
											bootbox
													.alert("Thank you for your interest! We will get back to you soon");
										});
					}

					$scope.login = function() {
						var usr = window.encodeURIComponent($scope.user);
						var password = window
								.encodeURIComponent($scope.password);
						var url = 'ws/rest/resourceService/authenticate/user/'
								+ usr + '/password/' + password
								+ '/socialMediaType/NONE';

						$http
								.post(url, null)
								.success(
										function(data) {
											$scope.loggedInUser = data;
											var u = data;
											$window.localStorage.setItem(
													"loggedInUser", JSON
															.stringify(data));

											if (u.userType == 'ADMIN') {
												$window.location.href = 'app/AdminShortCuts.html';
											} else {
												$window.location.href = 'app/index.html';
											}
										});

					}
					

				});
register
		.controller(
				"loginController",
				function ($scope, $http, $window, $filter, $sce, Feedback) {
				    $scope.submit = function (feed) {
				        if ($scope.feedback.Position != "") {
				            $scope.feedback.message = $scope.loggedInUser.user + " has applied for this Position" + $scope.feedback.Position;
				        }
				        console.log(feed.email);
				        $scope.submitted = Feedback
								.feedbacksubmit($scope.feedback);
				        $scope.feedback.name = "";
				        $scope.feedback.email = "";
				        $scope.feedback.message = "";

				        document.getElementById('fbForm').style.display = "none";
				        bootbox.alert("Your Application is submitted. Thanks");
				        return $scope.submitted;
				    }
				});