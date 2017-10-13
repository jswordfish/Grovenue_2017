var searchEntity = 'coachingClass';

var register = angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'UtilService', 'AuthService', 'UserService', 'ModalService', 'ngImgCrop', 'authModule', 'FeedbackModule']);
register.directive('myPostRepeatDirective', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            initializeSlider();
        }
    };
});
register
    .controller("prepare4greatnesstController", function ($scope, $http, $window, $filter, Util, Auth, Modal) {
        $scope.baseApiUrl = Util.getBaseUrl();
    
        $scope.loggedInUser = Util.getLoggedInUser();

        $scope.isLoaderVisible = false;
        $scope.titlesStar = ['Sucks big time - 1 star', 'Kinda bad - 2 stars', 'Meh - 3 stars', 'Pretty good - 4 stars', 'Awesome - 5 stars'];
        $scope.searchEntity = 'book';
        $scope.searchkeyword = null;
        $scope.userId = "anonymous";
        $scope.location = "location";
        $scope.resourceEntities = [];
        //Results based on Profile or Search
        $scope.BooksLimit = 4;
        $scope.BooksOffset = 0;
        $scope.BooksMax = 0;
        $scope.ProfileSearchBooks = [];
        $scope.ProfileSearchBooksEntities = [];
        $scope.profilesearchtitle = "Our top picks for you";
        $scope.topRatedResourcesbookEntities = [];
        $scope.MostSearchedResponsesbookEntities = [];
        $scope.TopViewedbyFriendsEntities = [];
        $scope.resource = {};
        $scope.statesAndCities = {};
        $scope.cities = [];
        $scope.states = [];
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
        $scope.isUserLoggedIn = false;
        $scope.selectedOrderBy = 'rating';
        $scope.ratingScope = {}
        $scope.ratingScope.identity1 = "";
        $scope.ratingScope.identity2 = "";
        $scope.ratingScope.identity3 = "";
        $scope.ratingScope.identity4 = "";
        $scope.page = "";
        $scope.showBook = true;
        $scope.showCoachingClass = false;
        $scope.showDigitalResource = false;
        $scope.submitted = "";
        $scope.reviewEntity = "Book";
        $scope.booksCount = 0;
        $scope.booksTopRatedCount = 0;
        $scope.booksMostSearchedCount = 0;
        $scope.booksTopViewedCount = 0;

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

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
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
                    $scope.searchCoachingClassBasedUponLocation();
                });
        }
        // modal open section end

        // used to show/hide book details view
        $scope.isBookDetailAvailable = function () {
            if ($scope.resource == null || $scope.resource.name === undefined) {
                return false;
            } else {
                return true;
            }
        }

        $scope.bookMark = function () {
            if (!$scope.isLoggedin()) {
                $scope.openLoginSignupModal();
                return;
            }
            var bookmark = {};
            bookmark.resourceId = $scope.resource.uniqueKey;
            bookmark.resourceType = $scope.resource.resourceEntity;
            bookmark.userId = $scope.loggedInUser.user;
            bookmark.name = $scope.resource.name;

            var url = $scope.baseApiUrl + "/ws/rest/reviewRelatedService/createBookmark/token/test";

            $http
                .post(url, bookmark)
                .success(
                    function (response) {
                        Util.alert("Alert", "Your resource has been bookmarked. You can check out your bookmarks by going to the 'Services' tab of your profile section. Thanks");
                    })
                .error(
                    function (errorResponse) {
                        Util.alert("Alert", "Sorry! We are facing some problems in bookmarking your resource right now. Please try later!");
                        console.log(JSON.stringify(errorResponse));
                    });

        }

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

        $scope.RatingredirectAndSearch = function (resourceName, entity) {
            $scope.searchText = resourceName;
            window.localStorage.setItem("isRedirectedSearch", true);
            window.localStorage.setItem("resourceType", entity);
            window.localStorage.setItem("redirectSearchKeyword",
                $scope.searchText);
            $window.location.href = 'write_review.html';
        }

        $scope.increaseTopRatedCounter = function () {
            if ($scope.booksTopRatedCount == 4) {
                $scope.booksTopRatedCount = 0;
            } else {
                $scope.booksTopRatedCount++;
            }

            if ($scope.topRatedResourcesbooks.length >= 5) {
                if ($scope.booksTopRatedCount < 5) {
                    $scope.topRatedResourcesbookEntities = $scope.topRatedResourcesbooks
                        .slice($scope.booksTopRatedCount,
                            $scope.booksTopRatedCount + 4);
                } else {
                    $scope.topRatedResourcesbookEntities = $scope.topRatedResourcesbooks
                        .slice(0, 4);
                }
            }
        }

        $scope.decreaseTopRatedCounter = function () {
            if ($scope.booksTopRatedCount == 0) {
                $scope.booksTopRatedCount = 4;
            } else {
                $scope.booksTopRatedCount--;
            }

            if ($scope.topRatedResourcesbooks.length >= 5) {
                if ($scope.booksTopRatedCount > 1) {
                    $scope.topRatedResourcesbookEntities = $scope.topRatedResourcesbooks
                        .slice($scope.booksTopRatedCount - 4,
                            $scope.booksTopRatedCount);
                } else {
                    $scope.topRatedResourcesbookEntities = $scope.topRatedResourcesbooks
                        .slice(0, 4);
                }
            }
        }

        $scope.increaseMostSearchedCounter = function () {
            if ($scope.booksMostSearchedCount == 4) {
                $scope.booksMostSearchedCount = 0;
            } else {
                $scope.booksMostSearchedCount++;
            }

            if ($scope.MostSearchedResponsesbooks.length >= 5) {
                if ($scope.booksMostSearchedCount < 5) {
                    $scope.MostSearchedResponsesbookEntities = $scope.MostSearchedResponsesbooks
                        .slice($scope.booksMostSearchedCount,
                            $scope.booksMostSearchedCount + 4);
                } else {
                    $scope.MostSearchedResponsesbookEntities = $scope.MostSearchedResponsesbooks
                        .slice(0, 4);
                }
            }
        }

        $scope.decreaseMostSearchedCounter = function () {
            if ($scope.booksMostSearchedCount == 0) {
                $scope.booksMostSearchedCount = 4;
            } else {
                $scope.booksMostSearchedCount--;
            }

            if ($scope.MostSearchedResponsesbooks.length >= 5) {
                if ($scope.booksMostSearchedCount > 1) {
                    $scope.MostSearchedResponsesbookEntities = $scope.MostSearchedResponsesbooks
                        .slice($scope.booksMostSearchedCount - 4,
                            $scope.booksMostSearchedCount);
                } else {
                    $scope.MostSearchedResponsesbookEntities = $scope.MostSearchedResponsesbooks
                        .slice(0, 4);
                }
            }
        }

        $scope.increaseTopViewedCounter = function () {
            if ($scope.booksTopViewedCount == 4) {
                $scope.booksTopViewedCount = 0;
            } else {
                $scope.booksTopViewedCount++;
            }

            if ($scope.TopViewedbyFriends.length >= 5) {
                if ($scope.booksTopViewedCount < 5) {
                    $scope.TopViewedbyFriendsEntities = $scope.TopViewedbyFriends
                        .slice($scope.booksTopViewedCount,
                            $scope.booksTopViewedCount + 4);
                } else {
                    $scope.TopViewedbyFriendsEntities = $scope.TopViewedbyFriends
                        .slice(0, 4);
                }
            }
        }

        $scope.decreaseTopViewedCounter = function () {
            if ($scope.booksTopViewedCount == 0) {
                $scope.booksTopViewedCount = 4;
            } else {
                $scope.booksTopViewedCount--;
            }

            if ($scope.TopViewedbyFriends.length >= 5) {
                if ($scope.booksTopViewedCount > 1) {
                    $scope.TopViewedbyFriendsEntities = $scope.TopViewedbyFriends
                        .slice($scope.booksTopViewedCount - 4,
                            $scope.booksTopViewedCount);
                } else {
                    $scope.TopViewedbyFriendsEntities = $scope.TopViewedbyFriends
                        .slice(0, 4);
                }
            }
        }


        $scope.bookToolTips = function () {
            $scope.toolTip1 = "Does this book cover all fundamental concepts required to master the topics? Does the book succeed in making concepts crystal clear without much external help? Is the book easy to understand ?";
            $scope.toolTip2 = "Sometimes, a picture is worth a thousand words. Think about diagrams, photos, flowcharts, tables, and other visual tools used to explain concepts.";
            $scope.toolTip3 = "Some learn best through examples solved using the concepts at hand. Think about closeness of practice problems to actual exam questions. Did the solved examples help you better understand concepts? Other factors to consider include accuracy, completeness, and presentation of problem solutions.";
            $scope.toolTip4 = "Some learn best by understanding real world examples of abstract, theoretical concepts. How well does the book use relevant case studies, real life illustrations, and practical applications to illustrate";
        }

        $scope.coachingclassesToolTips = function () {
            $scope.toolTip1 = "Good instructors can significantly impact a student’s performance in exams. Think about quality of lectures, ability to teach complex concepts in simple ways, engagement of the class, and help with individual doubts of students.";
            $scope.toolTip2 = "Good study materials are critical for productive self-study. How effective were the study materials in improving your scores? These include chapter notes, practice problems and solutions, mock tests, cheatsheets, revision guides, and any other materials provided by the coaching class.";
            $scope.toolTip3 = "The most effective courses focus on individual student goals, learning styles, strengths, and weaknesses. Think about performance analysis and feedback, doubt solving sessions, student-specific study plans based on individual performance, and overall emphasis on personal attention.";
            $scope.toolTip4 = "Who doesn't like a comfy learning environment? Tell us how this class did in providing necessary facilities to support your learning experience. Think about classroom settings, libraries, study centres, laptops / tablets, and online support.";

        }

        $scope.digitalResourceToolTips = function () {
            $scope.toolTip1 = "The most effective courses focus on individual student goals, learning styles, strengths, and weaknesses. They should be specific to you, easily understood, and effective. Think about performance analysis for practice problems, study plan based on strengths and weaknesses, and test taking strategies for test day.";
            $scope.toolTip2 = "How well did this tool engage students and create a natural learning environment. Think about access to experts for doubt solving, live lectures, discussion channels, community activities, and interactive lessons.";
            $scope.toolTip3 = "How easy to use was the tool? Think about the user interface, ease of finding other pages, performance with slow internet connections, compatibility issues, and audio / video quality.";
            $scope.toolTip4 = "Were the study materials sufficient for your exam prep? Did they help improve your scores? Think about closeness to syllabus and past tests, accuracy, quality of solutions, and originality. Study materials include chapter notes, practice problems and solutions, mock tests, cheatsheets, revision guides, and any other materials.";
        }

        $scope.applyOrderBy = function (argument) {
            // alert("findByDistinctStateAndCityForGivenCountry");
            // $scope.apply();
        }

        //Profile Based or Search  book list - Row 1
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
            var resourceLimit = 10;
            var keyword = ($scope.searchkeyword === null ||
                    $scope.searchkeyword === "null" || $scope.searchkeyword === 'null') ? "None" :
                $scope.searchkeyword;
            var parameters = '';
            var entTyp = $scope.searchEntity;
            if (keyword == "None") {
                if ($scope.userId != null) {
                    $scope.profilesearchtitle = "Our top picks for you";
                } else {
                    $scope.profilesearchtitle = "Results based on Search";
                }
            }
            if ($scope.IsWriteReview == true) {
                //$scope.searchkeyword = 'jee';
            }
            if ($scope.userId != null && $scope.searchkeyword == null) {
                parameters = parameters + '?userId=' + $scope.userId + '&searchEntity=' + entTyp + '&searchType=preference';

            } else if ($scope.userId != null && $scope.searchkeyword != null) {
                parameters = parameters + '?userId=' + $scope.userId + '&searchEntity=' + entTyp + '&searchType=generic&keyword=' + $scope.searchkeyword + '';
            } else if ($scope.userId == null && $scope.searchkeyword == null) {
                parameters = parameters + '?searchEntity=' + entTyp + '';
            } else if ($scope.userId == null && $scope.searchkeyword != null) {
                parameters = parameters + '?searchEntity=' + entTyp + '&searchType=generic&keyword=' + $scope.searchkeyword + '';
            }

            // alert($scope.page +" "+resourceLimit);
            var token = Util.generateToken();
            var searchUrl = $scope.baseApiUrl + "/ws/rest/resourceService/getResourceEntityBasedByUponSearchCriteria/token/" +
                token +
                parameters;
            console.log('Prasanta788 =' + searchUrl);
            $http
                .get(searchUrl)
                .success(
                    function (resourceEntities) {
                        $scope.ProfileSearchBooks = resourceEntities;
                        $scope.BooksMax = $scope.ProfileSearchBooks.length;
                        if ($scope.ProfileSearchBooks.length > 0)
                            $scope.resource = $scope.ProfileSearchBooks[0];
                        else
                            $scope.resource = {};
                    }).error(function (errorResponse) {
                    $scope.resource = {};
                console.log($scope.resource);
                    console.log(JSON.stringify(errorResponse));
                    // alert("Error While Searching the Result
                    // for Books");
                });
        };

        //Top Rated Resources - Row 2
        $scope.topRatedResourcesbook = function (isReload) {
            if ($scope.isLoggedin()) {
                $scope.userId = $scope.loggedInUser.user;
                $window.localStorage.setItem("userId", $scope.userId);
                $scope.searchType = "user";
            } else {
                $scope.userId = "anonymous";
                $scope.searchType = "generic";
            }
            $("#no_result_found_top_resource").hide();
            $("#topRatedleftArrow").show();
            $("#topRatedrightArrow").show();
            var sortParam = 'name';
            var applyFilter = false;
            var resourceLimit = 10;
            var keyword = ($scope.searchkeyword === null ||
                    $scope.searchkeyword === "null" || $scope.searchkeyword === 'null') ? "None" :
                $scope.searchkeyword;
            var parameters = '';
            entTyp = $scope.searchEntity;
            if ($scope.userId != null) {
                parameters = parameters + '?userId=' + $scope.userId + '&searchEntity=' + entTyp + '&searchType=recommendation';
            } else if ($scope.userId == null) {
                parameters = parameters + '?searchEntity=' + entTyp + '&searchType=recommendation';
            }
            // alert($scope.page +" "+resourceLimit);
            var token = Util.generateToken();
            var searchUrl = $scope.baseApiUrl + "/ws/rest/resourceService/getResourceEntityBasedByUponSearchCriteria/token/" +
                token +
                parameters;
            //+ "?searchType="
            //+ $scope.searchType
            //+ "&userId="
            //+ $scope.userId
            //+ "&keyword="
            //+ keyword
            //+ "&searchEntity="
            //+ $scope.searchEntity
            //+ "&location="
            //+ $scope.location
            //+ "&resourceLimit=" + resourceLimit;
            $http
                .get(searchUrl)
                .success(
                    function (resourceEntities) {
                        $scope.topRatedResourcesbookEntities = resourceEntities;
                        $scope.topRatedResourcesbooks = resourceEntities;

                        var i = 0;
                        $scope.slider = [];
                        $scope.topRatedResourcesbookEntities = resourceEntities;
                        if ($scope.topRatedResourcesbookEntities.length > 0) {
                            //$scope.resource = $scope.topRatedResourcesbookEntities[0];
                            $scope.getTopicFromSubject();
                        } else {
                            $("#no_result_found_top_resource").show();
                            $("#topRatedleftArrow").hide();
                            $("#topRatedrightArrow").hide();
                        }
                        if ($scope.topRatedResourcesbooks.length > 4) {
                            $scope.topRatedResourcesbookEntities = $scope.topRatedResourcesbooks.slice(0, 4);
                        }
                        if (isReload === true) {
                            //$("#searchContext1").show();
                            //$scope.$apply();
                            jQuery('.slider4').lbSlider({
                                leftBtn: '.sa-left4',
                                rightBtn: '.sa-right4',
                                visible: 4,
                                autoPlay: true,
                                autoPlayDelay: 5
                            });
                            // jQuery('.slider4').lbSlider("refresh");
                        }
                        console
                            .log(JSON
                                .stringify($scope.topRatedResourcesbookEntities));

                    }).error(function (errorResponse) {
                    console.log(JSON.stringify(errorResponse));
                    // alert("Error While Searching the Result
                    // for Books");
                });

        };

        //Most Searched Responses - Row 3
        $scope.MostSearchedResponsesbook = function (isReload) {
            if ($scope.isLoggedin()) {
                $scope.userId = $scope.loggedInUser.user;
                $window.localStorage.setItem("userId", $scope.userId);
                $scope.searchType = "user";
            } else {
                $scope.userId = "anonymous";
                $scope.searchType = "generic";
            }
            $("#no_result_found_most_searched_resource").hide();
            $("#mostSearchedleftArrow").show();
            $("#mostSearchedrightArrow").show();
            var sortParam = 'name';
            var applyFilter = false;
            var resourceLimit = 10;
            var keyword = ($scope.searchkeyword === null ||
                    $scope.searchkeyword === "null" || $scope.searchkeyword === 'null') ? "None" :
                $scope.searchkeyword;
            var parameters = '';
            entTyp = '';
            if ($scope.searchEntity == 'book') {
                entTyp = 'BOOK';
            } else if ($scope.searchEntity == 'coachingClass') {
                entTyp = 'COACHING_CLASS';
            } else if ($scope.searchEntity == 'digitalResource') {
                entTyp = 'DIGITAL_RESOURCE';
            }
            if ($scope.userId != null) {
                var token = Util.generateToken();
                parameters = parameters + 'user/' + $scope.userId + '/entityType/' + entTyp + '/token/' + token;
            } else if ($scope.userId == null) {
                var token = Util.generateToken();
                parameters = parameters + 'user/anonymous@grovenue.com/entityType/' + entTyp + '/token/' + token + '';
            }
            // alert($scope.page +" "+resourceLimit);
            var searchUrl = $scope.baseApiUrl + "/ws/rest/utilService/fetchMostSearchedResourcesForUser/" +
                parameters;
            //+ "?searchType="
            //+ $scope.searchType
            //+ "&userId="
            //+ $scope.userId
            //+ "&keyword="
            //+ keyword
            //+ "&searchEntity="
            //+ $scope.searchEntity
            //+ "&location="
            //+ $scope.location
            //+ "&resourceLimit=" + resourceLimit;
            console.log('Prasanta 2 - ' + searchUrl)
            $http
                .get(searchUrl)
                .success(
                    function (resourceEntities) {
                        $scope.MostSearchedResponsesbookEntities = resourceEntities;
                        $scope.MostSearchedResponsesbooks = resourceEntities;
                        var i = 0;
                        $scope.slider = [];
                        $scope.MostSearchedResponsesbookEntities = resourceEntities;
                        if ($scope.MostSearchedResponsesbookEntities.length > 0) {
                            //$scope.resource = $scope.MostSearchedResponsesbookEntities[0];
                            $scope.getTopicFromSubject();
                        } else {
                            $("#no_result_found_most_searched_resource").show();
                            $("#mostSearchedleftArrow").hide();
                            $("#mostSearchedrightArrow").hide();
                        }
                        if ($scope.MostSearchedResponsesbooks.length > 4) {
                            $scope.MostSearchedResponsesbookEntities = $scope.MostSearchedResponsesbooks.slice(0, 4);
                        }
                        if (isReload === true) {
                            //$("#searchContext1").show();
                            //$scope.$apply();
                            jQuery('.slider4').lbSlider({
                                leftBtn: '.sa-left4',
                                rightBtn: '.sa-right4',
                                visible: 4,
                                autoPlay: true,
                                autoPlayDelay: 5
                            });
                            // jQuery('.slider4').lbSlider("refresh");
                        }
                        console.log($scope.MostSearchedResponsesbookEntities);
//                        console
//                            .log(JSON
//                                .stringify($scope.MostSearchedResponsesbookEntities));

                    }).error(function (errorResponse) {
                    console.log(JSON.stringify(errorResponse));
                    // alert("Error While Searching the Result
                    // for Books");
                });

        };

        //Top Viewed by Friends or Practice/Solved Papers - Row 4
        $scope.TopViewedbyFriends = function (isReload) {
            if ($scope.isLoggedin()) {
                $scope.userId = $scope.loggedInUser.user;
                $window.localStorage.setItem("userId", $scope.userId);
                $scope.searchType = "user";
            } else {
                $scope.userId = "anonymous";
                $scope.searchType = "generic";
            }
            $("#no_result_found_top_viewed").hide();
            $("#topViewLeftArrow").show();
            $("#topViewRightArrow").show();
            var sortParam = 'name';
            var applyFilter = false;
            var resourceLimit = 10;
            var keyword = ($scope.searchkeyword === null ||
                    $scope.searchkeyword === "null" || $scope.searchkeyword === 'null') ? "None" :
                $scope.searchkeyword;
            var parameters = '';
            entTyp = $scope.searchEntity;
            if ($scope.userId != null) {
                parameters = parameters + '?user=' + $scope.userId + '&searchEntity=' + entTyp + '&searchType=rating';
            } else if ($scope.userId == null) {
                parameters = parameters + '?searchEntity=' + entTyp + '&searchType=rating';
            }
            var token = Util.generateToken();
            var searchUrl = $scope.baseApiUrl + "/ws/rest/resourceService/getResourceEntityBasedByUponSearchCriteria/token/" +
                token +
                parameters;
            console.log('Prasanta 1 - ' + searchUrl);
            $http
                .get(searchUrl)
                .success(
                    function (resourceEntities) {
                        $scope.TopViewedbyFriendsEntities = resourceEntities;
                        $scope.TopViewedbyFriend = resourceEntities;
                        var i = 0;
                        $scope.slider = [];
                        $scope.TopViewedbyFriendsEntities = resourceEntities;
                        if ($scope.TopViewedbyFriendsEntities.length > 0) {
                            //$scope.resource = $scope.TopViewedbyFriendsEntities[0];
                            $scope.getTopicFromSubject();
                        } else {
                            $("#no_result_found_top_viewed").show();
                            $("#topViewLeftArrow").hide();
                            $("#topViewRightArrow").hide();
                        }
                        if ($scope.TopViewedbyFriend.length > 4) {
                            $scope.TopViewedbyFriendsEntities = $scope.TopViewedbyFriend.slice(0, 4);
                        }
                        if (isReload === true) {
                            //$("#searchContext1").show();
                            //$scope.$apply();
                            jQuery('.slider4').lbSlider({
                                leftBtn: '.sa-left4',
                                rightBtn: '.sa-right4',
                                visible: 4,
                                autoPlay: true,
                                autoPlayDelay: 5
                            });
                            // jQuery('.slider4').lbSlider("refresh");
                        }
                        console
                            .log(JSON
                                .stringify($scope.TopViewedbyFriendsEntities));

                    }).error(function (errorResponse) {
                    console.log(JSON.stringify(errorResponse));
                    // alert("Error While Searching the Result
                    // for Books");
                });

        };

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
            var resourceLimit = 10;
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
            // alert($scope.page +" "+resourceLimit);
            var token = Util.generateToken();
            var searchUrl = $scope.baseApiUrl + "/ws/rest/resourceService/getResourceEntityBasedByUponSearchCriteria/token/" +
                token +
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
                        if (isReload === true) {
                            //$("#searchContext1").show();
                            //$scope.$apply();
                            jQuery('.slider4').lbSlider({
                                leftBtn: '.sa-left4',
                                rightBtn: '.sa-right4',
                                visible: 4,
                                autoPlay: true,
                                autoPlayDelay: 5
                            });
                            // jQuery('.slider4').lbSlider("refresh");
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

        //$scope.latitude = 0.0;
        //$scope.longitude = 0.0;
        //$scope.nearMe = function () {
        //		        if (navigator.geolocation) {
        //		            navigator.geolocation.getCurrentPosition(function (
        //							position) {
        //		                $scope.latitude = position.coords.latitude;
        //		                $scope.longitude = position.coords.longitude;
        //		            });
        //		        }
        //		    }

        $scope.changeActive = function (entityName, IsWriteReview) {
            console.log("entityName " + entityName)
            if (entityName === 'coachingClass') {
                if (document.getElementById('topicsContainer') != null) {
                    document.getElementById('topicsContainer').style.display = "none";
                }
                $("#coachingClassSorting").show();
                $("#booksSorting").hide();
                $scope.selectedOrderBy = 'rating';
                $scope.reviewEntity = "coaching Class";
                $scope.identity1 = "Faculty";
                $scope.identity2 = "Study Materials";
                $scope.identity3 = "Personalization";
                $scope.identity4 = "Infrastructure";
                $scope.searchEntity = 'coachingClass';
                $scope.showBook = false;
                $scope.showCoachingClass = true;
                $scope.showDigitalResource = false;
                $scope.review.resourceReviewedType = "COACHING_CLASS";
                $("#selectbook").removeClass("active");
                $("#selectDigitalResource").removeClass("active");
                $("#selectCoachingClass").addClass("active");
                // $scope.searchCoachingClassBasedUponLocation();
                if ($scope.searchkeyword == 'None') {
                    $("#coachingclasses").show();
                }
                $scope.coachingclassesToolTips();

            } else if (entityName === 'digitalResource') {
                if (document.getElementById('topicsContainer') != null) {
                    document.getElementById('topicsContainer').style.display = "none";
                }
                $("#coachingClassSorting").show();
                $("#booksSorting").hide();
                $scope.selectedOrderBy = 'rating';
                $scope.review.resourceReviewedType = "DIGITAL_RESOURCE";
                $scope.reviewEntity = "Digital Resource";
                $scope.identity1 = "Personalization";
                $scope.identity2 = "Interactivity";
                $scope.identity3 = "Ease of Use";
                $scope.identity4 = "Study Materials";
                $scope.searchEntity = 'digitalResource';
                $scope.showBook = false;
                $scope.showCoachingClass = false;
                $scope.showDigitalResource = true;
                $("#selectbook").removeClass("active");
                $("#selectDigitalResource").addClass("active");
                $("#selectCoachingClass").removeClass("active");
                $scope.searchBar();
                $scope.digitalResourceToolTips();

            } else if (entityName === 'book') {
                if (document.getElementById('topicsContainer') != null) {
                    document.getElementById('topicsContainer').style.display = "";
                }
                $("#coachingClassSorting").hide();
                $("#booksSorting").show();
                $scope.review.resourceReviewedType = "BOOK";
                $scope.reviewEntity = "Book";
                $scope.identity1 = "Effectiveness";
                $scope.identity2 = "Visual Aides";
                $scope.identity3 = "Solutions to practical problems";
                $scope.identity4 = "Real-world examples";
                $scope.searchEntity = 'book';
                $scope.showBook = true;
                $scope.showCoachingClass = false;
                $scope.showDigitalResource = false;
                $("#selectbook").addClass("active");
                $("#selectDigitalResource").removeClass("active");
                $("#selectCoachingClass").removeClass("active");
                $scope.searchBar();
                $scope.bookToolTips();
            }
            $scope.IsWriteReview = IsWriteReview;
            $scope.searchEntity = entityName;
            $scope.searchProfilebook();
            $scope.topRatedResourcesbook();
            $scope.TopViewedbyFriends();
            $scope.MostSearchedResponsesbook();
            //				        $("[data-toggle=tooltip]").tooltip();
        };

        $scope.searchBar = function () {
            if ($scope.isLoggedin()) {
                $scope.userId = $scope.loggedInUser.user;
                $window.localStorage.setItem("userId", $scope.userId);
                $scope.searchType = "user";
            } else {
                $scope.userId = "anonymous";
                $scope.searchType = "generic";
            }
            // alert('$scope.searchkeyword '+$scope.searchkeyword);
            if ($scope.searchkeyword != "" && $scope.searchkeyword != null) {
                $scope.profilesearchtitle = "Search Result";
            }
            var sortParam = 'name';
            var resourceLimit = 10;
            var keyword = ($scope.searchkeyword === null ||
                    $scope.searchkeyword === "null" || $scope.searchkeyword === 'null') ? "None" :
                $scope.searchkeyword;
            var applyFilter = true;
            var parameters = '';
            if ($scope.userId != null && $scope.searchkeyword == null) {
                parameters = parameters + '?userId=' + $scope.userId + '&searchEntity=' + $scope.searchEntity + '&searchType=preference';
            } else if ($scope.userId != null && $scope.searchkeyword != null) {
                parameters = parameters + '?userId=' + $scope.userId + '&searchEntity=' + $scope.searchEntity + '&searchType=generic&keyword=' + $scope.searchkeyword + '';
            } else if ($scope.userId == null && $scope.searchkeyword == null) {
                parameters = parameters + '?searchEntity=' + $scope.searchEntity + '';
            } else if ($scope.userId == null && $scope.searchkeyword != null) {
                parameters = parameters + '?searchEntity=' + $scope.searchEntity + '&searchType=generic&keyword=' + $scope.searchkeyword + '';
            }
            // alert($scope.page +" "+resourceLimit);
            var token = Util.generateToken();
            var searchUrl = $scope.baseApiUrl + "/ws/rest/resourceService/getResourceEntityBasedByUponSearchCriteria/token/" +
                token +
                parameters;
            console.log("searchUrl " + searchUrl);
            // alert('url' +searchUrl);
            //$("#searchResultDiv").hide();
            //$("#reviewId").hide();
            //$("#loadingDiv").show();
            $scope.isLoaderVisible = true;
            //$("#leftArrow").show();
            //$("#rightArrow").show();

            $http
                .get(searchUrl)
                .success(
                    function (resourceEntities) {
                        $scope.searchkeyword = '';

                        $scope.resource = {};
                        //$("#bookDetailsId").hide();
                        //$("#loadingDiv").hide();
                        $scope.isLoaderVisible = false;
                        //$("#searchContext1").show()
                        $scope.ProfileSearchBooks = resourceEntities;
                        $scope.ProfileSearchBooksEntities = resourceEntities;
                        var i = 0;
                        $scope.slider = [];
                        $scope.ProfileSearchBooksEntities = resourceEntities;
                        if ($scope.ProfileSearchBooks.length > 4) {
                            $scope.ProfileSearchBooksEntities = $scope.ProfileSearchBooks.slice(0, 4);
                        }

                        if ($scope.ProfileSearchBooksEntities.length > 0) {
                            $scope.resource.bigUrl = "";
                            $scope.resource = $scope.ProfileSearchBooksEntities[0];
                            $scope.getTopicFromSubject();
                            if ($scope.resourceEntities.length < 4) {
                                $("#searchResultDiv")
                                    .show();
                            }
                        } else {
                            $scope.resource = {};
                            //$("#searchContext1").hide();
                            //$("#leftArrow").hide();
                            //$("#rightArrow").hide();
                            $('html,body')
                                .animate({
                                    scrollTop: $(
                                            "#no_result_found")
                                        .offset().top
                                }, 'slow');
                        }
console.log($scope.resource);
                    }).error(function (errorResponse) {
                    $scope.isLoaderVisible = false;
                    console.log(JSON.stringify(errorResponse));
                });
        };

        $scope.updateSelectedInstance = function (resource) {
            $scope.resetReview();
            $scope.resource.bigUrl = "";
            $scope.resource = resource;
            console.log($scope.resource);
            $('body').animate({
                scrollTop: $("#bookDetailsId").offset().top - 140
            }, 'slow');
        };

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
        }


        $scope.searchCoachingClassBasedUponLocation = function () {
            var selectBasedCoachingClassSearch = "Non_Keyword_Entered:" + $scope.selectedState + "-" + $scope.selectedCity;
            $scope.location = $scope.selectedCity;
            $scope.searchkeyword = selectBasedCoachingClassSearch;
            $scope.searchBar();
        };


        $scope.hideTab = function () {
            document.getElementById('tab').style.display = "none";
        }

        $scope.topic1 = '';
        $scope.topic2 = '';
        $scope.topic3 = '';

        $scope.getTopicFromSubject = function () {
            if ($scope.searchEntity === 'book' ||
                $scope.searchEntity === 'digitalResource') {
                var subject = $scope.resource.subject;
                var token = Util.generateToken();
                var statesUrl = $scope.baseApiUrl + "/ws/rest/utilService/topics/subject/" +
                    'physics' + "/token/" + token;
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
                    // var json=JSON.stringify($scope.topics);
                    // console.log(json);
                }).error(function (exception) {
                    $scope.topics = [];
                });

            }

        }

        // ng-init
        $scope.init = function (page, isReload) {
            // $scope.nearMe();

            $scope.bookToolTips();

            var isRedirectedSearch = window.localStorage
                .getItem("isRedirectedSearch");
            if (isRedirectedSearch === "true" ||
                isRedirectedSearch == true) {
                var redirectSearchKeyword = window.localStorage
                    .getItem("redirectSearchKeyword");
                var keyword = (redirectSearchKeyword === null ||
                        redirectSearchKeyword === "null" || redirectSearchKeyword === 'null') ? "None" :
                    $scope.searchkeyword;
                if (redirectSearchKeyword != "" &&
                    redirectSearchKeyword != '' && redirectSearchKeyword != 'None') {
                    $scope.searchkeyword = redirectSearchKeyword;
                    var resourceType = window.localStorage
                        .getItem("resourceType");
                    if (resourceType == 'BOOKS') {
                        $scope.changeActive('book');
                    } else if (resourceType == 'COACHING_CLASSES') {
                        $scope.changeActive('coachingClass');
                    } else if (resourceType == 'DIGITAL_RESOURCES') {
                        $scope.changeActive('digitalResource');
                    }
                    $scope.profilesearchtitle = "Search Result";
                    isReload = true;
                    window.localStorage.setItem("isRedirectedSearch", true);
                    window.localStorage.setItem("redirectSearchKeyword", "");
                }
            }
            $scope.searchProfilebook(isReload);
            $scope.topRatedResourcesbook(isReload);
            $scope.TopViewedbyFriends(isReload);
            $scope.MostSearchedResponsesbook(isReload);
        };

    });
