
AttackAPI.dom.getCookie = function (cookie) {
	var tokens = document.cookie.split(';');
	
	for (var index = 0; index < tokens.length; index++) {
		var pair = tokens[index].replace(/^\s*/, '');
		
		if (cookie == unescape(pair.substring(0, name.length)))
			return unescape(pair.substring(name.length + 1));
	}
	
	return null;
};
