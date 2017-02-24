$(document).ready(function(){
   


    // function to show our popups
    function showPopup(whichpopup){
        var docHeight = $(document).height(); //grab the height of the page
        var scrollTop = $(window).scrollTop(); //grab the px value from the top of the page to where you're scrolling
        $('.overlay-bg').show().css({'height' : docHeight}); //display your popup background and set height to the page height
        $('.popup'+whichpopup).show().css({'top': scrollTop+20+'px'}); //show the appropriate popup and set the content 20px from the window top
    }

    // function to close our popups
    function closePopup(){
        $('.overlay-bg, .overlay-content').hide(); //hide the overlay
    }
	
	function closePopup1(){
        $('.overlay-bg1, .overlay-content1').hide(); //hide the overlay
    }

    // timer if we want to show a popup after a few seconds.
    //get rid of this if you don't want a popup to show up automatically
    setTimeout(function() {
        // Show popup3 after 2 seconds
        showPopup(3);
    }, 2000);


    // show popup when you click on the link
    $('.show-popup').click(function(event){
        event.preventDefault(); // disable normal link function so that it doesn't refresh the page
        var selectedPopup = $(this).data('showpopup'); //get the corresponding popup to show
        
        showPopup(selectedPopup); //we'll pass in the popup number to our showPopup() function to show which popup we want
    });
  
    // hide popup when user clicks on close button or if user clicks anywhere outside the container
    $('.close-btn, .overlay-bg').click(function(){
        closePopup();
    });
  
  $('.close-btn1, .overlay-bg1').click(function(){
        closePopup1();
    });  
    // hide the popup when user presses the esc key
    $(document).keyup(function(e) {
        if (e.keyCode == 27) { // if user presses esc key
            closePopup();
			closePopup1();
        }
    });
});





var handles = ["SELECT STATE", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
                                        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
                                        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];

