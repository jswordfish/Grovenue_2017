var app = angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'UtilService', 'AuthService', 'UserService', 'ModalService', 'ngImgCrop', 'authModule', 'FeedbackModule','ngEmbed']);

app
    .controller('reviewsController',
        function ($scope, $http, $window, $filter, Util, Auth) {
            $scope.baseApiUrl = Util.getBaseUrl();
            $scope.resourceReviews = {};

            var url = $scope.baseApiUrl + '/ws/rest/reviewRelatedService/topRatedBooks/limit/100/token/test';
            $http.get(url).success(function (data) {
                console.log('reviews got');
                $scope.resourceReviews = data;
            });

            $scope.goback = function () {
                $window.location.href = 'write_review.html';
            }

        });

app
    .controller('indexController',
        function ($scope, $http, $window, $filter, Util, Auth, Modal) {
            $scope.baseApiUrl = Util.getBaseUrl();

            $scope.user = {};
            $scope.someObject = {};
            $scope.searchString = '';
    
            $scope.loggedInUser = Util.getLoggedInUser();

            $scope.titles = ['Sucks big time', 'Kinda bad', 'Meh', 'Pretty good', 'Rocks!'];

            $scope.testimonialsInterval = 5000;
            $scope.noWrapSlides = false;
            $scope.testimonialsActive = 0;
            $scope.testimonials = [];
            $scope.testimonials.push({
                id: "1",
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                name: "User Name, Designation",
                date: "2nd May 2016"
            });
            $scope.testimonials.push({
                id: "2",
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                name: "User Name, Designation",
                date: "3rd May 2016"
            });
            $scope.testimonials.push({
                id: "3",
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                name: "User Name, Designation",
                date: "4th May 2016"
            });

            $scope.redirectTo = function (page) {
                $window.location.href = page;
            }

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
            // modal open section end

            $scope.RatingredirectAndSearch = function (resourceName, entity) {
                $scope.searchText = resourceName;
                window.localStorage.setItem("isRedirectedSearch", true);
                window.localStorage.setItem("resourceType", entity);
                window.localStorage.setItem("redirectSearchKeyword",
                    $scope.searchText);
                $window.location.href = 'prepare_for_greatness.html'; //?urlScroll=bookDetailsId
            }

            $scope.redirectAndSearch = function () {
                window.localStorage.setItem("isRedirectedSearch", true);
                window.localStorage.setItem("redirectSearchKeyword",
                    $scope.searchText);
                $window.location.href = 'prepare_for_greatness.html'; //?urlScroll=bookDetailsId
            }

            $scope.booksCount = 0;
            $scope.redirectUrl = "index.html";
            $scope.init = function (page) {
                $scope.redirectUrl = page + '.html';
            }
            var url = $scope.baseApiUrl + '/ws/rest/bookService/search/criteria/JEE/startFrom/1/maxResults/5/token/test';
            $http.get(url).success(function (data) {
                console.log('reviews got');
                $scope.searchResponse = data;
                $scope.books = data.books;

                console.log($scope.books);
                if ($scope.books.length > 2) {
                    $scope.books = $scope.books.slice(0, 2);
                }
            });

            $scope.increaseCounter = function () {
                if ($scope.booksCount == 4) {
                    $scope.booksCount = 0;
                } else {
                    $scope.booksCount++;
                }

                if ($scope.searchResponse.books.length == 5) {
                    if ($scope.booksCount < 3) {
                        $scope.books = $scope.searchResponse.books
                            .slice($scope.booksCount,
                                $scope.booksCount + 2);
                    } else {
                        $scope.books = $scope.searchResponse.books
                            .slice(0, 2);
                    }
                }
            }

            $scope.decreaseCounter = function () {
                if ($scope.booksCount == 0) {
                    $scope.booksCount = 4;
                } else {
                    $scope.booksCount--;
                }

                if ($scope.searchResponse.books.length == 5) {
                    if ($scope.booksCount > 1) {
                        $scope.books = $scope.searchResponse.books
                            .slice($scope.booksCount - 2,
                                $scope.booksCount);
                    } else {
                        $scope.books = $scope.searchResponse.books
                            .slice(0, 2);
                    }
                }
            }

            $scope.classesCounter = 0;
            var search = window.encodeURIComponent('(?i).*B.*');

            var url = $scope.baseApiUrl + '/ws/rest/coachingClassService/searchCoachingClass/name/' +
                search + '/token/test';
            $http.get(url).success(function (data) {
                console.log('coaching classes got');
                console.log(data);
                $scope.searchResponseCoach = data;
                $scope.classes = data.classes;

                console.log(' books length ' + $scope.classes.length);
                if ($scope.classes.length > 2) {
                    $scope.classes = $scope.classes.slice(0, 2);
                }
            });

            $scope.increaseClassCounter = function () {
                if ($scope.classesCounter == 4) {
                    $scope.classesCounter = 0;
                } else {
                    $scope.classesCounter++;
                }

                if ($scope.searchResponseCoach.classes.length >= 5) {
                    if ($scope.classesCounter < 3) {
                        $scope.classes = $scope.searchResponseCoach.classes
                            .slice($scope.classesCounter,
                                $scope.classesCounter + 2);
                    } else {
                        $scope.classes = $scope.searchResponseCoach.classes
                            .slice(0, 2);
                    }
                }
            }

            $scope.decreaseClassCounter = function () {
                if ($scope.classesCounter == 0) {
                    $scope.classesCounter = 4;
                } else {
                    $scope.classesCounter--;
                }

                if ($scope.searchResponseCoach.classes.length >= 5) {
                    if ($scope.classesCounter > 1) {
                        $scope.classes = $scope.searchResponseCoach.classes
                            .slice($scope.classesCounter - 2,
                                $scope.classesCounter);
                    } else {
                        $scope.classes = $scope.searchResponseCoach.classes
                            .slice(0, 2);
                    }
                }
            }

            $scope.digitalResourcesCounter = 0;
            var searchD = window.encodeURIComponent('(?i).*A.*');

            var url = $scope.baseApiUrl + '/ws/rest/digitalToolService/searchDigitalTool/name/' +
                searchD + '/token/test';
            $http.get(url).success(function (data) {
                console.log('digital resources got');
                //console.log(data);
                $scope.searchResponseD = data;
                $scope.tools = data.tools;

                console.log(' tools length ' + $scope.tools.length);
                if ($scope.tools.length > 2) {
                    $scope.tools = $scope.tools.slice(0, 2);
                }
            });

            $scope.increaseDRCounter = function () {
                if ($scope.digitalResourcesCounter == 4) {
                    $scope.digitalResourcesCounter = 0;
                } else {
                    $scope.digitalResourcesCounter++;
                }

                if ($scope.searchResponseD.tools.length >= 5) {
                    if ($scope.digitalResourcesCounter < 3) {
                        $scope.tools = $scope.searchResponseD.tools
                            .slice(
                                $scope.digitalResourcesCounter,
                                $scope.digitalResourcesCounter + 2);
                    } else {
                        $scope.tools = $scope.searchResponseD.tools
                            .slice(0, 2);
                    }
                }
            }

            $scope.decreaseDRCounter = function () {
                if ($scope.digitalResourcesCounter == 0) {
                    $scope.digitalResourcesCounter = 4;
                } else {
                    $scope.digitalResourcesCounter--;
                }

                if ($scope.searchResponseD.tools.length >= 5) {
                    if ($scope.digitalResourcesCounter > 1) {
                        $scope.tools = $scope.searchResponseD.tools
                            .slice(
                                $scope.digitalResourcesCounter - 2,
                                $scope.digitalResourcesCounter);

                    } else {
                        $scope.tools = $scope.searchResponseD.tools
                            .slice(0, 2);
                    }
                }
            }

            $scope.fetchOrdersForUser = function () {
                var url = $scope.baseApiUrl + '/ws/rest/orderWebService/orders/user/' +
                    $scope.loggedInUser.user + '/socialMedia/' +
                    $scope.loggedInUser.socialMedia +
                    '/token/test';
                console.log('fetching orders');
                $http
                    .get(url)
                    .success(
                        function (data) {
                            console.log(' orders got');
                            $scope.orders = data;
                            if ($scope.orders.length == 0) {
                                $scope.noServicesAvailedYet = 'No services availed yet';
                            }
                        });
            }

            $scope.search = function () {
                console.log(' in search function search string is ' +
                    $scope.searchString);
                if ($scope.searchString == '' ||
                    $scope.searchString == 'null' ||
                    $scope.searchString == null) {
                    return;
                } else {
                    $window.localStorage.setItem("searchString",
                        $scope.searchString);
                    $window.location.href = 'write_review.html';
                    $scope.searchString = '';
                }

            }

        });
