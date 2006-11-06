AttackAPI.CookieManager = {};
AttackAPI.CookieManager.setCookie = function (name, value, expires, path, domain, secure) {
	document.cookie = name + '=' + escape(value) +
	                  ((expires == undefined)?'':'; expires=' + expires) +
					  ((path == undefined)?'':'; path=' + path) +
					  ((domain == undefined)?'':'; domain=' + domain) +
					  ((secure == undefined)?'':'; secure=' + secure);
};
AttackAPI.CookieManager.delCookie = function (name) {
	AttackAPI.CookieManager.setCookie(name, '');
};
AttackAPI.CookieManager.getCookie = function (name) {
	var tokens = document.cookie.split(';');
	
	for (var index = 0; index < tokens.length; index++) {
		var pair = tokens[index].replace(/^\s*/, '');
		
		if (name == pair.substring(0, name.length))
			return pair.substring(name.length + 1);
	}
	
	return null;
};
AttackAPI.CookieManager.listCookies = function () {
	var results = new Array();
	var tokens = document.cookie.split(';');
	
	for (var index = 0; index < tokens.length; index++) {
		var pair = tokens[index].split('=');
		
		if (pair[1] && !(pair[0] in results))
			results.push(pair[0]);
	}
	
	return results;
};
