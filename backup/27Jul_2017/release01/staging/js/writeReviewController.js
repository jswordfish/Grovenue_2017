var searchEntity = 'coachingClass';

var register = angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'UtilService', 'AuthService', 'UserService', 'ModalService', 'ngImgCrop', 'authModule', 'previewModule', 'FeedbackModule']);
register.directive('myPostRepeatDirective', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            initializeSlider();
        }
    };
});
register
    .controller("writeReviewController",
        function ($scope, $http, $window, $filter, Util, Auth, Modal) {
            $scope.baseApiUrl = Util.getBaseUrl();
            
    $scope.loggedInUser = Util.getLoggedInUser();
            
            $scope.titlesStar = ['Sucks big time - 1 star','Kinda bad - 2 stars','Meh - 3 stars','Pretty good - 4 stars','Awesome - 5 stars'];
            $scope.titles = ['Sucks big time','Kinda bad','Meh','Pretty good','Rocks!'];
            $scope.searchEntity = 'book';
            $scope.searchkeyword = null;
            $scope.userId = "anonymous";
            $scope.location = "location";
            $scope.resourceEntities = [];
            //Results based on Profile or Search
            $scope.BooksLimit = 8;
            $scope.BooksOffset = 0;
            $scope.BooksMax = 0;
            $scope.ProfileSearchBooks = [];
            $scope.ProfileSearchBooksEntities = [];
            $scope.profilesearchtitle = "Our top picks for you";
            $scope.topRatedResourcesbookEntities = [];
            $scope.MostSearchedResponsesbookEntities = [];
            $scope.TopViewedbyFriendsEntities = [];
            $scope.resource = {};
            $scope.slider = [];
            $scope.rating = 2;
            $scope.identity1 = "Effectiveness";
            $scope.identity2 = "Visual Aides";
            $scope.identity3 = "Solutions to practical problems";
            $scope.identity4 = "Real-world examples";
            $scope.review = {};
            $scope.review.effectivenessAndEaseOfCommunication = 1;
            $scope.review.solutionToPracticeProblems = 1;
            $scope.review.visualTools = 1;
            $scope.review.solvedExamples = 1;
            $scope.selectedOrderBy = 'rating';
            $scope.ratingScope = {}
            $scope.ratingScope.identity1 = "";
            $scope.ratingScope.identity2 = "";
            $scope.ratingScope.identity3 = "";
            $scope.ratingScope.identity4 = "";
            $scope.showBook = true;
            $scope.showCoachingClass = false;
            $scope.showDigitalResource = false;
            $scope.submitted = "";
            $scope.reviewEntity = "Book";
            $scope.booksCount = 0;
            $scope.topicsVisibe = true;
            $scope.loading = false;
            $scope.hasResult = false;

            $scope.isLoggedin = function () {
                if ($scope.loggedInUser === null || $scope.loggedInUser === undefined) {
                    return false;
                } else if ($scope.loggedInUser.constructor != {}.constructor) {
                    return false;
                } else if (!$scope.loggedInUser.hasOwnProperty('user')) {
                    return false;
                } else {
                    return true;
                }
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
            
            $scope.canShowReview = function() {
                var flag = true;
                if($scope.resource===undefined || $scope.resource===null) {
                    flag = false;
                } else if($scope.resource.constructor != {}.constructor) {
                    flag = false;
                } else if (!$scope.resource.hasOwnProperty('name')) {
                    flag = false;
                }
                return flag;
            }
            
            $scope.canShowResults = function() {
                return ($scope.hasResult && !$scope.loading);
            }
            
            // modals
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
                    Util.alert("Alert", "You are not logged in via Social Media account, hence cannot use this functionality.");
                } else {
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

            $scope.openAreaModal = function () {
                var modalDefaults = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    size: 'md',
                    controller: 'areaModalController',
                    templateUrl: 'partials/area-selector-modal.html',
                    windowClass: 'modal-window-extension'
                };
                Modal.showModal(modalDefaults, {})
                    .then(function (result) {
                        $scope.selectedState = result.selectedState;
                        $scope.selectedCity = result.selectedCity;
                        $scope.reviewEntity = "coaching Class";
                        $scope.identity1 = "Faculty";
                        $scope.identity2 = "Study Materials";
                        $scope.identity3 = "Personalization";
                        $scope.identity4 = "Infrastructure";
                        $scope.topicsVisibe = false;
                        $scope.showBook = false;
                        $scope.showCoachingClass = true;
                        $scope.showDigitalResource = false;
                        $scope.review.resourceReviewedType = "COACHING_CLASS";
                        $scope.coachingclassesToolTips();
                        $scope.searchCoachingClassBasedUponLocation();
                    });
            }
            
            $scope.openPreview = function() {
                if($scope.isLoggedin()) {
                    var rate = $scope.getOverallRating();
                    if(rate==0) {
                        Util.alert("Alert","Please rate for all categories");
                        return;
                    }
                    var modalDefaults = {
                        backdrop: true,
                        keyboard: true,
                        modalFade: true,
                        size: 'md',
                        controller: 'previewController',
                        templateUrl: 'partials/preview-modal.html',
                        windowClass: 'modal-window-extension',
                        resolve: {
                                 Review: function () {
                                        var obj = {};
                                        obj.reviewedBy = $scope.loggedInUser.fullName;
                                        obj.score = rate;
                                        obj.comment = $scope.review.comment;
                                        return obj;
                                    }
                                }
                    };
                    Modal.showModal(modalDefaults, {});
                }
                else {
                    $scope.openLoginSignupModal();
                }
                
            }
            // end modals
            
            $scope.getOverallRating = function() {
                var rate1 = 0;
                var rate2 = 0;
                var rate3 = 0;
                var rate4 = 0;
                
                var tmp = $scope.ratingScope.identity1;
                if(tmp.length>0) {
                    rate1 = parseInt(tmp.substring(tmp.length-1))
                }
                tmp = $scope.ratingScope.identity2;
                if(tmp.length>0) {
                    rate2 = parseInt(tmp.substring(tmp.length-1))
                }
                tmp = $scope.ratingScope.identity3;
                if(tmp.length>0) {
                    rate3 = parseInt(tmp.substring(tmp.length-1))
                }
                tmp = $scope.ratingScope.identity4;
                if(tmp.length>0) {
                    rate4 = parseInt(tmp.substring(tmp.length-1))
                }
                
                if(rate1==0 || rate2==0 || rate3==0 || rate4==0) {
                    return 0;
                }
                else {
                    return ((rate1 + rate2 + rate3 + rate4) / 4);
                }
            }

            // tooltips

            $scope.bookToolTips = function () {
                $scope.toolTip1 = "Does this book cover all fundamental concepts required to master the topics? Does the book succeed in making concepts crystal clear without much external help? Is the book easy to understand ?";
                $scope.toolTip2 = "Sometimes, a picture is worth a thousand words. Think about diagrams, photos, flowcharts, tables, and other visual tools used to explain concepts.";
                $scope.toolTip3 = "Some learn best through examples solved using the concepts at hand. Think about closeness of practice problems to actual exam questions. Did the solved examples help you better understand concepts? Other factors to consider include accuracy, completeness, and presentation of problem solutions.";
                $scope.toolTip4 = "Some learn best by understanding real world examples of abstract, theoretical concepts. How well does the book use relevant case studies, real life illustrations, and practical applications to illustrate";
                $scope.toolTip5 = "Remeber, the best reviews are honest, detailed and easy to follow for students. By submitting your review, you agree to the Terms and Conditions for using Grovenue.";
            }

            $scope.coachingclassesToolTips = function () {
                $scope.toolTip1 = "Good instructors can significantly impact a student’s performance in exams. Think about quality of lectures, ability to teach complex concepts in simple ways, engagement of the class, and help with individual doubts of students.";
                $scope.toolTip2 = "Good study materials are critical for productive self-study. How effective were the study materials in improving your scores? These include chapter notes, practice problems and solutions, mock tests, cheatsheets, revision guides, and any other materials provided by the coaching class.";
                $scope.toolTip3 = "The most effective courses focus on individual student goals, learning styles, strengths, and weaknesses. Think about performance analysis and feedback, doubt solving sessions, student-specific study plans based on individual performance, and overall emphasis on personal attention.";
                $scope.toolTip4 = "Who doesn't like a comfy learning environment? Tell us how this class did in providing necessary facilities to support your learning experience. Think about classroom settings, libraries, study centres, laptops / tablets, and online support.";
                $scope.toolTip5 = "Remeber, the best reviews are honest, detailed and easy to follow for students. By submitting your review, you agree to the Terms and Conditions for using Grovenue.";
            }

            $scope.digitalResourceToolTips = function () {
                $scope.toolTip1 = "The most effective courses focus on individual student goals, learning styles, strengths, and weaknesses. They should be specific to you, easily understood, and effective. Think about performance analysis for practice problems, study plan based on strengths and weaknesses, and test taking strategies for test day.";
                $scope.toolTip2 = "How well did this tool engage students and create a natural learning environment. Think about access to experts for doubt solving, live lectures, discussion channels, community activities, and interactive lessons.";
                $scope.toolTip3 = "How easy to use was the tool? Think about the user interface, ease of finding other pages, performance with slow internet connections, compatibility issues, and audio / video quality.";
                $scope.toolTip4 = "Were the study materials sufficient for your exam prep? Did they help improve your scores? Think about closeness to syllabus and past tests, accuracy, quality of solutions, and originality. Study materials include chapter notes, practice problems and solutions, mock tests, cheatsheets, revision guides, and any other materials.";
                $scope.toolTip5 = "Remeber, the best reviews are honest, detailed and easy to follow for students. By submitting your review, you agree to the Terms and Conditions for using Grovenue.";
            }

            // end tooltips

            $scope.increaseCounter = function () {
                var tmp = $scope.BooksOffset + $scope.BooksLimit;
                if (tmp < $scope.BooksMax)
                    $scope.BooksOffset = tmp;
            }

            $scope.decreaseCounter = function () {
                var tmp = $scope.BooksOffset - $scope.BooksLimit;
                if (tmp >= 0)
                    $scope.BooksOffset = tmp;
            }

            $scope.searchBar = function () {
                if ($scope.isLoggedin()) {
                    $scope.userId = $scope.loggedInUser.user;
                    $window.localStorage.setItem("userId", $scope.userId);
                    $scope.searchType = "user";
                } else {
                    $scope.userId = "anonymous";
                    $scope.searchType = "generic";
                }
                var sortParam = 'name';
                var resourceLimit = 24;
                var keyword = ($scope.searchkeyword === null || $scope.searchkeyword === "null" || $scope.searchkeyword === 'null') ? "None" : $scope.searchkeyword;
                var parameters = '';
                if ($scope.userId != null && ($scope.searchkeyword == null || $scope.searchkeyword.length == 0)) {
                    parameters = parameters + '?userId=' + $scope.userId + '&searchEntity=' + $scope.searchEntity + '&searchType=preference';
                } else if ($scope.userId != null && $scope.searchkeyword != null) {
                    parameters = parameters + '?userId=' + $scope.userId + '&searchEntity=' + $scope.searchEntity + '&searchType=generic&keyword=' + $scope.searchkeyword + '';
                } else if ($scope.userId == null && $scope.searchkeyword == null) {
                    parameters = parameters + '?searchEntity=' + $scope.searchEntity + '';
                } else if ($scope.userId == null && $scope.searchkeyword != null) {
                    parameters = parameters + '?searchEntity=' + $scope.searchEntity + '&searchType=generic&keyword=' + $scope.searchkeyword + '';
                }
                var searchUrl = $scope.baseApiUrl + "/ws/rest/resourceService/getResourceEntityBasedByUponSearchCriteria/token/" +
                    Util.generateToken() +
                    parameters;
                console.log("searchUrl " + searchUrl);
                $scope.hasResult = false;
                $scope.resource = null;
                $scope.loading = true;

                $http
                    .get(searchUrl)
                    .success(
                        function (resourceEntities) {
                            $scope.searchkeyword = '';
                            $scope.resource = null;
                            $scope.loading = false;
                            $scope.ProfileSearchBooks = resourceEntities;
                            $scope.BooksMax = $scope.ProfileSearchBooks.length;
                            if ($scope.ProfileSearchBooks.length > 0) {
                                $scope.hasResult = true;
                                $scope.resource = $scope.ProfileSearchBooks[0];
                                if($scope.searchEntity=="book")
                                    $scope.getTopicFromSubject();
                                $scope.scrollToSearchResult();
                            } else {
                                $scope.hasResult = false;
                            }

                        }).error(function (errorResponse) {
                            $scope.loading = false;
                            console.log(JSON.stringify(errorResponse));
                    });
            };
            
            $scope.searchCoachingClassBasedUponLocation = function () {
                var selectBasedCoachingClassSearch = "Non_Keyword_Entered:" + $scope.selectedState + "-" + $scope.selectedCity;
                $scope.location = $scope.selectedCity;
                $scope.searchkeyword = selectBasedCoachingClassSearch;
                $scope.searchBar();
            };

            $scope.changeActive = function (entityName) {
                console.log("entityName " + entityName);
                $scope.searchEntity = entityName;
                if (entityName === 'coachingClass') {
                    $scope.openAreaModal();
                } else if (entityName === 'digitalResource') {
                    $scope.review.resourceReviewedType = "DIGITAL_RESOURCE";
                    $scope.reviewEntity = "Digital Resource";
                    $scope.identity1 = "Personalization";
                    $scope.identity2 = "Interactivity";
                    $scope.identity3 = "Ease of Use";
                    $scope.identity4 = "Study Materials";
                    $scope.topicsVisibe = false;
                    $scope.showBook = false;
                    $scope.showCoachingClass = false;
                    $scope.showDigitalResource = true;
                    $scope.searchBar();
                    $scope.digitalResourceToolTips();
                } else if (entityName === 'book') {
                    $scope.review.resourceReviewedType = "BOOK";
                    $scope.reviewEntity = "Book";
                    $scope.identity1 = "Effectiveness";
                    $scope.identity2 = "Visual Aides";
                    $scope.identity3 = "Solutions to practical problems";
                    $scope.identity4 = "Real-world examples";
                    $scope.topicsVisibe = true;
                    $scope.showBook = true;
                    $scope.showCoachingClass = false;
                    $scope.showDigitalResource = false;
                    $scope.searchBar();
                    $scope.bookToolTips();
                }
            };

            $scope.init = function (page, isReload) {
                // $scope.nearMe();

                $scope.bookToolTips();
                if (!$scope.isLoggedin()) {
                    Util.confirm("Continue?", "Please Login to use review section")
                        .then(function (result) {
                            $scope.openLoginSignupModal();
                        });
                }

                var isRedirectedSearch = window.localStorage.getItem("isRedirectedSearch");
                if (isRedirectedSearch === "true" || isRedirectedSearch == true) {
                    var redirectSearchKeyword = window.localStorage.getItem("redirectSearchKeyword");
                    var keyword = (redirectSearchKeyword === null) ? "None" : $scope.searchkeyword;
                    if (redirectSearchKeyword != "" && redirectSearchKeyword != '' && redirectSearchKeyword != 'None') {
                        $scope.searchkeyword = redirectSearchKeyword;
                        var resourceType = window.localStorage.getItem("resourceType");
                        if (resourceType == 'BOOKS') {
                            $scope.changeActive('book');
                        } else if (resourceType == 'COACHING_CLASSES') {
                            $scope.changeActive('coachingClass');
                        } else if (resourceType == 'DIGITAL_RESOURCES') {
                            $scope.changeActive('digitalResource');
                        }
                        $scope.profilesearchtitle = "Search Result";

                        //isReload = true;
                        window.localStorage.setItem("isRedirectedSearch", false);
                        window.localStorage.setItem("redirectSearchKeyword", "");
                    }
                }
                else
                    $scope.changeActive('book');
            };

            $scope.updateSelectedInstance = function (resource) {
                $scope.resetReview();
                $scope.resource = resource;
                $scope.scrollToReviewPanel();
                if($scope.showBook)
                    $scope.getTopicFromSubject();
            };
    
            $scope.scrollToSearchResult = function() {
                $('body').animate({scrollTop: $("#searchResultDiv").offset().top-140}, 'slow');
            }
    
            $scope.scrollToReviewPanel = function(){
                $("body").animate({scrollTop: $("#reviewId").offset().top-140}, "slow");
            }

            // review

            $scope.topic1 = '';
            $scope.topic2 = '';
            $scope.topic3 = '';
            $scope.getTopicFromSubject = function () {
                if ($scope.searchEntity === 'book' ||
                    $scope.searchEntity === 'digitalResource') {
                    var subject = $scope.resource.subject;
                    var statesUrl = $scope.baseApiUrl + "/ws/rest/utilService/topics/subject/" +
                        'physics' + "/token/" + Util.generateToken();
                    $http.get(statesUrl).success(function (response) {
                        $scope.topics = response;
                        for (var i in $scope.topics) {
                            $scope.selectTopics = $scope.topics[i];
                            if (i == 0) {
                                $scope.topic1 = $scope.topics[i];
                            } else if (i == 1) {
                                $scope.topic2 = $scope.topics[i];
                            } else if (i == 2) {
                                $scope.topic3 = $scope.topics[i];
                                break;
                            }
                        }
                        var json = JSON.stringify($scope.topics);
                        console.log(json);
                    }).error(function (exception) {
                        $scope.topics = [];
                    });

                }
            }

            $scope.updateIdentity1 = function (value) {
                var entityName = $scope.searchEntity;
                $scope.ratingScope.identity1 = ": " + value;
                if (entityName === 'coachingClass') {
                    $scope.review.faculty = value;
                } else if (entityName === 'digitalResource') {
                    $scope.review.personalization = value;
                } else if (entityName === 'book') {
                    $scope.review.effectivenessAndEaseOfCommunication = value;
                }

            };
            $scope.updateIdentity2 = function (value) {
                var entityName = $scope.searchEntity;
                $scope.ratingScope.identity2 = ": " + value;
                if (entityName === 'coachingClass') {
                    $scope.review.studyMaterial = value;
                } else if (entityName === 'digitalResource') {
                    $scope.review.interactivity = value;
                } else if (entityName === 'book') {
                    $scope.review.visualTools = value;
                }

            };
            $scope.updateIdentity3 = function (value) {
                var entityName = $scope.searchEntity;
                $scope.ratingScope.identity3 = ": " + value;
                if (entityName === 'coachingClass') {
                    $scope.review.personalization = value;
                } else if (entityName === 'digitalResource') {
                    $scope.review.easyOfUse = value;
                } else if (entityName === 'book') {
                    $scope.review.solutionToPracticeProblems = value;

                }

            };
            $scope.updateIdentity4 = function (value) {
                var entityName = $scope.searchEntity;
                $scope.ratingScope.identity4 = ": " + value;
                if (entityName === 'coachingClass') {
                    $scope.review.infrastructure = value;
                } else if (entityName === 'digitalResource') {
                    $scope.review.studyMaterial = value;
                } else if (entityName === 'book') {
                    $scope.review.solvedExamples = value;
                }

            };

            $scope.resetReview = function () {
                $scope.review = {};
                $scope.ratingScope.identity1 = "";
                $scope.ratingScope.identity2 = "";
                $scope.ratingScope.identity3 = "";
                $scope.ratingScope.identity4 = "";
                $scope.review.comment = "";
            }

            $scope.validateReview = function () {
                var error = false;
                var errortype = 1;
                if ($scope.ratingScope.identity1 === "" || $scope.ratingScope.identity1 === undefined) {
                    errortype = 1;
                    error = true;
                } else if ($scope.ratingScope.identity2 === "" || $scope.ratingScope.identity2 === undefined) {
                    errortype = 1;
                    error = true;
                } else if ($scope.ratingScope.identity3 === "" || $scope.ratingScope.identity3 === undefined) {
                    errortype = 1;
                    error = true;
                } else if ($scope.ratingScope.identity4 === "" || $scope.ratingScope.identity4 === undefined) {
                    errortype = 1;
                    error = true;
                }
                if ($scope.review.comment === "" || $scope.review.comment === undefined) {
                    errortype = 2;
                    error = true;
                }
                if (error == true) {
                    if (errortype == 1) {
                        Util.alert('Alert', "It is mandatory to select all the criteria.");
                    } else if (errortype == 2) {
                        Util.alert('Alert', "It is mandatory to add comment for review.");
                    }
                }
                return !error;
            }

            $scope.writeAReview = function () {
                if (!$scope.isLoggedin()) {
                    $scope.openLoginSignupModal();
                    return false;
                }
                if (!$scope.validateReview())
                    return false;
                
                $scope.review.reviewedBy = $scope.loggedInUser.firstName + " " + $scope.loggedInUser.lastName;
                if ($scope.review.reviewedBy == '' || $scope.review.reviewedBy == null) {
                    $scope.review.reviewedBy = $scope.userId;
                }

                $scope.review.resourceIdentity = $scope.resource.identity;
                if ($scope.review.reviewedBy === null ||
                    $scope.review.reviewedBy === "") {
                    $scope.review.reviewedBy = 'anonymous';
                }
                if ($scope.searchEntity === 'coachingClass') {
                    $scope.review.location = $scope.resource.branch;
                    $scope.review.resourceIdentity = $scope.resource.name;
                } else {
                    $scope.review.location = "anonymous";
                }

                if ($scope.searchEntity == 'book') {
                    $scope.review.resourceReviewedType = 'BOOK';
                } else if ($scope.searchEntity == 'digitalResource') {
                    $scope.review.resourceReviewedType = 'DIGITAL_RESOURCE';
                } else if ($scope.searchEntity == 'coachingClass') {
                    $scope.review.resourceReviewedType = 'COACHING_CLASS';
                }

                var reviewUrl = $scope.baseApiUrl + "/ws/rest/reviewRelatedService/saveOrUpdateReview/token/" + Util.generateToken();
                $http
                    .post(reviewUrl, $scope.review)
                    .success(function (data) {
                        $scope.resetReview();
                        Util.alert("Review Submited successfully");
                    })
                    .error(function (errorResponse) {
                        console.log(JSON.stringify(errorResponse));
                        Util.alert("Error", "Unable to Submit Review " + JSON.stringify(errorResponse));
                    });
            };

            // end review

            // TODO: profile: must be moved to authController (Edit profile section)

            /** ***** Added By Sagar ******* */
            $scope.myImage = '';
            // var usr = $.extend({},$scope.loggedInUser);
            // var base64Image=usr.base64Image

            // $scope.defImage =(base64Image===null ||
            // base64Image==='null' || base64Image==="null")?
            // $scope.profilePic:base64Image;
            $scope.myCroppedImage = '';
            $scope.showImagePreview = false;
            $scope.photoStatus = "Edit Photo";
            $scope.editOption = false;
            // $scope.editOption =
            // angular.isDefined(usr.socialMediaType);

            $scope.editPhotoBegin = function () {
                if ($scope.showImagePreview) {
                    $scope.photoStatus = "Edit photo";
                } else {
                    $scope.photoStatus = "Done";
                }
                $scope.showImagePreview = !$scope.showImagePreview;
            }

            $scope.$watch('myCroppedImage', function (newVal, oldVal) {
                console.log('-------', newVal);
                if ($scope.showImagePreview) {
                    $scope.defImage = newVal;
                    $scope.loggedInUser.base64Image = newVal;
                }
            });

            var handleFileSelect = function (evt) {
                var file = evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.myImage = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#fileInput')).on(
                'change', handleFileSelect);

            // profile: End

            // TODO: remove: unused methods
    
            $scope.redirectAndSearch = function () {
                // window.localStorage.setItem("isRedirectedSearch",
                // true);
                // window.localStorage.setItem("redirectSearchKeyword",$scope.searchText);
                $('html,body'.animate({
                    scrollTop: $("#searchResultDiv").offset().top
                }, 'slow'));
                //$scope.searchBar();
            }

            $scope.RatingredirectAndSearch = function (resourceName, entity) {
                $scope.searchText = resourceName;
                window.localStorage.setItem("isRedirectedSearch", true);
                window.localStorage.setItem("resourceType", entity);
                window.localStorage.setItem("redirectSearchKeyword",
                    $scope.searchText);
                $window.location.href = 'write_review.html';
            }
            
            $scope.search = function (isReload) {
                if ($scope.isLoggedin()) {
                    $scope.userId = $scope.loggedInUser.user;
                    $window.localStorage.setItem("userId", $scope.userId);
                    $scope.searchType = "user";
                } else {
                    $scope.userId = "anonymous";
                    $scope.searchType = "generic";
                }
                var sortParam = 'name';
                var applyFilter = false;
                var resourceLimit = 24;
                var keyword = ($scope.searchkeyword === null ||
                        $scope.searchkeyword === "null" || $scope.searchkeyword === 'null') ? "None" :
                    $scope.searchkeyword;

                if ($scope.userId != null && $scope.searchkeyword == null) {
                    parameters = parameters + '?userId=' + $scope.userId + '&searchEntity=' + $scope.searchEntity + '&searchType=preference';
                } else if ($scope.userId != null && $scope.searchkeyword != null) {
                    parameters = parameters + '?userId=' + $scope.userId + '&searchEntity=' + $scope.searchEntity + '&searchType=generic&keyword=' + $scope.searchkeyword + '';
                } else if ($scope.userId == null && $scope.searchkeyword == null) {
                    parameters = parameters + '?searchEntity=' + $scope.searchEntity + '';
                } else if ($scope.userId == null && $scope.searchkeyword != null) {
                    parameters = parameters + '?searchEntity=' + $scope.searchEntity + '&searchType=generic&keyword=' + $scope.searchkeyword + '';
                }
                var searchUrl = $scope.baseApiUrl + "/ws/rest/resourceService/getResourceEntityBasedByUponSearchCriteria/token/" +
                    Util.generateToken() +
                    parameters;
                console.log("anothersearchurl" + searchUrl);
                $http
                    .get(searchUrl)
                    .success(
                        function (resourceEntities) {
                            $scope.resourceEntities = resourceEntities;
                            var i = 0;
                            $scope.slider = [];
                            $scope.resourceEntities = resourceEntities;
                            if ($scope.resourceEntities.length > 0) {
                                //$scope.resource = $scope.resourceEntities[0];
                                $scope.getTopicFromSubject();
                            }
                            console
                                .log(JSON
                                    .stringify($scope.resourceEntities));

                        }).error(function (errorResponse) {
                        console.log(JSON.stringify(errorResponse));
                        // alert("Error While Searching the Result
                        // for Books");
                    });

            };

            $scope.searchProfilebook = function (isReload) {
                if ($scope.isLoggedin()) {
                    $scope.userId = $scope.loggedInUser.user;
                    $window.localStorage.setItem("userId", $scope.userId);
                    $scope.searchType = "user";
                } else {
                    $scope.userId = "anonymous";
                    $scope.searchType = "generic";
                }
                var sortParam = 'name';
                var applyFilter = false;
                var resourceLimit = 24;
                var keyword = ($scope.searchkeyword == null) ? "None" : $scope.searchkeyword;
                var parameters = '';
                var entTyp = $scope.searchEntity;
                if ($scope.userId != null && $scope.searchkeyword == null) {
                    parameters = parameters + '?userId=' + $scope.userId + '&searchEntity=' + entTyp + '&searchType=preference';

                } else if ($scope.userId != null && $scope.searchkeyword != null) {
                    parameters = parameters + '?userId=' + $scope.userId + '&searchEntity=' + entTyp + '&searchType=generic&keyword=' + $scope.searchkeyword + '';
                } else if ($scope.userId == null && $scope.searchkeyword == null) {
                    parameters = parameters + '?searchEntity=' + entTyp + '';
                } else if ($scope.userId == null && $scope.searchkeyword != null) {
                    parameters = parameters + '?searchEntity=' + entTyp + '&searchType=generic&keyword=' + $scope.searchkeyword + '';
                }

                var searchUrl = $scope.baseApiUrl + "/ws/rest/resourceService/getResourceEntityBasedByUponSearchCriteria/token/" +
                    Util.generateToken() +
                    parameters;
                $http
                    .get(searchUrl)
                    .success(
                        function (resourceEntities) {
                            $scope.ProfileSearchBooks = resourceEntities;
                            $scope.BooksMax = $scope.ProfileSearchBooks.length;
                            if ($scope.ProfileSearchBooks.length > 0) {
                                $scope.resource = $scope.ProfileSearchBooks[0];
                                $scope.getTopicFromSubject();
                            }

                        }).error(function (errorResponse) {
                        console.log(JSON.stringify(errorResponse));
                        // alert("Error While Searching the Result
                        // for Books");
                    });


            };
    
            $scope.bookMark = function () {
                if (!$scope.isLoggedin()) {
                    $scope.openLoginSignupModal();
                    return false;
                }
                var bookmark = {};
                bookmark.resourceId = $scope.resource.uniqueKey;
                bookmark.resourceType = $scope.resource.resourceEntity;
                bookmark.userId = $scope.loggedInUser.user;
                bookmark.name = $scope.resource.name;

                var url = $scope.baseApiUrl + "/ws/rest/reviewRelatedService/createBookmark/token/test";

                $http
                    .post(url, bookmark)
                    .success(function (response) {
                        Util.alert("Your resource has been bookmarked. You can check out your bookmarks by going to the 'Services' tab of your profile section. Thanks");
                    })
                    .error(function (errorResponse) {

                        Util.alert("Sorry! We are facing some problems in bookmarking your resource right now. Please try later!");
                        console.log(JSON.stringify(errorResponse));
                    });
            }

            $scope.latitude = 0.0;
            $scope.longitude = 0.0;
            $scope.nearMe = function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (
                        position) {
                        $scope.latitude = position.coords.latitude;
                        $scope.longitude = position.coords.longitude;
                    });
                }
            }
            // remove: end

        });
