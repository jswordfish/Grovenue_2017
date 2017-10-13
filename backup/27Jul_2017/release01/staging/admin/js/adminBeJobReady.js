var app = angular.module('myApp', ['UtilService']);
app.controller(
    'adminBeJobReadyController',
    function ($scope, $http, $window, Util) {
        $scope.baseApiUrl = Util.getBaseUrl();

        var user = $window.localStorage.getItem('loggedInUser') || null;
        console.log('user is ' + user);

        user = JSON.parse(user);
        if (user == null)
            $window.location.href = '../index.html';

        console.log('user.userType is ' + user.userType);
        if (user.userType != 'ADMIN') {
            $window.location.href = '../index.html';
        }

        var gC = "(?i)A.*";
        gC = window.encodeURIComponent(gC);
        var url = $scope.baseApiUrl + '/ws/rest/beJobReadyService/getAllUserTemplates/user/' +
            gC + '/token/test';
        console.log(url);
        $http
            .get(url)
            .success(
                function (data) {
                    console.log('here ');
                    $scope.requests = data;
                    for (i = 0; i < $scope.requests.length; i++) {
                        if ($scope.requests[i].socialMediaType == 'NONE') {
                            $scope.requests[i].st = 'Non Social Media Registered User';
                        } else {
                            $scope.requests[i].st = 'Registered through ' +
                                $scope.requests[i].socialMediaType;
                        }
                    }

                });

        $scope.signOff = function () {
            console.log('in signoff method');

            $window.localStorage.setItem("loggedInUser", null);
            $window.location.href = '../index.html';
        }

        $scope.goToTemplateLandingPage = function (request) {
            $window.localStorage.setItem('candidateUser', JSON.stringify(request));
            $window.location.href = 'template1FormWizard.html';
        }

        $scope.fetchRequests = function (startWith) {

            var gC = "(?i)" + startWith + ".*";
            gC = window.encodeURIComponent(gC);
            var url = $scope.baseApiUrl + '/ws/rest/beJobReadyService/getAllUserTemplates/user/' +
                gC + '/token/test';
            console.log(url);
            $http
                .get(url)
                .success(
                    function (data) {
                        console.log('classes ' +
                            JSON.stringify(data));
                        $scope.requests = data;
                        for (i = 0; i < $scope.requests.length; i++) {
                            if ($scope.requests[i].socialMediaType == 'NONE') {
                                $scope.requests[i].st = 'Non Social Media Registered User';
                            } else {
                                $scope.requests[i].st = 'Registered through ' +
                                    $scope.requests[i].socialMediaType;
                            }
                        }

                    });

        };

    });
