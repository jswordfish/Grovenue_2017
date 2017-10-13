var app = angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'UtilService', 'AuthService', 'UserService', 'ngImgCrop', 'ModalService', 'ngImgCrop', 'authModule', 'FeedbackModule']);

app.controller('reviewsController', function ($scope, $http, $window, $filter, Util, Auth) {
    $scope.baseApiUrl = Util.getBaseUrl();

    $scope.resourceReviews = {};

    var url = $scope.baseApiUrl + '/ws/rest/reviewRelatedService/topRatedBooks/limit/100/token/test';
    $http.get(url).
    success(function (data) {
        console.log('reviews got');
        $scope.resourceReviews = data;
    });

    $scope.goback = function () {
        $window.location.href = 'write_review.html';
    }


});


app.controller('beJobReadyController', function ($scope, $http, $window, $filter, Util, Auth, Modal) {
    $scope.baseApiUrl = Util.getBaseUrl();
    
    $scope.loggedInUser = Util.getLoggedInUser();

    $scope.isShowCV = true;
    $scope.isShowCover = false;
    $scope.isShowInterview = false;

    $scope.showYearCategories = true;
    $scope.showPricingCategories = false;
    $scope.showPricingDetail = false;
    
    $scope.showPayButton = false;

    $scope.cv = {};
    $scope.cv.yearCategories = getCVCats();
    $scope.cv.selectedYearCategory = null;
    $scope.cv.selectedPricing = null;
    
    $scope.cover = {};
    $scope.cover.yearCategories = getCoverCats();
    $scope.cover.selectedYearCategory = null;
    $scope.cover.selectedPricing = null;
    
    $scope.int = {};
    $scope.int.pricingCategories = getIntCats();
    $scope.int.selectedPricing = null;
    
    function getCVCats() {
        var yearCategories = [];
        yearCategories.push({
            min: 0,
            max: 1,
            image: "images/0-1years.png",
            pricing: [{
                image: "images/basic.png",
                title: "BASIC",
                desc: "Template, 1 additional iteration",
                price: 1500
        }, {
                image: "images/pro.png",
                title: "PRO",
                desc: "Template, 2 additional iteration",
                price: 2050
        }, {
                image: "images/elite.png",
                title: "ELITE",
                desc: "Template, 3 additional iteration + Cover letter",
                price: 4200
        }]
        });
        yearCategories.push({
            min: 1,
            max: 3,
            image: "images/1-3years.png",
            pricing: [{
                image: "images/basic.png",
                title: "BASIC",
                desc: "Template, 1 additional iteration",
                price: 2500
        }, {
                image: "images/pro.png",
                title: "PRO",
                desc: "Template, centent research for target toles, 2 additional iteration",
                price: 3700
        }, {
                image: "images/elite.png",
                title: "ELITE",
                desc: "TTemplate, 5 additional iteration, Cover letter",
                price: 6000
        }]
        });
        yearCategories.push({
            min: 3,
            max: 5,
            image: "images/3-5years.png",
            pricing: [{
                image: "images/basic.png",
                title: "BASIC",
                desc: "Template, 1 additional iteration",
                price: 3700
        }, {
                image: "images/pro.png",
                title: "PRO",
                desc: "Template, centent research for target toles, 2 additional iteration",
                price: 5300
        }, {
                image: "images/elite.png",
                title: "ELITE",
                desc: "Template, 5 additional iteration, Cover letter",
                price: 10000
        }]
        });
        return yearCategories;
    }
    
    function getCoverCats() {
        var yearCategories = [];
        yearCategories.push({
            min: 0,
            max: 1,
            price: 1000,
            image: "images/0-1years.png",
            pricing: [{
                image: "images/basic.png",
                title: "BASIC",
                desc: "Template, 1 additional iteration",
                price: 1500
        }, {
                image: "images/pro.png",
                title: "PRO",
                desc: "Template, 2 additional iteration",
                price: 2050
        }, {
                image: "images/elite.png",
                title: "ELITE",
                desc: "Template, 3 additional iteration + Cover letter",
                price: 4200
        }]
        });
        yearCategories.push({
            min: 1,
            max: 3,
            price: 1500,
            image: "images/1-3years.png",
            pricing: [{
                image: "images/basic.png",
                title: "BASIC",
                desc: "Template, 1 additional iteration",
                price: 1500
        }, {
                image: "images/pro.png",
                title: "PRO",
                desc: "Template, 2 additional iteration",
                price: 2050
        }, {
                image: "images/elite.png",
                title: "ELITE",
                desc: "Template, 3 additional iteration + Cover letter",
                price: 4200
        }]
        });
        yearCategories.push({
            min: 3,
            max: 5,
            price: 2000,
            image: "images/3-5years.png",
            pricing: [{
                image: "images/basic.png",
                title: "BASIC",
                desc: "Template, 1 additional iteration",
                price: 1500
        }, {
                image: "images/pro.png",
                title: "PRO",
                desc: "Template, 2 additional iteration",
                price: 2050
        }, {
                image: "images/elite.png",
                title: "ELITE",
                desc: "Template, 3 additional iteration + Cover letter",
                price: 4200
        }]
        });
        return yearCategories;
    }

    function getIntCats() {
        var pricingCategories = [];
        pricingCategories.push({
            price: 5000,
            image: "images/0-1years.png",
            desc1: "Basic Bahavioural",
            desc2: "Interview",
            desc3: "Questions",
            packageItems : [
                "Basic behavioural interview questions: INR 5,000",
                "Student will get help in crafting responses to 5 key interview questions such as \"tell me about yourself\", \"why this job?\", \"strengths and weaknesses\"",
                "Includes a list of interview tips and tricks",
                "Does not include industry-specific questions",
                "Includes 3 telephonic conversations / mock interview"
            ]
        },{
            price: 2500,
            image: "images/1-3years.png",
            desc1: "Basic Informational",
            desc2: "Interview",
            desc3: "Questions",
            packageItems : [
                "Student will get a list of 5 common questions asked in informational interview0",
                "including potential responses based on the student's resume",
                "includes 5 questions to ask in informational interview",
                "includes 1 telephonic conversations / mock interview"
            ]
        });
        
        return pricingCategories;
    }
    
    $scope.scrollToElem = function(id,offset) {
        $("body").animate({scrollTop: $(id).offset().top+offset}, "slow");
    }
    
    $scope.scrollToPackageDetail = function(){
        $("body").animate({scrollTop: $("#packageDetailPane").offset().top-140}, "slow");
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
    
    $scope.resetServiceCosting = function() {
        $scope.serviceCosting = {
            "templateUseOnly": false,
            "expressService": false,
            "superExpressService": false,
            "eachAdditionIteration": false,
            "coverLetter": false
        };
        
        $scope.orderType = '';
    }

    $scope.goToStep = function (step) {
        $scope.closePricing();
        if (step == 1) {
            $scope.isShowCV = true;
            $scope.isShowCover = false;
            $scope.isShowInterview = false;
        } else if (step == 2) {
            $scope.isShowCV = false;
            $scope.isShowCover = true;
            $scope.isShowInterview = false;
        } else if (step == 3) {
            $scope.isShowCV = false;
            $scope.isShowCover = false;
            $scope.isShowInterview = true;
        }
        $scope.scrollToElem("#stepsDetail",-140);
        
    }

    $scope.closePricing = function () {
        $scope.showYearCategories = true;
        $scope.showPricingCategories = false;
        $scope.showPricingDetail = false;
    }

    $scope.showPricingPane = function (yearCategory) {
        $scope.cv.selectedYearCategory = yearCategory;
        $scope.showYearCategories = false;
        $scope.showPricingCategories = true;
        $scope.showPricingDetail = false;
        console.log(yearCategory);
    }
    
    $scope.showCoverPricingPane = function (yearCategory) {
        $scope.cover.selectedYearCategory = yearCategory;
        $scope.showYearCategories = false;
        $scope.showPricingCategories = true;
        $scope.showPricingDetail = false;
        console.log(yearCategory);
    }

    $scope.showPricingDetailPane = function (pricing) {
        $scope.cv.selectedPricing = pricing;
        $scope.showYearCategories = false;
        $scope.showPricingCategories = true;
        $scope.showPricingDetail = true;
        $scope.orderType = '';
        $scope.orderType += 'serviceType='+$scope.serviceCosting.serviceType+'&package='+$scope.serviceCosting.package+'&';
        $scope.serviceCosting.serviceType="CV";
        $scope.serviceCosting.package = "Basic- " + $scope.cv.selectedYearCategory.min + " to " + $scope.cv.selectedYearCategory.max + " Exp";
        $scope.serviceCosting.price = pricing.price;
        $scope.scrollToPackageDetail();
    }
    
    $scope.showCoverPricingDetailPane = function (pricing) {
        $scope.cover.selectedPricing = pricing;
        $scope.showYearCategories = false;
        $scope.showPricingCategories = true;
        $scope.showPricingDetail = true;
        console.log(pricing);
        Util.alert("Alert","Right now You can purchase Cover Services by purchasing the CV Services with Cover Option selected!");
    }
    
    $scope.showIntPackageDetail = function(pricing) {
        $scope.int.selectedPricing = pricing;
        $scope.showYearCategories = false;
        $scope.showPricingCategories = true;
        $scope.showPricingDetail = true;
        console.log(pricing);
    }
    
    $scope.buyInterviewServices = function () {
        $scope.closePricing();
        Util.alert("Alert","Right now you can only buy CV and Cover Services");
    }

    $scope.confirmCosting = function () {
        $scope.orderType = '';
        $scope.orderType += 'sT=' + $scope.serviceCosting.serviceType + '#pkg=' + $scope.serviceCosting.package + '#';
        var totalPrice = $scope.serviceCosting.price;
        console.log($scope.serviceCosting.templateUseOnly);
        console.log($scope.serviceCosting.expressService);
        console.log($scope.serviceCosting.superExpressService);
        console.log($scope.serviceCosting.eachAdditionIteration);
        console.log($scope.serviceCosting.coverLetter);

        if ($scope.serviceCosting.templateUseOnly) {
            totalPrice += 500;
            $scope.serviceCosting.templateUseOnlyAmount = 500;
        } else {
            $scope.serviceCosting.templateUseOnlyAmount = 0;
        }

        if ($scope.serviceCosting.expressService) {
            totalPrice += 300;
            $scope.serviceCosting.expressServiceAmount = 300;
        } else {
            $scope.serviceCosting.expressServiceAmount = 0;
        }

        if ($scope.serviceCosting.superExpressService) {
            totalPrice += 750;
            $scope.serviceCosting.superExpressServiceAmount = 750;
        } else {
            $scope.serviceCosting.superExpressServiceAmount = 0;
        }

        if ($scope.serviceCosting.eachAdditionIteration) {
            totalPrice += 1000;
            $scope.serviceCosting.eachAdditionIterationAmount = 1000;
        } else {
            $scope.serviceCosting.eachAdditionIterationAmount = 0;
        }

        if ($scope.serviceCosting.coverLetter) {
            totalPrice += 1000;
            $scope.serviceCosting.coverLetterAmount = 1000;
        } else {
            $scope.serviceCosting.coverLetterAmount = 0;
        }

        $scope.serviceCosting.totalPrice = totalPrice;

        var details = 'tUO=' + $scope.serviceCosting.templateUseOnly + '#';
        details += 'bP=' + $scope.serviceCosting.price + '#';
        details += 'tPrice=' + $scope.serviceCosting.totalPrice + '#';
        details += 'eS=' + $scope.serviceCosting.expressService + '#';
        details += 'sES=' + $scope.serviceCosting.superExpressService + '#';
        details += 'eAI=' + $scope.serviceCosting.eachAdditionIteration + '#';
        details += 'cL=' + $scope.serviceCosting.coverLetter + '#';

        if ($scope.serviceCosting.templateUseOnly) {
            details += 'tuAmount=' + $scope.serviceCosting.templateUseOnlyAmount + '#';
        }

        if ($scope.serviceCosting.expressService) {
            details += 'eSAmt=' + $scope.serviceCosting.expressServiceAmount + '#';
        }

        if ($scope.serviceCosting.superExpressService) {
            details += 'sESAmt=' + $scope.serviceCosting.superExpressServiceAmount + '#';
        }

        if ($scope.serviceCosting.eachAdditionIteration) {
            details += 'eAIAmt=' + $scope.serviceCosting.eachAdditionIterationAmount + '#';
        }

        if ($scope.serviceCosting.coverLetter) {
            details += 'covAmt=' + $scope.serviceCosting.coverLetterAmount + '#';
        }

        $scope.orderType += details;
        $scope.orderType = window.encodeURIComponent($scope.orderType);
        console.log(' order type is ' + $scope.orderType);

        var tableHtml = "<table id='confirmTable' class='table' <thead> <tr> <th>Price Header</th> <th>Cost(INR)</th></thead>" +
            "<tbody><tr><td>" + $scope.serviceCosting.serviceType + "-" + $scope.serviceCosting.package + "</td><td>" + $scope.serviceCosting.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td></tr>" +
            "<tr><td>Template Use Only</td><td>" + $scope.serviceCosting.templateUseOnlyAmount + "</td></tr>" +
            "<tr><td>Express Service</td><td>" + $scope.serviceCosting.expressServiceAmount + "</td></tr>" +
            "<tr><td>Super Express Service</td><td>" + $scope.serviceCosting.superExpressServiceAmount + "</td></tr>" +
            "<tr><td>Each Additional Iteration</td><td>" + $scope.serviceCosting.eachAdditionIterationAmount + "</td></tr>" +
            "<tr><td>Cover Letter</td><td>" + $scope.serviceCosting.coverLetterAmount + "</td></tr>" +
            "<tr><td>Total Price</td><td>" + $scope.serviceCosting.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</td></tr></table>";

        // bootbox.confirm("Total Price is "+totalPrice+". To proceed to
        // pay, click on OK or else click Cancel", function(result) {
        Util.confirm("Continue?", "Here are the order details - <br>" + tableHtml + "<br> To confirm click OK or else click Cancel","OK","Cancel","md")
            .then(function (result) {
                $scope.showPayButton = true;
            console.log($scope.showPayButton);
                $window.localStorage.setItem("selectedYearCategory", JSON.stringify($scope.cv.selectedYearCategory));
                $window.localStorage.setItem("selectedPricing", JSON.stringify($scope.cv.selectedPricing));
                $window.localStorage.setItem("orderModeServiceCosting", JSON.stringify($scope.serviceCosting));
                $window.localStorage.setItem("orderModeOrderType", $scope.orderType);
                window.location.reload();
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

    $scope.redirectAndSearch = function () {
        window.localStorage.setItem("isRedirectedSearch", true);
        window.localStorage.setItem("redirectSearchKeyword",
            $scope.searchText);
        $window.location.href = 'prepare_for_greatness.html';
    }

    $scope.search = function () {
        console.log(' in search function search string is ' + $scope.searchString);
        if ($scope.searchString == '' || $scope.searchString == 'null' || $scope.searchString == null) {
            return;
        } else {
            $window.localStorage.setItem("searchString", $scope.searchString);
            $window.location.href = 'write_review.html';
            $scope.searchString = '';
        }

    }
    
    $scope.initPayment = function() {
        var url = "https://www.instamojo.com/jswordfisdh/grovenue-career-services/?embed=form&data_Field_65046=readonly&data_readonly=data_email&data_readonly=data_amount&data_readonly=data_name&data_name=" + $scope.loggedInUser.firstName  +"&data_email=" + $scope.loggedInUser.user + "&data_phone=" + $scope.loggedInUser.contact + "&data_amount=10&data_Field_65046=" + $scope.loggedInUser.socialMediaType + "&data_Field_53399=" + $scope.orderTypeEncoded + "&data_hidden=data_Field_65046&data_hidden=data_Field_53399";
        Instamojo.open(url);
    }
    
    $scope.resetServiceCosting();
    console.log('!!!!!!!!!!!!!!!!!!!!!! order type begin rr' + $scope.orderType);
    console.log('!!!!!!!!!!!!!!!!!!!!!! service costing begin rr' + $scope.serviceCosting);
    var ordermodeServiceCosting = $window.localStorage.getItem('orderModeServiceCosting') || null;
    var selectedYearCategory = $window.localStorage.getItem('selectedYearCategory') || null;
    var selectedPricing = $window.localStorage.getItem('selectedPricing') || null;
    console.log(' ordermodeServiceCosting ' + ordermodeServiceCosting);

    if (ordermodeServiceCosting == 'null') {
        ordermodeServiceCosting = null;
    }
    if (ordermodeServiceCosting != null && selectedYearCategory!=null && selectedPricing!=null) {
        $scope.serviceCosting = JSON.parse(ordermodeServiceCosting);
        $scope.cv.selectedYearCategory = JSON.parse(selectedYearCategory);
        $scope.cv.selectedPricing = JSON.parse(selectedPricing);
        $scope.orderType = $window.localStorage.getItem('orderModeOrderType') || null;
        $scope.orderTypeEncoded = window.encodeURIComponent($scope.orderType);
        // $scope.$apply();
        Util.confirm("Continue?", "You had chosen some services to buy. Do you wish to proceed to pay. If yes click the Pay button?")
            .then(function (result) {
                    $scope.showPayButton = true;
                    $scope.showPricingDetailPane($scope.cv.selectedPricing);
            },function(result) {
                    $scope.resetServiceCosting();
                    $window.localStorage.setItem('orderModeServiceCosting', null)
                    $window.localStorage.setItem('orderModeOrderType', null);
        });
    } else {
        $scope.resetServiceCosting();
    }

    
});
