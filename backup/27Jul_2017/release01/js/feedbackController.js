angular.module('FeedbackModule', ['FeedbackService', 'UtilService'])
.controller("feedbackController",function($scope, $http, Feedback, Util){
    $scope.showForm = false;
    
    $scope.toggleForm = function() {
        $scope.showForm = !$scope.showForm;
    }
    
    $scope.submit = function (feed) {
        console.log(feed.email);
        $scope.submitted = Feedback.feedbacksubmit($scope.feedback);
        $scope.feedback.name = "";
        $scope.feedback.email = "";
        $scope.feedback.message = "";

        $scope.showForm = false;
        Util.alert("Your feedback is submitted. Thanks");
        return $scope.submitted;
    }
});