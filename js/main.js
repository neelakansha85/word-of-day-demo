function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname, cvalue) {
    var today = new Date();
    today.setTime(today.getTime() + (90 * 24 * 60 * 60 * 1000));
    var expires = "expires="+today.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function check_word_of_day() {
	
	var last_check = getCookie("last_check");
	if(!last_check) {
		var today = new Date();
		var m = today.getMonth()+1;
		var d = today.getDate();
		var yyyy = today.getFullYear();
		var date = yyyy + "-" + m + "-" + d;
		setCookie("last_check", date);
	}

	var today = new Date();
	var m = today.getMonth()+1;
	var d = today.getDate();
	var yyyy = today.getFullYear();
	var current_date = yyyy + "-" + m + "-" + d;
	if(last_check != current_date) {

		var user_word = getCookie("user_word");
		var word_of_day_API = "http://api.wordnik.com:80/v4/words.json/wordOfTheDay?date=" + current_date + "&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
		var word_of_day = "";
		$.getJSON(word_of_day_API, function(result){
	            
            word_of_day = result.word;

            if(user_word == word_of_day) {
				var count = getCookie("count");
				if(count < 0) {
					count = 1;
				}
				count++;
				alert("Congratulations you word is the Word Of The Day! So far you have got it for "+ count + "times");
				setCookie("count", count);
				setCookie("last_check", current_date)
			}
            
	    });
	}
}

function save_word() {
	setCookie("user_word", form.user_word_txt.value);
    check_word_of_day();
}