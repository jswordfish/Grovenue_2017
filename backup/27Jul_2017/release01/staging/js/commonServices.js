var UtilService = angular.module('UtilService', ['ModalService'])
.service('Util', function ($http, $window, Modal) {

    var getBaseUrl = function () {
        var url;
        var domain;

        // dev url
        //domain = "http://localhost";
        //domain = "http://192.168.1.33";
        //url = domain + "/booksys_27Aug-1.0";
        //url = "http://grovenue.co:8080/grovenue";

        // production url
        url = "../../grovenue";

        console.log("API Base url : " + url);
        return url;
    };

    var getUrlVars = function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    };
    
    var getYearsLOV = function () {
        var years = [];
        var curYear = new Date().getFullYear();
        for(var i=0; i < 25; i++)
        {
            years.push(curYear);
            curYear--;
        }
        return years;
    }
    
    var getStates = function () {
        var states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
                                        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
                                        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
        return states;
    }
    
    var getCities = function(state) {
        var cities = [];
        if (state == 'Andhra Pradesh') {
            cities = ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "SriPotti Sri Ramulu Nellore", "Vishakhapatnam", "Vizianagaram", "West Godavari", "Cudappah"];
        }

        if (state == 'Arunachal Pradesh') {
            cities = ["Anjaw", "Changlang", "Dibang Valley", "East Siang", "East Kameng", "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri", "Papum Pare", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"];
        }

        if (state == 'Assam') {
            cities = ["Baksa", "Barpeta", "Bongaigaon", "Cachar", "Chirang", "Darrang", "Dhemaji", "Dima Hasao", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "Tinsukia", "Udalguri"];
        }

        if (state == 'Bihar') {
            cities = ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"];
        }

        if (state == 'Chhattisgarh') {
            cities = ["Bastar", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Jashpur", "Janjgir-Champa", "Korba", "Koriya", "Kanker", "Kabirdham (formerly Kawardha)", "Mahasamund", "Narayanpur", "Raigarh", "Rajnandgaon", "Raipur", "Surajpur", "Surguja"];
        }

        if (state == 'Dadra and Nagar Haveli') {
            cities = ["Amal", "Silvassa"];
        }

        if (state == 'Daman and Diu') {
            cities = ["Daman", "Diu"];
        }

        if (state == 'Delhi') {
            cities = ["Delhi", "New Delhi", "North Delhi", "Noida", "Patparganj", "Sonabarsa", "Tughlakabad"];
        }

        if (state == 'Goa') {
            cities = ["Chapora", "Dabolim", "Madgaon", "Marmugao (Marmagao)", "Panaji Port", "Panjim", "Pellet Plant Jetty/Shiroda", "Talpona", "Vasco da Gama"];
        }

        if (state == 'Gujarat') {
            cities = ["Ahmedabad", "Amreli district", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Dahod", "Dang", "Gandhinagar", "Jamnagar", "Junagadh","Kutch", "Kheda", "Mehsana", "Narmada", "Navsari", "Patan", "Panchmahal", "Porbandar", "Rajkot", "Sabarkantha", "Surendranagar", "Surat", "Tapi", "Vadodara", "Valsad"];
        }

        if (state == 'Haryana') {
            cities = ["Ambala", "Bhiwani", "Faridabad", "Fatehabad", "Gurgaon", "Hissar", "Jhajjar", "Jind", "Karnal", "Kaithal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamuna Nagar"];
        }

        if (state == 'Himachal Pradesh') {
            cities = ["Baddi", "Baitalpur", "Chamba", "Dharamsala", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul & Spiti", "Mandi", "Simla", "Sirmaur", "Solan", "Una"];
        }

        if (state == 'Jammu and Kashmir') {
            cities = ["Jammu", "Leh", "Rajouri", "Srinagar"];
        }

        if (state == 'Jharkhand') {
            cities = ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribag", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"];
        }

        if (state == 'Karnataka') {
            cities = ["Bagalkot", "Bangalore", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Bijapur", "Chamarajnagar", "Chikkamagaluru", "Chikkaballapur", "Chitradurga", "Davanagere", "Dharwad", "Dakshina Kannada", "Gadag", "Gulbarga", "Hassan", "Haveri district", "Kodagu",
                                                   "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Ramanagara", "Yadgir"];
        }

        if (state == 'Kerala') {
            cities = ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thrissur", "Thiruvananthapuram", "Wayanad"];
        }

        if (state == 'Madhya Pradesh') {
            cities = ["Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhilai", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Dewas", "Dhar", "Guna", "Gwalior", "Hoshangabad", "Indore", "Itarsi", "Jabalpur", "Khajuraho", "Khandwa", "Khargone", "Malanpur", "Malanpuri (Gwalior)", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Pithampur", "Raipur", "Raisen", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Singrauli", "Ujjain"];
        }

        if (state == 'Maharashtra') {
            cities = ["Ahmednagar", "Akola", "Alibag", "Amaravati", "Arnala", "Aurangabad", "Bandra", "Bassain", "Belapur", "Bhiwandi", "Bhusaval", "Borliai-Mandla", "Chandrapur", "Dahanu", "Daulatabad", "Dighi (Pune)", "Dombivali", "Goa", "Jaitapur", "Jalgaon", "Jawaharlal Nehru (Nhava Sheva)", "Kalyan", "Karanja", "Kelwa", "Khopoli", "Kolhapur", "Lonavale", "Malegaon", "Malwan", "Manori", "Mira Bhayandar", "Miraj", "Mumbai (ex Bombay)", "Murad", "Nagapur", "Nagpur", "Nalasopara", "Nanded", "Nandgaon", "Nasik", "Navi Mumbai", "Nhave", "Osmanabad", "Palghar", "Panvel", "Pimpri", "Pune", "Ratnagiri", "Sholapur", "Shrirampur", "Shriwardhan", "Tarapur", "Thana", "Thane", "Trombay", "Varsova", "Vengurla", "Virar", "Wada"];
        }

        if (state == 'Manipur') {
            cities = ["Bishnupur", "Churachandpur", "Chandel", "Imphal East", "Senapati", "Tamenglong", "Thoubal", "Ukhrul", "Imphal West"];
        }

        if (state == 'Meghalaya') {
            cities = ["Baghamara", "Balet", "Barsora", "Bolanganj", "Dalu", "Dawki", "Ghasuapara", "Mahendraganj", "Moreh", "Ryngku", "Shella Bazar", "Shillong"];
        }

        if (state == 'Mizoram') {
            cities = ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"];
        }

        if (state == 'Nagaland') {
            cities = ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"];
        }

        if (state == 'Orissa') {
            cities = ["Bahabal Pur", "Bhubaneswar", "Chandbali", "Gopalpur", "Jeypore", "Paradip Garh", "Puri", "Rourkela"];
        }

        if (state == 'Puducherry') {
            cities = ["Karaikal", "Mahe", "Pondicherry", "Yanam"];
        }

        if (state == 'Punjab') {
            cities = ["Amritsar", "Barnala", "Bathinda", "Firozpur", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Sri Muktsar Sahib", "Pathankot", "Patiala", "Rupnagar", "Ajitgarh (Mohali)", "Sangrur", "Shahid Bhagat Singh Nagar", "Tarn Taran"];
        }

        if (state == 'Rajasthan') {
            cities = ["Ajmer", "Banswara", "Barmer", "Barmer Rail Station", "Basni", "Beawar", "Bharatpur", "Bhilwara", "Bhiwadi", "Bikaner", "Bongaigaon", "Boranada, Jodhpur", "Chittaurgarh", "Fazilka", "Ganganagar", "Jaipur", "Jaipur-Kanakpura", "Jaipur-Sitapura", "Jaisalmer", "Jodhpur", "Jodhpur-Bhagat Ki Kothi", "Jodhpur-Thar", "Kardhan", "Kota", "Munabao Rail Station", "Nagaur", "Rajsamand", "Sawaimadhopur", "Shahdol", "Shimoga", "Tonk", "Udaipur"];
        }

        if (state == 'Sikkim') {
            cities = ["Chamurci", "Gangtok"];
        }


        if (state == 'Tamil Nadu') {
            cities = ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mandapam", "Nagapattinam", "Nilgiris", "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Thiruvallur", "Tirupur", "Tiruchirapalli", "Theni", "Tirunelveli", "Thanjavur", "Thoothukudi", "Tiruvallur", "Tiruvannamalai", "Vellore", "Villupuram", "Viruthunagar"];
        }


        if (state == 'Telangana') {
            cities = ["Adilabad", "Hyderabad", "Karimnagar", "Mahbubnagar", "Medak", "Nalgonda", "Nizamabad", "Ranga Reddy", "Warangal"];
        }


        if (state == 'Tripura') {
            cities = ["Agartala", "Dhalaighat", "Kailashahar", "Kamalpur", "Kanchanpur", "Kel Sahar Subdivision", "Khowai", "Khowaighat", "Mahurighat", "Old Raghna Bazar", "Sabroom", "Srimantapur"];
        }


        if (state == 'Uttar Pradesh') {
            cities = ["Agra", "Allahabad", "Auraiya", "Banbasa", "Bareilly", "Berhni", "Bhadohi", "Dadri", "Dharchula", "Gandhar", "Gauriphanta", "Ghaziabad", "Gorakhpur", "Gunji", "Jarwa", "Jhulaghat (Pithoragarh)", "Kanpur", "Katarniyaghat", "Khunwa", "Loni", "Lucknow", "Meerut", "Moradabad", "Muzaffarnagar", "Nepalgunj Road", "Pakwara (Moradabad)", "Pantnagar", "Saharanpur", "Sonauli", "Surajpur", "Tikonia", "Varanasi"];
        }


        if (state == 'Uttarakhand') {
            cities = ["Almora", "Badrinath", "Bangla", "Barkot", "Bazpur", "Chamoli", "Chopra", "Dehra Dun", "Dwarahat", "Garhwal", "Haldwani", "Hardwar", "Haridwar", "Jamal", "Jwalapur", "Kalsi", "Kashipur", "Mall", "Mussoorie", "Nahar", "Naini", "Pantnagar", "Pauri", "Pithoragarh", "Rameshwar", "Rishikesh", "Rohni", "Roorkee", "Sama", "Saur"];
        }


        if (state == 'West Bengal') {
            cities = ["Alipurduar", "Bankura", "Bardhaman", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kolkata", "Maldah", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"];
        }
        return cities;
    }
    
    var alert = function(title, body) {
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'partials/alert-modal.html',
            windowClass: 'modal-window-extension'
        };
        var modalOptions = {
            closeButtonText: 'OK',
            headerText: title,
            bodyText: body
        };
        Modal.showModal(modalDefaults, modalOptions);
    };
    
    var confirm = function(title, body,actionButton,closeButton,size) {
        if(actionButton == null)
            actionButton = "Yes";
        if(closeButton == null)
            closeButton = "No";
        if(size == null)
            size = "sm";
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            size: size,
            templateUrl: 'partials/confirm-modal.html',
            windowClass: 'modal-window-extension'
        };
        var modalOptions = {
            closeButtonText: closeButton,
            actionButtonText: actionButton,
            headerText: title,
            bodyText: body
        };
        return Modal.showModal(modalDefaults, modalOptions);
    };
    
    var generateToken = function(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
        return uuid;
    }
    
    var getStatesFromAPI = function() {
        var token = generateToken();
        var statesUrl = getBaseUrl() + "/ws/rest/resourceService/findByDistinctStateAndCityForGivenCountry/token/" + token + "?country=India";
        return $http.get(statesUrl);
    }
    
    var getLoggedInUser = function() {
        var user = $window.localStorage.getItem('loggedInUser') || null;
        //console.log('user is ' + user);
        var loggedInUser = null;
        try {
            loggedInUser = JSON.parse(user);
        }
        catch(e) {
            loggedInUser = null;
        }
        if (loggedInUser != null) {
            if(loggedInUser.userType == 'ADMIN') {
                $window.location.href = 'admin/index.html';
            }
        }
        return loggedInUser;
    }

    return {
        getBaseUrl: getBaseUrl,
        getUrlVars: getUrlVars,
        getYearsLOV: getYearsLOV,
        getStates: getStates,
        getCities: getCities,
        getStatesFromAPI: getStatesFromAPI,
        alert: alert,
        confirm: confirm,
        generateToken: generateToken,
        getLoggedInUser: getLoggedInUser
    };

});

var AuthService = angular.module('AuthService', ['UtilService'])
.service('Auth', function ($http, Util) {
    var baseApiUrl = Util.getBaseUrl();

    var login = function (user) {
        var usr = encodeURIComponent(user.user);
        var password = encodeURIComponent(user.password);
        var url = baseApiUrl + '/ws/rest/resourceService/authenticate/user/'
                + usr
                + '/password/'
                + password
                + '/socialMediaType/NONE';
        console.log(url);
        return $http({
            method: 'POST',
            url: url,
            data: null
        });
    };

    var signup = function (user) {
        if(user.termCheck != undefined)
            delete user["termCheck"];
        var url = baseApiUrl + '/ws/rest/resourceService/saveOrUpdateUser/token/test';
        console.log(url);
        console.log(JSON.stringify(user));
        return $http({
            method: 'POST',
            url: url,
            data: user
        });
    };

    return {
        login: login,
        signup: signup
    };

});

var FeedbackService = angular.module('FeedbackService', ['UtilService'])
.service('Feedback', ['$http', 'Util', function ($http, Util) {
    var baseApiUrl = Util.getBaseUrl();
    this.feedbacksubmit = function (feedback) {
        feedback.name = window.encodeURIComponent(feedback.name);
        feedback.email = window.encodeURIComponent(feedback.email);
        var url = baseApiUrl + '/ws/rest/utilService/feedbackEmail/email/' + feedback.email + '/name/' + feedback.name + '/token/test';
        $http.post(url, feedback.message).
            success(function (data) {
                console.log('feedback posted to server');
            });

        return "Thanks for writing in. Your message has been submitted. We will get back to you!";

    };

}]);

var UserService = angular.module('UserService', ['UtilService'])
.service('UserService', ['$http', '$window', 'Util', function ($http, $window, Util) {
    var _this = this;
    var baseApiUrl = Util.getBaseUrl();
    this.signup = function (user) {

        console.log('bbbb ' + user.email);

        var url = baseApiUrl + '/ws/rest/resourceService/saveOrUpdateUser/token/test';
        $http.post(url, user).
			success(function (data) {
			    console.log('request successful');

			    var serviceResponse = data;
			    console.log(JSON.stringify(serviceResponse));
			    if (serviceResponse.responseStatus == 'User_Saved') {
			        console.log('user saved');
			        $scope.loggedInUser = user.email;
			        alert("We are almost done! Check your email for the activation link.");
			        _this.closeRegDialog();
			    }
			    else if (serviceResponse.responseStatus.startsWith("User_Exists_Social_Media_")) {
			        var socialMedia = serviceResponse.responseStatus.substring("User_Exists_Social_Media_".length(), serviceResponse.responseStatus.length);
			        //$("<div title='Already logged in through '"+socialMedia+"'> Please use another email id for registration</div>").dialog();
			        //Feedback.showDialog('Already logged in through '+socialMedia, 'Please use another email id for registration');
			        alert('You had logged in earlier through ' + socialMedia + '. You can continue use  ' + socialMedia + ' to log in or else register using a different password.');
			        _this.closeRegDialog();
			    }
			    else if (serviceResponse.responseStatus == 'User_Exists_Normal') {
			        //$("<div title='Basic dialog'>You are already registered. Just Log in</div>").dialog();
			        //Feedback.showDialog('Basic dialog', 'You are already registered. Just Log in');

			        alert('Looks like you\'re already part of the Grovenue community. Just use your email to login!');
			        _this.closeRegDialog();
			    }
			});

        return true;
    };

    this.closeRegDialog = function (user) {
        console.log(' from service close');
        document.getElementById('modal').style.display = "none";
    };



}]);