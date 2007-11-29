
/**
 * @cat DOM
 * @name AttackAPI.dom.getCookie
 * @desc retrieve cookie value
 * @param {String} cookie the name of the cookie to retrieve
 * @return {String} cookie value
 */
AttackAPI.dom.getCookie = function (cookie) {
	var tokens = document.cookie.split(';');
	
	for (var i = 0; i < tokens.length; i++) {
		var pair = tokens[i].replace(/^\s*/, '');
		
		if (cookie == this.decodeURL(pair.substring(0, name.length))) {
			return this.decodeURL(pair.substring(name.length + 1));
		}
	}
	
	return null;
};
