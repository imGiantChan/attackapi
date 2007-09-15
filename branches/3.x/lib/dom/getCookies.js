
/**
 * @cat DOM
 * @name AttackAPI.dom.getCookies
 * @desc get all cookies as an object
 * @return {Array} list of all cookies
 */
AttackAPI.dom.getCookies = function () {
	var cookies = new Object();
	var tokens = document.cookie.split(';');
	
	for (var index = 0; index < tokens.length; index++) {
		var pair = tokens[index].split('=');
		
		if (pair[1] && !(pair[0] in cookies)) {
			cookies[this.decodeURL(pair[0])] = this.decodeURL(pair[1]);
		}
	}
	
	return cookies;	
};
