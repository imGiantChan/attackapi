
AttackAPI.dom.getCookies = function () {
	var cookies = new Object();
	var tokens = document.cookie.split(';');
	
	for (var index = 0; index < tokens.length; index++) {
		var pair = tokens[index].split('=');
		
		if (pair[1] && !(pair[0] in cookies))
			cookies[unescape(pair[0])] = unescape(pair[1]);
	}
	
	return cookies;	
};
