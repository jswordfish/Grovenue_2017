function generateToken() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
			function(c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
	return uuid;
};

var app = angular.module('myApp', ['FeedbackService', 'UserService', 'ngImgCrop']);
app.controller( 'loginController',  function($scope, $http, $window, Feedback) {

	
	$scope.feedback = {};	
	$scope.submitted = "";
	$scope.user = {};
	$scope.someObject = {};
	$scope.termCheck = false;
	$scope.searchString = '';
	
	var user = $window.localStorage.getItem('loggedInUser');
	console.log('user is '+user);
	
	$scope.submit = function (feed) {
	    console.log(feed.email);
	    $scope.submitted = Feedback
                .feedbacksubmit($scope.feedback);
	    $scope.feedback.name = "";
	    $scope.feedback.email = "";
	    $scope.feedback.message = "";

	    document.getElementById('fbForm').style.display = "none";
	    alert("Your feedback is submitted. Thanks");
	    return $scope.submitted;
	}
	$scope.contactus = function () {
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
	$scope.loggedInUser = '';
	$scope.profileText = 'login / register';
	$scope.profileDialog = 'modal';
	
	$scope.headeruser = '';
	$scope.repeatPassword = '';
	
	$scope.courseCompletionYear = ['1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1998', '1999', 

'2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'];

	if(user == 'null'){
		user = null;
	}
	
		if(user != null){
		console.log('right');
		user = jQuery.parseJSON(user);
		console.log('user.user is '+user.user);
			if(user.userType == 'ADMIN'){
				console.log('not logged in as Admin');
				$window.location.href = 'AdminShortCuts.html';
			}
			else{
				$scope.loggedInUser = user;
				$scope.headeruser = '#headeruser';
				$scope.profileDialog = '';
				// $scope.profileDialog = 'signoff';
				$scope.profileText = user.firstName+' '+user.lastName;
				console.log('profileDialog is '+$scope.profileDialog);
				
			}
		
			
		}
		else{
		console.log('disable profile div');
		$scope.headeruser = '';
		
		}
	
		
	
	
	
	console.log('termscheck is '+$scope.termCheck );
	
	
	
	$scope.signup=function(user){
		console.log(user.email);
		
		var url = '../ws/rest/resourceService/saveOrUpdateUser/token/test';
		$http.post(url, user) .
			success(function(data) {
			console.log('request successful');
			
			var serviceResponse = data;
			console.log(JSON.stringify(serviceResponse));
				if(serviceResponse.responseStatus == 'User_Saved'){
					console.log('user saved');
					$scope.loggedInUser = user.email;
					// alert("Congratulations. You are registered. Please check
					// your email for the activation link");
					bootbox.alert("Congratulations. You are registered. Please check your email for the activation link");
					$scope.closeRegDialog();
				}
				else if(serviceResponse.responseStatus.startsWith("User_Exists_Social_Media_")){
					var socialMedia = serviceResponse.responseStatus.substring("User_Exists_Social_Media_".length(), serviceResponse.responseStatus.length);
					// $("<div title='Already logged in through
					// '"+socialMedia+"'> Please use another email id for
					// registration</div>").dialog();
					// Feedback.showDialog('Already logged in through
					// '+socialMedia, 'Please use another email id for
					// registration');
					// alert('You had logged in earlier through '+socialMedia+'.
					// You can continue use '+socialMedia +' to log in or else
					// register using a different password.');
					bootbox.alert('You had logged in earlier through '+socialMedia+'. You can continue use  '+socialMedia +' to log in or else register using a different password.');
					$scope.closeRegDialog();
				}
				else if(serviceResponse.responseStatus == 'User_Exists_Normal'){
					// $("<div title='Basic dialog'>You are already registered.
					// Just Log in</div>").dialog();
					// Feedback.showDialog('Basic dialog', 'You are already
					// registered. Just Log in');
					
					// alert('You are already registered. Just Log in using your
					// email Id. In case you have forgotten your password, use
					// the Forget Password link');
					bootbox.alert('You are already registered. Just Log in using your email Id. In case you have forgotten your password, use the Forget Password link');
					$scope.closeRegDialog();
				}
		});
		
		return $scope.submitted;
	}
	
	$scope.login = function(user){
	var usr = window.encodeURIComponent(user.user);	
	var password = window.encodeURIComponent(user.password);
	var url = '../ws/rest/resourceService/authenticate/user/'+usr+'/password/'+password+'/socialMediaType/NONE';
		$http.post(url, null) .
			success(function(data) {
			$scope.headeruser = '#headeruser';
			console.log('request successful');
			var u = data;
			console.log(' user got is '+u);
			$scope.profileDialog = '';
			$scope.profileText = data.firstName+' '+data.lastName;
			$scope.closeRegDialog();
			console.log('data... is '+data);
			$window.localStorage.setItem("loggedInUser", JSON.stringify(data));
			console.log('user type is'+user.userType);
			 $scope.$apply()
				if(u.userType == 'ADMIN'){
					$window.location.href = 'AdminShortCuts.html';
				}
				
		}).
		error(function (data, status, headers, config) {
                        
			bootbox.alert("Your Login attempt failed! can you re-check your credentials and try again");
                });
	}
	
	$scope.check=function(){
		console.log('termscheck is ...'+$scope.termCheck);
		if($scope.termCheck){
			return false;
		}
		else{
			return true;
		}
	}
	
	$scope.closeRegDialog = function(){
	console.log(' inside closeRegDialog');
		document.getElementById('modal').style.display = "none";
	
	}
	
	$scope.signOff = function(){
		console.log('in signoff method');
		
		document.getElementById('headeruser').style.display = "none";
		bootbox.confirm("Are you sure you want to sign off!", function(result) {
		 console.log('result is '+result);
			if(result == true){
				console.log('true');
				$scope.headeruser = '';
				$scope.profileText = 'login / register';
				$scope.profileDialog = 'modal';
				$window.localStorage.setItem("loggedInUser", null);
				$scope.$apply();
			}
			else{
				// do nothing
			}
		}); 
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
	
	
	// tab
	
	$scope.showEditProfile = function(){
		document.getElementById('headeruser').style.display = "none";
		document.getElementById('tab').style.display = "";
	}
	
					$scope.showInviteFriends = function() 
					{
						
						document.getElementById('headeruser').style.display = "none";
						if($scope.loggedInUser.socialMedia==true)
						{
							$("#headerinvitefriend").show();
						}
						else
						{
							$scope.socialLoginForGetFriends($scope.loggedInUser.socialMediaType);
						}
						

					}
					$scope.socialLoginForGetFriends = function(network) 
					{
						$scope.socialLogin(network);
						$("#inviteFriendsLogin").hide();
						$scope.getfriends();
						$scope.headerinvitefriend();
					}

					$scope.headerinvitefriend=function()
					{
						$("#headerinvitefriend").hide();
					}
	
	
	/** ***** Added By Sagar ******* */
	$scope.myImage='';
	var usr = $.extend({},$scope.loggedInUser);
	$scope.defImage = usr.base64Image;
	$scope.myCroppedImage = '';
	$scope.showImagePreview = false;
	$scope.photoStatus = "Edit Photo";
	$scope.editOption  = angular.isDefined(usr.socialMediaType);

	$scope.editPhotoBegin = function(){
		if($scope.showImagePreview){
			$scope.photoStatus = "Edit photo";
		}else{
			$scope.photoStatus = "Done";
		}
		$scope.showImagePreview = !$scope.showImagePreview;
	}

	$scope.$watch('myCroppedImage',function(newVal,oldVal){
		console.log('-------',newVal);
		if($scope.showImagePreview){
				$scope.defImage = newVal;
				$scope.loggedInUser.base64Image = newVal;
		}
	});

	var handleFileSelect=function(evt) {
		var file=evt.currentTarget.files[0];
		var reader = new FileReader();
		reader.onload = function (evt) {
			$scope.$apply(function($scope){
				$scope.myImage=evt.target.result;
			});
		};
		reader.readAsDataURL(file);
	};
	angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
	/** ***** Added By Sagar ******* */
	
	$scope.updateUserProfile = function(){
	console.log('first name is '+$scope.loggedInUser.firstName);
	console.log('birth date is '+$scope.loggedInUser.birthDate);
	console.log(JSON.stringify($scope.loggedInUser));
		$http.post('../ws/rest/resourceService/saveOrUpdateUser/token/test', $scope.loggedInUser).success(function(data)
		{
			console.log('user profile updated');
			$window.localStorage.setItem("loggedInUser", JSON.stringify($scope.loggedInUser));

		});
		
	}
	
	$scope.checkPasswordValidations = function(){
		if($scope.loggedInUser.newPassword.length < 5){
			bootbox.alert("New Password should have atleast 5 characters");
		}
		else if($scope.loggedInUser.newPassword != $scope.repeatPassword){
			bootbox.alert("New and Repeat Passwords are not same ");
		}
		else{
			$http.post('../ws/rest/resourceService/updatePassword/token/test', $scope.loggedInUser).success(function(data)
			{
				console.log('user password updated');
				$window.localStorage.setItem("loggedInUser", JSON.stringify($scope.loggedInUser));
				
				bootbox.alert("Congratulations! Your Password has been successfully updated.");
				$scope.loggedInUser.newPassword = '';
				$scope.repeatPassword = '';
				document.getElementById('changepassword').style.display = "none";
				
			});
		}
		
		
	}
	
	$scope.hideTab = function(){
	document.getElementById('tab').style.display = "none";
	}
	
	// Social Login Related Code
	// @author sharmapuneet1510@gmail.com
	var userId = "";
	var client = "";
	var network = "";
	var socialMedialogin = false;
	$scope.profilePic = "";
	$scope.friendslist = [];
	var loggedIdUser;
	var clientNetwork;
	$scope.inviteFriendLists = [];

	$scope.invitationMessage = "";

	// Check whether User Been Selected
	$scope.isSelected = function(emailAddress)
		{
			return $scope.inviteFriendLists.indexOf(emailAddress) >= 0;
		};
	$scope.addFriendToInvitationList = function(emailAddress)
		{
			if ($scope.inviteFriendLists.indexOf(emailAddress) === -1)
				{
					console.log("select : " + emailAddress);
					$scope.inviteFriendLists.push(emailAddress);
				}
			else
				{
					console.log("un-select : " + emailAddress);
					$scope.inviteFriendLists.splice($scope.inviteFriendLists.indexOf(emailAddress), 1);
				}
		};

	$scope.inviteFriends = function()
		{
			var url = '../ws/rest/resourceService/inviteFriendThroughSocialMedia/socialMediaType/' + clientNetwork + '/token/test?userId=' + userId;
			$scope.invitation = {};
			$scope.invitation.emailAddresses = $scope.inviteFriendLists;
			$scope.invitation.invitationMessage = $scope.invitationMessage;
			$http.post(url, $scope.invitation).success(function(data)
				{
					// alert("User successfully Invited");
					$("#invitefriendsmodal").hide();
				});

		}
	$scope.friendslistTemp = [];
	$scope.getfriends = function()
		{
			if (clientNetwork == 'google' || clientNetwork == 'facebook')
				{
					$("#loading").show();
					var path;
					if (clientNetwork == 'google')
						{
							path = "me/contacts";
						}
					else if (clientNetwork == 'facebook')
						{
							path = "me/friends";
						}
					hello(clientNetwork).api(path, {
						limit : 1000
					}).then(function responseHandler(response)
						{
							for (var i = 0; i < response.data.length; i++)
								{
									var socialFriend = response.data[i];
									console.log(JSON.stringify(socialFriend));
									$scope.friend = {};
									// $scope.friend.displayPic=socialFriend.thumbnail;
									// can be used in future
									$scope.friend.displayPic = "images/userfill.png";
									$scope.friend.email = socialFriend.email;
									if (socialFriend.name != null && socialFriend.name != "")
										{
											$scope.friend.displayName = socialFriend.name;
											$scope.friendslistTemp.push($scope.friend);
										}
								}
							if (response.data.length > 0)
								{
									$http.post('../ws/rest/resourceService/addFriendsFromSocialMedia/socialMediaType/' + clientNetwork + '/token/test?userId=' + $scope.loggedInUser.user, $scope.friendslistTemp).success(function(response)
										{
											for (var i = 0; i < response.length; i++)
												{
													$scope.friend = response[i];
													$scope.friendslist.push($scope.friend);
													$scope.addFriendToInvitationList($scope.friend.email);
												}
											console.log("Updated List of Emails" + JSON.stringify($scope.inviteFriendLists));
											// 
											$("#loading").hide();
											$("#modal").hide();
											$("#invitefriendsmodal").show();
											// $scope.$apply();
										});
									console.log(JSON.stringify($scope.friendslist));
									console.log(JSON.stringify($scope.friendslist.length));
								}
						});
				}
		}

	$scope.closeInvitefriendsmodal = function()
		{
			$("#invitefriendsmodal").hide();
		}
	var  redirectUrl="index.html";
	$scope.socialLogin = function(network)
		{
		clientNetwork = network;
		if (network == 'google') {
			hello
					.init(
							{
								'google' : '37695017955-fdprjmfel4mtmful1tfc1rpmtc955kpm.apps.googleusercontent.com'
							}, {
								redirect_uri : 'index.html',
								scope : [ 'basic', 'email',
										'friends' ]
							});
		} else if (network == 'facebook') {
			hello.init({
				'facebook' : '617188258436797'
			}, {
				redirect_uri : 'index.html'
			});
		} else if (network == 'linkedin') {
			hello.init({
				'linkedin' : '75aycy8klwf70r'
			}, {
				redirect_uri : 'index.html',
				scope : [ 'friends', 'email' ]
			});
		} else if (network == 'twitter') {
			hello.init({
				'twitter' : 'NftcrZDlBGbPmhIX5vPMKSyPb'
			}, {
				redirect_uri : 'index.html'
			});
		} else if (network == 'instagram') {
			hello
					.init(
							{
								'instagram' : '517d3cc4879f4e7385491b4352abcdc5'
							}, {
								redirect_uri : 'index.html'
							});
		}
		var socail = hello(network);
		socail
				.login()
				.then(function(r) {
					socialMedialogin = true;
					// alert('You are signed in to '+network);
					return socail.api('me');
				}, function() {
					console.log(JSON.stringify(arguments))
				})
				.then(
						function(response) {
							socialMedialogin = true;
							console.log(JSON
									.stringify(response));
							var url = '../ws/rest/resourceService/getUserByEmailAddressAndSocialMediaType/socialMediaType/'
									+ network
									+ '/token/'
									+ generateToken();
							if (network == 'google') {
								// userId=response.email;
								$scope.profilePic = response.picture;
								for (var i = 0; i < response.emails.length; i++) {
									if (response.emails[i].type === 'account') {
										userId = response.emails[i].value
									}
								}
							} else if (network == 'facebook') {
								$scope.profilePic = response.picture;
								userId = response.email;
							} else if (network == 'linkedin') {
								$scope.profilePic = response.picture;
								userId = response.data.username
										+ "@linkedin.com";
							} else if (network == 'twitter') {
								$scope.profilePic = response.picture;
								userId = response.screen_name
										+ "@twitter.com";
							} else if (network == 'instagram') {
								userId = response.data.username
										+ "@instagram.com";
								$scope.profilePic = response.data.profile_picture;
							}

							$http
									.get(
											url
													+ "?emailAddress="
													+ userId)
									.success(
											function(
													userResponse) {
												if (userResponse != null
														&& userResponse == "") {
													$scope.user = {};
													if (network == 'google'
															|| network == 'facebook'
															|| network == 'twitter'
															|| network == 'linkedin') {
														$scope.user.firstName = response.first_name;
														$scope.user.lastName = response.last_name;
														$scope.user.validated = response.verified;
													} else if (network == 'instagram') {
														var fullName = response.data.full_name;
														$scope.user.fullName = fullName;
														var names = fullName
																.split(" ");
														if (names.length === 1) {
															$scope.user.firstName = names[0];
														} else if (names.length === 2) {
															$scope.user.firstName = names[0];
															$scope.user.lastName = names[1];
														}

													}
													$scope.user.user = userId;
													$scope.user.socialMedia = true;
													$scope.user.socialMediaType = network
															.toUpperCase();
													$http
															.post(
																	'../ws/rest/resourceService/saveOrUpdateUser/token/test',
																	$scope.user)
															.success(
																	function(
																			data) {
																		$http
																				.get(
																						url
																								+ "?emailAddress="
																								+ userId)
																				.success(
																						function(
																								userResponse) {
																							console
																									.log('Create User User '
																											+ JSON
																													.stringify(userResponse));

																							// Setting
																							// Mapping
																							// User
																							// to
																							// Normal
																							// User
																							$scope.loggedInUser = userResponse;

																							$scope.headeruser = '#headeruser';
																							$scope.profileDialog = '';
																							// $scope.profileDialog
																							// =
																							// 'signoff';
																							$scope.profileText = $scope.loggedInUser.firstName+ ' '+ $scope.loggedInUser.lastName;
																							$scope.userId = $scope.loggedInUser.user;
																							console.log('profileDialog is '+ $scope.profileDialog+ ' User Id '+ $scope.userId);
																							$window.localStorage.setItem("loggedInUser", JSON.stringify($scope.loggedInUser));
																						});
																		$(
																				"#modal")
																				.hide();
																		$(
																				"#inviteFriends")
																				.show();
																		if ($scope.page === 'write_a_review') {
																			$(
																					"#submitReview")
																					.show();
																		}
																		console
																				.log('Create User');

																	})
															.error(
																	function(
																			errorResponse) {
																		$scope.profilePic = "images/testimonials.png"
																		bootbox
																				.alert("Error Registering User From Social Media");
																	});
												} else {
													console
															.log('Create User User '
																	+ JSON
																			.stringify(userResponse));
													$(
															"inviteFriendsLogin")
															.hide();
													$("#modal")
															.hide();
													$(
															"#inviteFriends")
															.show();
													$(
															"#submitReview")
															.show();
													// Setting
													// Mapping
													// User to
													// Normal
													// User
													$scope.loggedInUser = userResponse;
													$scope.headeruser = '#headeruser';
													$scope.profileDialog = '';
													// $scope.profileDialog
													// =
													// 'signoff';
													$scope.userId = $scope.loggedInUser.user;
													$scope.profileText = $scope.loggedInUser.firstName
															+ ' '
															+ $scope.loggedInUser.lastName;
													console.log('profileDialog is '+ $scope.profileDialog+ ' User Id '+ $scope.userId);
													$window.localStorage.setItem("loggedInUser", JSON.stringify($scope.loggedInUser));
												}
											});
						});
		
		}
	
	
	
	
	
	
	$scope.redirectAndSearch = function() {
		window.localStorage.setItem("isRedirectedSearch", true);
		window.localStorage.setItem("redirectSearchKeyword",
				$scope.searchText);
		$window.location.href = 'prepare_for_greatness.html';
	}
});