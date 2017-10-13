var curAppVersion = 1;
var appVersion = localStorage.getItem("appver");
if (appVersion != curAppVersion) {
    localStorage.clear();
    console.log("localStorage cleared!!!");
    localStorage.setItem("appver", curAppVersion);
}

var authApp = angular.module('authModule', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'
    , 'UtilService', 'AuthService', 'UserService', 'ModalService']);
authApp
    .controller('authController', function ($scope, $http, $window, $uibModalInstance, Util, Auth, Modal) {
        $scope.baseApiUrl = Util.getBaseUrl();
        // login
        $scope.user = {};
        $scope.user.user = "";
        $scope.user.password = "";
        // signup
        $scope.newUser = {};
        $scope.newUser.firstName = "";
        $scope.newUser.lastName = "";
        $scope.newUser.contact = "";
        $scope.newUser.user = "";
        $scope.newUser.password = "";
        $scope.newUser.termCheck = false;

        // change password
        $scope.chngPassObj = {};
        $scope.chngPassObj.user = "";
        $scope.chngPassObj.oldPassword = "";
        $scope.chngPassObj.newPassword = "";
        $scope.chngPassObj.repeatPassword = "";


        // profile
        $scope.activeTab = 0;
        $scope.states = Util.getStates();
        console.log($scope.states);
        $scope.years = Util.getYearsLOV();
        $scope.cities = [];
        $scope.loggedInUser = Util.getLoggedInUser();


        // social login
        var userId;
        var clientNetwork;
        //used in friendlist modal
        $scope.friendslist = [];
        $scope.inviteFriendLists = [];
        $scope.invitationMessage = "";

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        }

        $scope.login = function () {
            Auth.login($scope.user).then(function (response) {
                var usr = response.data;
                console.log('request successful');
                $window.localStorage.setItem("loggedInUser", JSON.stringify(usr));
                $uibModalInstance.close(usr);
                console.log('user type is ' + usr.userType);
                // below comparison must be with 'ADMIN'
                if (usr.userType == 'ADMIN') {
                    $window.location.href = 'admin/index.html';
                }
            }, function (response) {
                console.log(response);
                console.log("error code : " + response.status);
                Util.alert('Alert', 'Sorry, we cannot find this username and / or password. Please try again! If you forgot your password click on "Forgot password?".');
            });
        }

        $scope.validatelogin = function () {

        }

        $scope.forgotPassword = function () {
            if ($scope.user.user == "" || $scope.user.user == undefined) {
                Util.alert("Alert", "Please enter your username.")
            } else {
                // intiate forgot password flow
                var url = $scope.baseApiUrl + '/ws/rest/resourceService/resetPassword/user/' + $scope.user.user + '/token/' + Util.generateToken();
                console.log(url);
                $http.post(url, null).then(function (response) {
                    Util.alert("Alert", "Please check inbox/junk/spam folders of your mailbox, to recover your account.");
                }, function (response) {
                    Util.alert("Error", "Something went wrong. Please try again.");
                });
            }
        }

        $scope.signup = function () {
            Auth.signup($scope.newUser).then(function (response) {
                var serviceResponse = response.data;
                console.log(serviceResponse);
                if (serviceResponse.responseStatus == 'User_Saved') {
                    console.log('user saved');
                    $scope.loggedInUser = $scope.newUser.email;
                    Util.alert('Alert', 'Congratulations. You are registered. Please check your email for the activation link.');
                    $uibModalInstance.close('success');
                } else if (serviceResponse.responseStatus
                    .startsWith("User_Exists_Social_Media_")) {
                    var socialMedia = serviceResponse.responseStatus
                        .substring(
                            "User_Exists_Social_Media_"
                            .length(),
                            serviceResponse.responseStatus.length);

                    var msg = 'You had logged in earlier through ' +
                        socialMedia +
                        '. You can continue use  ' +
                        socialMedia +
                        ' to log in or else register using a different password.';
                    Util.alert('Alert', msg);
                    $uibModalInstance.close('success');
                } else if (serviceResponse.responseStatus == 'User_Exists_Normal') {
                    Util.alert('Alert', 'You are already registered. Just log in using your email id. In case you have forgotten your password, use the Forget Password link.');
                    $uibModalInstance.close('success');
                }
            }, function (response) {
                console.log(response);
                console.log("error code : " + response.status);
            });
        }

        $scope.validateSignup = function () {
            if ($scope.newUser.termCheck) {
                return false;
            } else {
                return true;
            }
        }

        $scope.checkPasswordValidations = function () {
            if ($scope.chngPassObj.newPassword.length < 5) {
                Util.alert('Alert', 'New Password should have atleast 5 characters');
            } else if ($scope.chngPassObj.newPassword != $scope.chngPassObj.repeatPassword) {
                Util.alert('Alert', 'New and Repeat Passwords are not same.');
            } else {
                var data = {};
                data.user = $scope.chngPassObj.user;
                data.password = $scope.chngPassObj.oldPassword;
                data.newPassword = $scope.chngPassObj.newPassword;
                $http
                    .post($scope.baseApiUrl + '/ws/rest/resourceService/updatePassword/token/test', data)
                    .success(
                        function (data) {
                            console.log('user password updated');
                            $uibModalInstance.dismiss();
                            Util.alert('Alert', 'Congratulations! Your Password has been successfully updated.');
                        });
            }
        }

        $scope.socialLogin = function (network) {
            clientNetwork = network;
            if (network == 'google') {
                hello.init({
                    'google': '559276599327-svsmmk2squkatvae6q99ndh1e7fq5b8h.apps.googleusercontent.com'
                }, {
                    redirect_uri: 'index.html',
                    scope: 'basic, email'
                });
            } else if (network == 'facebook') {
                hello.init({
                    facebook: '298010150620587'
                }, {
                    redirect_uri: 'index.html',
                    scope: 'basic, email, friends'
                });
            } else if (network == 'linkedin') {
                hello.init({
                    'linkedin': '75aycy8klwf70r'
                }, {
                    redirect_uri: 'index.html',
                    scope: ['friends', 'email']
                });
            } else if (network == 'twitter') {
                hello.init({
                    'twitter': '6AEbnG51tTPGbtiREb4CAkJlt'
                }, {
                    redirect_uri: 'index.html'
                });
            } else if (network == 'instagram') {
                hello.init({
                    'instagram': '18ef8078670f4d80803c90e90c953d39'
                }, {
                    redirect_uri: 'index.html',
                    scope: 'basic, email, friends'
                });
            }
            var socail = hello(network);
            socail.login(network)
                .then(function (r) {
                    socialMedialogin = true;
                    return socail.api('me');
                }, function () {
                    console.log(JSON.stringify(arguments))
                })
                .then(function (response) {
                    socialMedialogin = true;
                    console.log(JSON.stringify(response));
                    var url = $scope.baseApiUrl + '/ws/rest/resourceService/getUserByEmailAddressAndSocialMediaType/socialMediaType/' +
                        network + '/token/' + Util.generateToken();
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
                        userId = response.data.username +
                            "@linkedin.com";
                    } else if (network == 'twitter') {
                        $scope.profilePic = response.picture;
                        userId = response.screen_name +
                            "@twitter.com";
                    } else if (network == 'instagram') {
                        userId = response.data.username +
                            "@instagram.com";
                        $scope.profilePic = response.data.profile_picture;
                    }
                    $http
                        .get(url + "?emailAddress=" + userId)
                        .success(function (userResponse) {
                            if (userResponse != null && userResponse == "") {
                                $scope.user = {};
                                if (network == 'google' ||
                                    network == 'facebook' ||
                                    network == 'twitter' ||
                                    network == 'linkedin') {
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
                                $scope.user.socialMediaType = network.toUpperCase();
                                var url2 = $scope.baseApiUrl + '/ws/rest/resourceService/saveOrUpdateUser/token/test';
                                $http
                                    .post(url2, $scope.user)
                                    .success(function (data) {
                                        $http
                                            .get(url + "?emailAddress=" + userId)
                                            .success(function (userResponse) {
                                                console.log('Create User User ' + JSON.stringify(userResponse));
                                                // Setting Mapping User to Normal User
                                                $scope.loggedInUser = userResponse;
                                                $scope.profileText = $scope.loggedInUser.firstName +
                                                    ' ' +
                                                    $scope.loggedInUser.lastName;
                                                $scope.userId = $scope.loggedInUser.user;
                                                console.log('profileDialog is ' +
                                                    $scope.profileDialog +
                                                    ' User Id ' +
                                                    $scope.userId);
                                                $window.localStorage.setItem("loggedInUser", JSON.stringify($scope.loggedInUser));
                                            });
                                        $uibModalInstance.close($scope.loggedInUser);
                                        //$scope.getfriends();
                                        console.log('Create User');
                                    })
                                    .error(function (errorResponse) {
                                        $scope.profilePic = "images/testimonials.png"
                                        Util.alert('Alert', 'Error Registering User From Social Media.');
                                    });
                            } else {
                                console.log('Create User User ' + JSON.stringify(userResponse));
                                // Setting Mapping User to Normal User
                                $scope.loggedInUser = userResponse;
                                $scope.userId = $scope.loggedInUser.user;
                                $scope.profileText = $scope.loggedInUser.firstName +
                                    ' ' +
                                    $scope.loggedInUser.lastName;
                                console.log('profileDialog is ' +
                                    $scope.profileDialog +
                                    ' User Id ' +
                                    $scope.userId);
                                $window.localStorage.setItem("loggedInUser", JSON.stringify($scope.loggedInUser));
                                $uibModalInstance.close($scope.loggedInUser);
                                //$scope.getfriends();
                            }
                        });
                });
        }

        $scope.openInviteFriendsModal = function () {
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

        $scope.socialLoginForGetFriends = function (network) {
            console.log('in socialLoginForGetFriends');
            $scope.socialLogin(network);
            $scope.close();
            //$scope.getfriends();
        }

        $scope.getfriends = function () {
            
            $scope.friendslistTemp = [];
            if (clientNetwork == 'google' || clientNetwork == 'facebook') {
                var modalDefaults = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    size: 'lg',
                    controller: 'authController',
                    templateUrl: 'partials/friend-list-modal.html',
                    windowClass: 'modal-window-extension'
                };
                Modal.showModal(modalDefaults, {});
                var path;
                if (clientNetwork == 'google') {
                    path = "me/contacts";
                } else if (clientNetwork == 'facebook') {
                    path = "me/friends";
                }
                // show loading sign here
                hello(clientNetwork).api(path, {
                        limit: 1000
                    })
                    .then(
                        function responseHandler(response) {
                            for (var i = 0; i < response.data.length; i++) {
                                var socialFriend = response.data[i];
                                console
                                    .log(JSON
                                        .stringify(socialFriend));
                                $scope.friend = {};
                                // $scope.friend.displayPic=socialFriend.thumbnail;
                                // can be used in future
                                $scope.friend.displayPic = "images/userfill.png";
                                $scope.friend.email = socialFriend.email;
                                if (socialFriend.name != null &&
                                    socialFriend.name != "") {
                                    $scope.friend.displayName = socialFriend.name;
                                    $scope.friendslistTemp
                                        .push($scope.friend);
                                }
                            }
                            if (response.data.length > 0) {
                                $http
                                    .post(
                                        $scope.baseApiUrl + '/ws/rest/resourceService/addFriendsFromSocialMedia/socialMediaType/' +
                                        clientNetwork +
                                        '/token/test?userId=' +
                                        $scope.loggedInUser.user,
                                        $scope.friendslistTemp)
                                    .success(
                                        function (
                                            response) {
                                            for (var i = 0; i < response.length; i++) {
                                                $scope.friend = response[i];
                                                $scope.friendslist
                                                    .push($scope.friend);
                                                $scope
                                                    .addFriendToInvitationList($scope.friend.email);
                                            }
                                            console
                                                .log("Updated List of Emails" +
                                                    JSON
                                                    .stringify($scope.inviteFriendLists));

                                            // hide loading sign here
                                        });
                                console
                                    .log(JSON
                                        .stringify($scope.friendslist));
                                console
                                    .log(JSON
                                        .stringify($scope.friendslist.length));
                            }
                        });
            }
        }

        $scope.isSelected = function (email) {
            return $scope.inviteFriendLists.indexOf(emailAddress) >= 0;
        }

        $scope.addFriendToInvitationList = function (email) {
            if ($scope.inviteFriendLists.indexOf(emailAddress) === -1) {
                console.log("select : " + emailAddress);
                $scope.inviteFriendLists.push(emailAddress);
            } else {
                console.log("un-select : " + emailAddress);
                $scope.inviteFriendLists.splice($scope.inviteFriendLists.indexOf(emailAddress), 1);
            }
        }

        $scope.inviteFriends = function () {
            var url = $scope.baseApiUrl + '/ws/rest/resourceService/inviteFriendThroughSocialMedia/socialMediaType/' +
                clientNetwork +
                '/token/test?userId=' +
                userId;
            $scope.invitation = {};
            $scope.invitation.emailAddresses = $scope.inviteFriendLists;
            $scope.invitation.invitationMessage = $scope.invitationMessage;
            $http.post(url, $scope.invitation).success(
                function (data) {
                    $scope.close();
                });
        }

        $scope.updateUserProfile = function (goToTabIndex) {
            console.log(JSON.stringify($scope.loggedInUser));
            $http.post($scope.baseApiUrl + '/ws/rest/resourceService/saveOrUpdateUser/token/test', $scope.loggedInUser)
                .success(function (data) {
                    console.log('user profile updated');
                    $window.localStorage.setItem("loggedInUser", JSON.stringify($scope.loggedInUser));
                    if (goToTabIndex < 0) {
                        $uibModalInstance.dismiss();
                    } else {
                        $scope.activeTab = goToTabIndex;
                    }

                });

        }

        $scope.stateChanged = function () {
            if ($scope.loggedInUser != null)
                $scope.cities = Util.getCities($scope.loggedInUser.state);
        }

        $scope.fetchBookmarks = function () {

            var user = $window.localStorage.getItem('loggedInUser') || null;
            var usr = '';
            if (user === null || user === 'null' || user === "null") {
                return;
            } else {
                user = JSON.parse(user);
                usr = user.user;
            }

            var url = $scope.baseApiUrl + "/ws/rest/reviewRelatedService/fetchBookMarks/user/" +
                usr + "/token/test";
            $http.get(url).success(function (response) {
                $scope.bookmarkedResources = response;
            }).error(function (errorResponse) {

                console.log(JSON.stringify(errorResponse));
            });
        }

        $scope.fetchBookmarks();

        $scope.goToBookmarkResource = function (resourceName,
            resourceType) {
            Util.alert("Alert", "Redirection to bookmarked resource coming soon!");
            // window.localStorage.setItem("isRedirectedSearch",
            // true);
            // window.localStorage.setItem("redirectSearchKeyword",
            // resourceName);
            // window.localStorage.setItem("resourceType",
            // resourceType);
            // $window.location.href = 'prepare_for_greatness.html';
        }

        $scope.downloadCoverLetter = function () {
            var email = $window.encodeURIComponent($scope.loggedInUser.user);
            var sMedia = $scope.loggedInUser.socialMediaType;
            var url = $scope.baseApiUrl + '/ws/rest/templateService/checkIfCoverOrCVExistsForUser/user/' +
                email +
                '/socialMedia/' +
                sMedia +
                '/token/test';
            $http
                .post(url, null)
                .success(function (data) {
                    if (!data.coverAvailable) {
                        Util.alert("Alert", "Sorry! There is no cover letter generated yet for your profile!");
                    } else {
                        url = $scope.baseApiUrl + '/ws/rest/templateService/generateCoverLetterPDFForUser/user/' +
                            email +
                            '/socialMedia/' +
                            sMedia +
                            '/token/test';
                        $http({
                                url: url,
                                dataType: 'json',
                                method: 'POST',
                                data: null,
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                responseType: 'arraybuffer'
                            })
                            .success(
                                function (
                                    response) {
                                    console
                                        .log(' response got');
                                    var file = new Blob(
                                                            [response], {
                                            type: 'application/pdf'
                                        });
                                    saveAs(
                                        file,
                                        $scope.loggedInUser.user +
                                        '-COVER-.pdf');

                                });

                    }
                });
        }

        $scope.downloadCV = function () {
            var email = window
                .encodeURIComponent($scope.loggedInUser.user);
            var sMedia = $scope.loggedInUser.socialMediaType;
            var url = $scope.baseApiUrl + '/ws/rest/templateService/checkIfCoverOrCVExistsForUser/user/' +
                email +
                '/socialMedia/' +
                sMedia +
                '/token/test';
            $http
                .post(url, null)
                .success(function (data) {
                    if (!data.cvAvailable) {
                        Util.alert("Alert", "Sorry! There is no CV generated yet for your profile!");
                    } else {
                        url = $scope.baseApiUrl + '/ws/rest/templateService/generateCVPDFForUser/user/' +
                            email +
                            '/socialMedia/' +
                            sMedia +
                            '/token/test';
                        $http({
                                url: url,
                                dataType: 'json',
                                method: 'POST',
                                data: null,
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                responseType: 'arraybuffer'
                            })
                            .success(
                                function (
                                    response) {
                                    console
                                        .log(' response got');
                                    var file = new Blob(
                                                                [response], {
                                            type: 'application/pdf'
                                        });
                                    saveAs(
                                        file,
                                        $scope.loggedInUser.user +
                                        '-CV-.pdf');

                                });

                    }
                });
        }

        $scope.stateChanged();
    });