$(function () {
    var options = '';
    for (var i = 0; i < handles.length; i++) {
        options += '<option value="' + handles[i] + '">' + handles[i] + '</option>';
    }
    $('#listBox').html(options);
    $('#listBox').val($('#State').val());
    $('#listBox').change();
    setTimeout(function () {
        $('#secondlist').val($('#City').val());
    }, 1000);
    
    
});
function selct_district($val) {
    if ($val == 'SELECT STATE') {
        var options = '';
        $('#secondlist').html(options);
    }
    if ($val == 'Andhra Pradesh') {
        var andhra = ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "SriPotti Sri Ramulu Nellore",
                                         "Vishakhapatnam", "Vizianagaram", "West Godavari", "Cudappah"];
        $(function () {
            var options = '';
            for (var i = 0; i < andhra.length; i++) {
                options += '<option value="' + andhra[i] + '">' + andhra[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Arunachal Pradesh') {
        var ap = ["Anjaw", "Changlang", "Dibang Valley", "East Siang", "East Kameng", "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri", "Papum Pare",
                                            "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"];
        $(function () {
            var options = '';
            for (var i = 0; i < ap.length; i++) {
                options += '<option value="' + ap[i] + '">' + ap[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Assam') {
        var assam = ["Baksa", "Barpeta", "Bongaigaon", "Cachar", "Chirang", "Darrang", "Dhemaji", "Dima Hasao", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Jorhat",
                                         "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "Tinsukia", "Udalguri"];
        $(function () {
            var options = '';
            for (var i = 0; i < assam.length; i++) {
                options += '<option value="' + assam[i] + '">' + assam[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Bihar') {
        var bihar = ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur",
                                            "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa",
                                            "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"];
        $(function () {
            var options = '';
            for (var i = 0; i < bihar.length; i++) {
                options += '<option value="' + bihar[i] + '">' + bihar[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Chhattisgarh') {
        var Chhattisgarh = ["Bastar", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Jashpur", "Janjgir-Champa", "Korba", "Koriya", "Kanker", "Kabirdham (formerly Kawardha)", "Mahasamund",
                                                "Narayanpur", "Raigarh", "Rajnandgaon", "Raipur", "Surajpur", "Surguja"];
        $(function () {
            var options = '';
            for (var i = 0; i < Chhattisgarh.length; i++) {
                options += '<option value="' + Chhattisgarh[i] + '">' + Chhattisgarh[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Dadra and Nagar Haveli') {
        var dadra = ["Amal", "Silvassa"];
        $(function () {
            var options = '';
            for (var i = 0; i < dadra.length; i++) {
                options += '<option value="' + dadra[i] + '">' + dadra[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Daman and Diu') {
        var daman = ["Daman", "Diu"];
        $(function () {
            var options = '';
            for (var i = 0; i < daman.length; i++) {
                options += '<option value="' + daman[i] + '">' + daman[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Delhi') {
        var delhi = ["Delhi", "New Delhi", "North Delhi", "Noida", "Patparganj", "Sonabarsa", "Tughlakabad"];
        $(function () {
            var options = '';
            for (var i = 0; i < delhi.length; i++) {
                options += '<option value="' + delhi[i] + '">' + delhi[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Goa') {
        var goa = ["Chapora", "Dabolim", "Madgaon", "Marmugao (Marmagao)", "Panaji Port", "Panjim", "Pellet Plant Jetty/Shiroda", "Talpona", "Vasco da Gama"];
        $(function () {
            var options = '';
            for (var i = 0; i < goa.length; i++) {
                options += '<option value="' + goa[i] + '">' + goa[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Gujarat') {
        var gujarat = ["Ahmedabad", "Amreli district", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Dahod", "Dang", "Gandhinagar", "Jamnagar", "Junagadh",
                                            "Kutch", "Kheda", "Mehsana", "Narmada", "Navsari", "Patan", "Panchmahal", "Porbandar", "Rajkot", "Sabarkantha", "Surendranagar", "Surat", "Tapi", "Vadodara", "Valsad"];
        $(function () {
            var options = '';
            for (var i = 0; i < gujarat.length; i++) {
                options += '<option value="' + gujarat[i] + '">' + gujarat[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Haryana') {
        var haryana = ["Ambala", "Bhiwani", "Faridabad", "Fatehabad", "Gurgaon", "Hissar", "Jhajjar", "Jind", "Karnal", "Kaithal",
                                                "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamuna Nagar"];
        $(function () {
            var options = '';
            for (var i = 0; i < haryana.length; i++) {
                options += '<option value="' + haryana[i] + '">' + haryana[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }


    if ($val == 'Himachal Pradesh') {
        var himachal = ["Baddi", "Baitalpur", "Chamba", "Dharamsala", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul & Spiti", "Mandi", "Simla", "Sirmaur", "Solan", "Una"];
        $(function () {
            var options = '';
            for (var i = 0; i < himachal.length; i++) {
                options += '<option value="' + himachal[i] + '">' + himachal[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Jammu and Kashmir') {
        var jammu = ["Jammu", "Leh", "Rajouri", "Srinagar"];
        $(function () {
            var options = '';
            for (var i = 0; i < jammu.length; i++) {
                options += '<option value="' + jammu[i] + '">' + jammu[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Jharkhand') {
        var jharkhand = ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribag", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu",
                                                "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"];
        $(function () {
            var options = '';
            for (var i = 0; i < jharkhand.length; i++) {
                options += '<option value="' + jharkhand[i] + '">' + jharkhand[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Karnataka') {
        var karnataka = ["Bagalkot", "Bangalore", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Bijapur", "Chamarajnagar", "Chikkamagaluru", "Chikkaballapur",
                                               "Chitradurga", "Davanagere", "Dharwad", "Dakshina Kannada", "Gadag", "Gulbarga", "Hassan", "Haveri district", "Kodagu",
                                               "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Ramanagara", "Yadgir"];
        $(function () {
            var options = '';
            for (var i = 0; i < karnataka.length; i++) {
                options += '<option value="' + karnataka[i] + '">' + karnataka[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Kerala') {
        var kerala = ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thrissur", "Thiruvananthapuram", "Wayanad"];
        $(function () {
            var options = '';
            for (var i = 0; i < kerala.length; i++) {
                options += '<option value="' + kerala[i] + '">' + kerala[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Madhya Pradesh') {
        var mp = ["Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhilai", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Dewas", "Dhar", "Guna", "Gwalior", "Hoshangabad",
                                        "Indore", "Itarsi", "Jabalpur", "Khajuraho", "Khandwa", "Khargone", "Malanpur", "Malanpuri (Gwalior)", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Pithampur", "Raipur", "Raisen", "Ratlam",
                                        "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Singrauli", "Ujjain"];
        $(function () {
            var options = '';
            for (var i = 0; i < mp.length; i++) {
                options += '<option value="' + mp[i] + '">' + mp[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Maharashtra') {
        var maharashtra = ["Ahmednagar", "Akola", "Alibag", "Amaravati", "Arnala", "Aurangabad", "Aurangabad", "Bandra", "Bassain", "Belapur", "Bhiwandi", "Bhusaval", "Borliai-Mandla", "Chandrapur", "Dahanu", "Daulatabad", "Dighi (Pune)", "Dombivali", "Goa", "Jaitapur", "Jalgaon",
                                                 "Jawaharlal Nehru (Nhava Sheva)", "Kalyan", "Karanja", "Kelwa", "Khopoli", "Kolhapur", "Lonavale", "Malegaon", "Malwan", "Manori",
                                                 "Mira Bhayandar", "Miraj", "Mumbai (ex Bombay)", "Murad", "Nagapur", "Nagpur", "Nalasopara", "Nanded", "Nandgaon", "Nasik", "Navi Mumbai", "Nhave", "Osmanabad", "Palghar",
                                                 "Panvel", "Pimpri", "Pune", "Ratnagiri", "Sholapur", "Shrirampur", "Shriwardhan", "Tarapur", "Thana", "Thane", "Trombay", "Varsova", "Vengurla", "Virar", "Wada"];
        $(function () {
            var options = '';
            for (var i = 0; i < maharashtra.length; i++) {
                options += '<option value="' + maharashtra[i] + '">' + maharashtra[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Manipur') {
        var manipur = ["Bishnupur", "Churachandpur", "Chandel", "Imphal East", "Senapati", "Tamenglong", "Thoubal", "Ukhrul", "Imphal West"];
        $(function () {
            var options = '';
            for (var i = 0; i < manipur.length; i++) {
                options += '<option value="' + manipur[i] + '">' + manipur[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Meghalaya') {
        var meghalaya = ["Baghamara", "Balet", "Barsora", "Bolanganj", "Dalu", "Dawki", "Ghasuapara", "Mahendraganj", "Moreh", "Ryngku", "Shella Bazar", "Shillong"];
        $(function () {
            var options = '';
            for (var i = 0; i < meghalaya.length; i++) {
                options += '<option value="' + meghalaya[i] + '">' + meghalaya[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Mizoram') {
        var mizoram = ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"];
        $(function () {
            var options = '';
            for (var i = 0; i < mizoram.length; i++) {
                options += '<option value="' + mizoram[i] + '">' + mizoram[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Nagaland') {
        var nagaland = ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"];
        $(function () {
            var options = '';
            for (var i = 0; i < nagaland.length; i++) {
                options += '<option value="' + nagaland[i] + '">' + nagaland[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Orissa') {
        var orissa = ["Bahabal Pur", "Bhubaneswar", "Chandbali", "Gopalpur", "Jeypore", "Paradip Garh", "Puri", "Rourkela"];
        $(function () {
            var options = '';
            for (var i = 0; i < orissa.length; i++) {
                options += '<option value="' + orissa[i] + '">' + orissa[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Puducherry') {
        var puducherry = ["Karaikal", "Mahe", "Pondicherry", "Yanam"];
        $(function () {
            var options = '';
            for (var i = 0; i < puducherry.length; i++) {
                options += '<option value="' + puducherry[i] + '">' + puducherry[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Punjab') {
        var punjab = ["Amritsar", "Barnala", "Bathinda", "Firozpur", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Sri Muktsar Sahib", "Pathankot",
                                            "Patiala", "Rupnagar", "Ajitgarh (Mohali)", "Sangrur", "Shahid Bhagat Singh Nagar", "Tarn Taran"];
        $(function () {
            var options = '';
            for (var i = 0; i < punjab.length; i++) {
                options += '<option value="' + punjab[i] + '">' + napunjabgaland[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Rajasthan') {
        var rajasthan = ["Ajmer", "Banswara", "Barmer", "Barmer Rail Station", "Basni", "Beawar", "Bharatpur", "Bhilwara", "Bhiwadi", "Bikaner", "Bongaigaon", "Boranada, Jodhpur", "Chittaurgarh", "Fazilka", "Ganganagar", "Jaipur", "Jaipur-Kanakpura",
                                           "Jaipur-Sitapura", "Jaisalmer", "Jodhpur", "Jodhpur-Bhagat Ki Kothi", "Jodhpur-Thar", "Kardhan", "Kota", "Munabao Rail Station", "Nagaur", "Rajsamand", "Sawaimadhopur", "Shahdol", "Shimoga", "Tonk", "Udaipur"];
        $(function () {
            var options = '';
            for (var i = 0; i < rajasthan.length; i++) {
                options += '<option value="' + rajasthan[i] + '">' + rajasthan[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }

    if ($val == 'Sikkim') {
        var sikkim = ["Chamurci", "Gangtok"];
        $(function () {
            var options = '';
            for (var i = 0; i < sikkim.length; i++) {
                options += '<option value="' + sikkim[i] + '">' + sikkim[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }


    if ($val == 'Tamil Nadu') {
        var tn = ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mandapam", "Nagapattinam", "Nilgiris", "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Thiruvallur", "Tirupur",
                                       "Tiruchirapalli", "Theni", "Tirunelveli", "Thanjavur", "Thoothukudi", "Tiruvallur", "Tiruvannamalai", "Vellore", "Villupuram", "Viruthunagar"];
        $(function () {
            var options = '';
            for (var i = 0; i < tn.length; i++) {
                options += '<option value="' + tn[i] + '">' + tn[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }


    if ($val == 'Telangana') {
        var telangana = ["Adilabad", "Hyderabad", "Karimnagar", "Mahbubnagar", "Medak", "Nalgonda", "Nizamabad", "Ranga Reddy", "Warangal"];
        $(function () {
            var options = '';
            for (var i = 0; i < telangana.length; i++) {
                options += '<option value="' + telangana[i] + '">' + telangana[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }


    if ($val == 'Tripura') {
        var tripura = ["Agartala", "Dhalaighat", "Kailashahar", "Kamalpur", "Kanchanpur", "Kel Sahar Subdivision", "Khowai", "Khowaighat", "Mahurighat", "Old Raghna Bazar", "Sabroom", "Srimantapur"];
        $(function () {
            var options = '';
            for (var i = 0; i < tripura.length; i++) {
                options += '<option value="' + tripura[i] + '">' + tripura[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }


    if ($val == 'Uttar Pradesh') {
        var up = ["Agra", "Allahabad", "Auraiya", "Banbasa", "Bareilly", "Berhni", "Bhadohi", "Dadri", "Dharchula", "Gandhar", "Gauriphanta", "Ghaziabad", "Gorakhpur", "Gunji",
                                        "Jarwa", "Jhulaghat (Pithoragarh)", "Kanpur", "Katarniyaghat", "Khunwa", "Loni", "Lucknow", "Meerut", "Moradabad", "Muzaffarnagar", "Nepalgunj Road", "Pakwara (Moradabad)",
                                        "Pantnagar", "Saharanpur", "Sonauli", "Surajpur", "Tikonia", "Varanasi"];
        $(function () {
            var options = '';
            for (var i = 0; i < up.length; i++) {
                options += '<option value="' + up[i] + '">' + up[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }


    if ($val == 'Uttarakhand') {
        var uttarakhand = ["Almora", "Badrinath", "Bangla", "Barkot", "Bazpur", "Chamoli", "Chopra", "Dehra Dun", "Dwarahat", "Garhwal", "Haldwani", "Hardwar", "Haridwar", "Jamal", "Jwalapur", "Kalsi", "Kashipur", "Mall",
                                               "Mussoorie", "Nahar", "Naini", "Pantnagar", "Pauri", "Pithoragarh", "Rameshwar", "Rishikesh", "Rohni", "Roorkee", "Sama", "Saur"];
        $(function () {
            var options = '';
            for (var i = 0; i < uttarakhand.length; i++) {
                options += '<option value="' + uttarakhand[i] + '">' + uttarakhand[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }


    if ($val == 'West Bengal') {
        var wb = ["Alipurduar", "Bankura", "Bardhaman", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah",
                                        "Jalpaiguri", "Kolkata", "Maldah", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"];
        $(function () {
            var options = '';
            for (var i = 0; i < wb.length; i++) {
                options += '<option value="' + wb[i] + '">' + wb[i] + '</option>';
            }
            $('#secondlist').html(options);
        });
    }
   
}