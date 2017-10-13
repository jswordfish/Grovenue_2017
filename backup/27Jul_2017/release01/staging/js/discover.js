var app = angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'UtilService', 'AuthService', 'UserService', 'ModalService', 'ngImgCrop', 'authModule', 'FeedbackModule']);
app.controller( 'discoverController',  function($scope, $http, $window, $timeout, Feedback, Util, Auth, Modal) {
    $scope.baseApiUrl = Util.getBaseUrl();
    
	$scope.loggedInUser = Util.getLoggedInUser();
    
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
    
    $scope.showStrongInterestModal = function () {
        
                var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                size: 'lg',
                templateUrl: 'partials/strong-interest-modal.html',
                windowClass: 'modal-window-extension'
            };
            Modal.showModal(modalDefaults, {});
        

    }
    // modal open section end
                    
    $scope.isOnetInterest = false;
    $scope.isStrongIntrest = false;
    $scope.isResult = false;
		
	 //Begin user sign/profile/social/etc related stuff
	
	$scope.feedback = {};	
	$scope.submitted = "";
	$scope.user = {};
	$scope.searchString = '';
	
	
	$scope.submitStrongIntrest=function(){
        if(!$scope.isLoggedin()) {
            $scope.openLoginSignupModal();
            return;
        }
	    $scope.feedback.name=$scope.loggedInUser.fullName;
	    $scope.feedback.email=$scope.loggedInUser.user;
	    $scope.feedback.message='Strong Interest';
	    $scope.submitted = Feedback.feedbacksubmit($scope.feedback);
//	    $("#show_strongintrest_trigger").click();
        $scope.showStrongInterestModal();
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
	
	
	//Start Discover stuff
	$scope.show_discover_steps = function(toShow){
//        $scope.step=13;
        if(!$scope.isLoggedin()) {
            $scope.openLoginSignupModal();
            return;
        }
	    $scope.isStrongIntrest = false;
        $scope.isResult = false;
        $scope.isOnetInterest = true;
        $timeout(function () {
            $('body').animate({scrollTop: $("#discover_steps").offset().top-140}, 'slow');
        }, 400);
	}

    //Start Strong Intrest stuff
	$scope.show_strongintrest_steps = function(toShow){
        if(!$scope.isLoggedin()) {
            $scope.openLoginSignupModal();
            return;
        }
	    $scope.isOnetInterest = false;
        $scope.isResult = false;
        $scope.isStrongIntrest = true;
        $timeout(function () {
            $('body').animate({scrollTop: $("#strongintrest_steps").offset().top-140}, 'slow');
        }, 400);
	}
	
	
	
	$scope.questions1 = {};
	$scope.questions2 = {};
	$scope.questions3 = {};
	$scope.questions4 = {};
	$scope.questions5 = {};
	$scope.resultsFromOnet = {};
	
	$scope.realisticScore = '';
	$scope.investigativeScore = '';
	$scope.artisticScore = '';
	$scope.socialScore = '';
	$scope.enterprisingScore = '';
	$scope.conventionalScore = '';
	
	// $scope.careersJobZone1 = {};
	// $scope.careersJobZone2 = {};
	// $scope.careersJobZone3 = {};
	// $scope.careersJobZone4 = {};
	// $scope.careersJobZone5 = {};
	// $scope.careersJobZone = {};
	$scope.jobPreparationText = 'Medium job preparation';
	
	$scope.careerDetails = {};
	
	$scope.alsoCalled = 'Also called: '; 
    $scope.step = 1;
	$scope.steps = [];
	$scope.knowledgeElements = [];
	$scope.skillsElements = [];
	$scope.abilitiesElements = [];
	$scope.workStylesElements = [];
	
	$scope.technologies = [];

    $scope.realisticPopupVisible = false;
    $scope.socialPopupVisible = false;
    $scope.investigativePopupVisible = false;
    $scope.enterprisingPopupVisible = false;
    $scope.artisticPopupVisible = false;
    $scope.conventionalPopupVisible = false;
    $scope.jobZone1PopupVisible = false;
    $scope.jobZone2PopupVisible = false;
    $scope.jobZone3PopupVisible = false;
    $scope.jobZone4PopupVisible = false;
    $scope.jobZone5PopupVisible = false;
    
    $scope.ipadBack = function(){
        if($scope.step > 1) {
            $scope.step -= 1;
        }
    }

    $scope.ipadNext = function(){
        $scope.allSelected = true;
        var ques = [];
        if($scope.step==5) {
            ques = $scope.questions1.question;
        }
        if($scope.step==6) {
            ques = $scope.questions2.question;
        }
        if($scope.step==7) {
            ques = $scope.questions3.question;
        }
        if($scope.step==8) {
            ques = $scope.questions4.question;
        }
        if($scope.step==9) {
            ques = $scope.questions5.question;
        }
        for(var i=0; i<ques.length;i++) {
            if(ques[i].answer === undefined) {
                $scope.allSelected = false;
                break;
            }
        }
        if($scope.step==10) {
            $scope.submitAnswers();
        }
        if($scope.step==12) {
            $scope.fetchCareersByJobZone(3);
        }
        if($scope.step < 13 && $scope.allSelected) {
            $scope.step += 1;
        }
        else {
            Util.confirm("Thank you!", "Thank you for taking the Interest Profiler test. Click cancel if you want to continue!","OK","Cancel")
            .then(function (result) {
                $scope.isStrongIntrest = false;
                $scope.isResult = false;
                $scope.isOnetInterest = false;
                $scope.step = 1;
            });
        }
    }

    $scope.ipadGoto = function(step) {
        $scope.step = step;
    }

    $scope.openPopup = function(popup) {
        $scope.closePopup();
        if(popup=='realistic')
            $scope.realisticPopupVisible = true;
        if(popup=='social')
            $scope.socialPopupVisible = true;
        if(popup=='investigative')
            $scope.investigativePopupVisible = true;
        if(popup=='enterprising')
            $scope.enterprisingPopupVisible = true;
        if(popup=='artistic')
            $scope.artisticPopupVisible = true;
        if(popup=='conventional')
            $scope.conventionalPopupVisible = true;
        if(popup=='NoJob')
            $scope.jobZone1PopupVisible = true;
        if(popup=='SomeJob')
            $scope.jobZone2PopupVisible = true;
        if(popup=='MediumJob')
            $scope.jobZone3PopupVisible = true;
        if(popup=='HighJob')
            $scope.jobZone4PopupVisible = true;
        if(popup=='ExtensiveJob')
            $scope.jobZone5PopupVisible = true;
    }

    $scope.closePopup = function() {
        $scope.realisticPopupVisible = false;
        $scope.socialPopupVisible = false;
        $scope.investigativePopupVisible = false;
        $scope.enterprisingPopupVisible = false;
        $scope.artisticPopupVisible = false;
        $scope.conventionalPopupVisible = false;
        $scope.jobZone1PopupVisible = false;
        $scope.jobZone2PopupVisible = false;
        $scope.jobZone3PopupVisible = false;
        $scope.jobZone4PopupVisible = false;
        $scope.jobZone5PopupVisible = false;
    }
	
	var url = $scope.baseApiUrl + '/ws/rest/onetService/onet/questions/start/1/end/12/token/test';
	console.log(url);
	   $http.get(url).
	    success(function(data) {
		console.log('here ');
		   $scope.questions1 = data;
		    console.log($scope.questions1.length);
		    console.log($scope.questions1.question.length);
		    for(i=0; i<$scope.questions1.question.length; i++){
			// $scope.questions1.question[i].answer="3";
			}
		   
	    });
	    
	    url = $scope.baseApiUrl + '/ws/rest/onetService/onet/questions/start/13/end/24/token/test';
	console.log(url);
	   $http.get(url).
	    success(function(data) {
		console.log('here ');
		   $scope.questions2 = data;
		    console.log(' q 2 is '+$scope.questions2.question[0].text);
		     for(i=0; i<$scope.questions2.question.length; i++){
			// $scope.questions2.question[i].answer="3";
			}
		   
	    });
	    
	     url = $scope.baseApiUrl + '/ws/rest/onetService/onet/questions/start/25/end/36/token/test';
	console.log(url);
	   $http.get(url).
	    success(function(data) {
		console.log('here ');
		   $scope.questions3 = data;
		     for(i=0; i<$scope.questions3.question.length; i++){
			// $scope.questions3.question[i].answer="3";
			}
		   
	    });
	    
	     url = $scope.baseApiUrl + '/ws/rest/onetService/onet/questions/start/37/end/48/token/test';
	console.log(url);
	   $http.get(url).
	    success(function(data) {
		console.log('here ');
		   $scope.questions4 = data;
		     for(i=0; i<$scope.questions4.question.length; i++){
			// $scope.questions4.question[i].answer="3";
			}
		   
	    });
	    
	     url = $scope.baseApiUrl + '/ws/rest/onetService/onet/questions/start/49/end/60/token/test';
	console.log(url);
	   $http.get(url).
	    success(function(data) {
		console.log('here ');
		   $scope.questions5 = data;
		     for(i=0; i<$scope.questions5.question.length; i++){
			// $scope.questions5.question[i].answer="3";
			}
		   
	    });
	
	
	$scope.check = function(){
	var filled = true;
	
		for(i=0; i<$scope.questions1.question.length; i++){
		
			if($scope.questions1.question[i].answer == null){
			console.log($scope.questions1.question[i].index );
			console.log($scope.questions1.question[i].answer );
				filled = false;
				return filled;
			}
		}
		
		for(i=0; i<$scope.questions2.question.length; i++){
			if($scope.questions2.question[i].answer== null){
				filled = false;
				return filled;
			}
		}
		
		for(i=0; i<$scope.questions3.question.length; i++){
			if($scope.questions3.question[i].answer== null){
				filled = false;
				return filled;
			}
		}
		
		for(i=0; i<$scope.questions4.question.length; i++){
			if($scope.questions4.question[i].answer== null){
				filled = false;
				return filled;
			}
		}
		
		for(i=0; i<$scope.questions5.question.length; i++){
			if($scope.questions5.question[i].answer== null){
				filled = false;
				return filled;
			}
		}
		
		return filled;
	}
	
	
	$scope.submitAnswers = function(){
	var ans = '';
		for(i=0; i<$scope.questions1.question.length; i++){
			ans += $scope.questions1.question[i].answer;
		}
		
		for(i=0; i<$scope.questions2.question.length; i++){
			ans += $scope.questions2.question[i].answer;
		}
		
		for(i=0; i<$scope.questions3.question.length; i++){
			ans += $scope.questions3.question[i].answer;
		}
		
		for(i=0; i<$scope.questions4.question.length; i++){
			ans += $scope.questions4.question[i].answer;
		}
		
		for(i=0; i<$scope.questions5.question.length; i++){
			ans += $scope.questions5.question[i].answer;
		}
	
	 var url = $scope.baseApiUrl + '/ws/rest/onetService/onet/questions/answers/'+ans+'/token/test';
	 console.log('url is '+url);
		 $http.get(url).
	    success(function(data) {
		console.log('here ');
		  $scope.resultsFromOnet = data;
		  for(i=0;i<$scope.resultsFromOnet.result.length;i++){
		  console.log(' area is '+$scope.resultsFromOnet.result[i].area);
			if($scope.resultsFromOnet.result[i].area == 'Realistic'){
				$scope.realisticScore = $scope.resultsFromOnet.result[i].score;
			}
			else if($scope.resultsFromOnet.result[i].area == 'Investigative'){
				$scope.investigativeScore = $scope.resultsFromOnet.result[i].score;
			}
			else if($scope.resultsFromOnet.result[i].area == 'Artistic'){
				$scope.artisticScore = $scope.resultsFromOnet.result[i].score;
			}
			else if($scope.resultsFromOnet.result[i].area == 'Social'){
				$scope.socialScore = $scope.resultsFromOnet.result[i].score;
			}
			else if($scope.resultsFromOnet.result[i].area == 'Enterprising'){
				$scope.enterprisingScore = $scope.resultsFromOnet.result[i].score;
			}
			else if($scope.resultsFromOnet.result[i].area == 'Conventional'){
				$scope.conventionalScore = $scope.resultsFromOnet.result[i].score;
			}
		  
		
		  }
		  
			loadBars();
			loadBars1();
	    });
	}
	
	$scope.goToCareers = function(jobZone){
	$scope.showLoadingMessage = 'Data is being loaded from server. Please be patient........................';
	console.log('in goToCareers jobZone is '+jobZone);
		var ans = '';
		for(i=0; i<$scope.questions1.question.length; i++){
			ans += $scope.questions1.question[i].answer;
		}
		
		for(i=0; i<$scope.questions2.question.length; i++){
			ans += $scope.questions2.question[i].answer;
		}
		
		for(i=0; i<$scope.questions3.question.length; i++){
			ans += $scope.questions3.question[i].answer;
		}
		
		for(i=0; i<$scope.questions4.question.length; i++){
			ans += $scope.questions4.question[i].answer;
		}
		
		for(i=0; i<$scope.questions5.question.length; i++){
			ans += $scope.questions5.question[i].answer;
		}
		
	var url = $scope.baseApiUrl + '/ws/rest/onetService/onet/careers/answers/'+ans+'/jobZone/'+jobZone+'/start/1/end/1000/token/test';
	 console.log('url is '+url);
		$http.get(url).
	    success(function(data) {
		console.log('here ');
		$scope.showLoadingMessage = '';
		
		  $scope.careersJobZone = data;
			for(i=0; i<$scope.careersJobZone.career.length; i++){
			console.log(' t1 is '+$scope.careersJobZone.career[i].tags.brightOutlook);
		
			console.log($scope.careersJobZone.career[i].title);
				if($scope.careersJobZone.career[i].fit == 'Best'){
					$scope.careersJobZone.career[i].star = 'bluestar';
				}
				else{
					$scope.careersJobZone.career[i].star = 'pinkstar';
				}
				
				if($scope.careersJobZone.career[i].tags.brightOutlook == true){
					// $scope.careersJobZone.career[i].tags.showBright = '<i
					// class=\"fa fa-circle\" aria-hidden=\"true\"></i>';
					$scope.careersJobZone.career[i].tags.showBright = 'YES';
					console.log($scope.careersJobZone.career[i].tags.showBright );
				}
				else{
					$scope.careersJobZone.career[i].tags.showBright = '';
				}
				
				if($scope.careersJobZone.career[i].tags.green == true){
					// $scope.careersJobZone.career[i].tags.showGreen = '<i
					// class=\"fa fa-circle\" aria-hidden=\"true\"></i>';
					$scope.careersJobZone.career[i].tags.showGreen = 'YES';
				}
				else{
					$scope.careersJobZone.career[i].tags.showGreen = '';
				}
			}
            loadBars();
            loadBars1();
	    });
		
	}
	
	
	$scope.fetchCareersByJobZone = function(jobzone){
	console.log(' in fetchCareersByJobZone jobzone is '+jobzone); 
		if(jobzone == '1'){
			$scope.jobPreparationText = 'No job preparation';
		}
		else if(jobzone == '2'){
			$scope.jobPreparationText = 'Some job preparation';
		}
		else if(jobzone == '3'){
			$scope.jobPreparationText = 'Medium job preparation';
		}
		else if(jobzone == '4'){
			$scope.jobPreparationText = 'High job preparation';
		}
		else if(jobzone == '5'){
			$scope.jobPreparationText = 'Extensive job preparation';
		}
		
		$scope.goToCareers(jobzone);
	}
	
	
	$scope.fetchCareerDetails = function(careerCode){
	console.log(' in fetchCareerDetails careerCode is '+careerCode); 
	$scope.showLoadingMessage = 'Data is being loaded from server. Please be patient..................';
	
	var url = $scope.baseApiUrl + '/ws/rest/onetService/onet/occupationFullDetails/occupationCode/'+careerCode+'/token/test';
	
		$http.get(url).
	    success(function(data) {
		console.log('here ');
		$scope.showLoadingMessage = '';
		$scope.careerDetails = data;
			for(i=0 ; i<$scope.careerDetails.occupation.sampleOfReportedJobTitles.title.length; i++){
				if( i == ($scope.careerDetails.occupation.sampleOfReportedJobTitles.title.length - 1) ){
					$scope.alsoCalled += $scope.careerDetails.occupation.sampleOfReportedJobTitles.title[i];
				}
				else{
					$scope.alsoCalled += $scope.careerDetails.occupation.sampleOfReportedJobTitles.title[i] +", ";
				}
				
			}
			
			console.log(' also called '+$scope.alsoCalled);
			
			for(i=0;i<$scope.careerDetails.tasks.task.length; i++){
				$scope.steps.push($scope.careerDetails.tasks.task[i].statement);
			}
			console.log($scope.steps);
			
			
			
			
			for(i=0;i<$scope.careerDetails.knowledge.element.length; i++){
				$scope.knowledgeElements.push($scope.careerDetails.knowledge.element[i].name);
			}
			
			for(i=0;i<$scope.careerDetails.skills.element.length; i++){
				$scope.skillsElements.push($scope.careerDetails.skills.element[i].name);
			}
		
		
			for(i=0;i<$scope.careerDetails.abilities.element.length; i++){
					$scope.abilitiesElements.push($scope.careerDetails.abilities.element[i].name);
				}
			
			
		
			for(i=0;i<$scope.careerDetails.workStyles.element.length; i++){
				$scope.workStylesElements.push($scope.careerDetails.workStyles.element[i].name);
			}
			
			
			for(i=0;i<$scope.careerDetails.toolsTechnology.technology.category[0].example.length; i++){
				$scope.technologies.push($scope.careerDetails.toolsTechnology.technology.category[0].example[i]);
			}
			
		
		document.getElementById('results').style.display = "";
		 Util.alert("Alert","Scroll down to see the results");
	    });
	
	}
	
	$scope.disableResultsSection = function(){
		document.getElementById('results').style.display = "none";
	}
	
	$scope.endDiscover = function(){
		bootbox.confirm("Thank you for taking the Interest Profiler test. Click cancel if you want to continue!", function(result) {
		 console.log('result is '+result);
			if(result == true){
			console.log('true');
				document.getElementById('discover_steps').style.display = "none";
				document.getElementById('results').style.display = "none";
			}
			else{
				document.getElementById('results').style.display = "none";
			}
		}); 
	}
	
	$scope.redirectAndSearch = function() {
		window.localStorage.setItem("isRedirectedSearch", true);
		window.localStorage.setItem("redirectSearchKeyword",
				$scope.searchText);
		$window.location.href = 'prepare_for_greatness.html';
	}
});